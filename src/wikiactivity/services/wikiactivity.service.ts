import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  InjectIoClientProvider,
  IoClient,
  OnConnect,
  OnConnectError,
  EventListener,
} from 'nestjs-io-client';
import {
  createActivityItem,
  type DiscussionsPostResponse,
  type LogEventsResponse,
  type RecentChangesResponse,
} from '@bitomic/wikiactivity-api';

import { ActivityStorageService } from './activity-storage.service';
import { WebhookService } from '../../webhooks/services/webhook.service';
import { WikiService } from '../../wikis/services/wiki.service';

@Injectable()
export class WikiActivityService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(WikiActivityService.name);

  constructor(
    @InjectIoClientProvider()
    private readonly io: IoClient,
    private readonly activityStorageService: ActivityStorageService,
    private readonly webhookService: WebhookService,
    private readonly wikiService: WikiService,
  ) {}

  @OnConnect()
  async connect() {
    this.logger.log(`Connected to ws-wikiactivity - Connection: ${this.io.id}`);
    const wikis = await this.wikiService.findAllEnabled(),
      interwikis = wikis.map((wiki) => wiki.interwiki);
    if (interwikis.length) {
      this.logger.log(`Subscribing to wikis: ${interwikis}`);
      this.io.send('join', interwikis);
    } else {
      this.logger.log(`Not subscribing to any wikis`);
    }
  }

  @OnConnectError()
  connectError(err: Error) {
    this.logger.error(`An error occurred: ${err}`);
  }

  @EventListener('activity')
  async onActivity(
    data: DiscussionsPostResponse | LogEventsResponse | RecentChangesResponse,
  ) {
    try {
      this.logger.log('data', data);

      const item = createActivityItem(data),
        wiki = await this.wikiService.findOneByInterwiki(item.wiki);
      this.logger.log({ wiki, item });
      if (wiki.enabled) {
        if (item.isRecentChanges()) {
          await this.activityStorageService.saveRecentChangesItem(wiki, item);
        } else if (item.isDiscussions()) {
          await this.activityStorageService.saveDiscussionsItem(wiki, item);
        } else {
          this.logger.log('Unsupported activity item type');
        }

        this.webhookService.executeWebhooks(wiki, item);
      }
    } catch (err) {
      console.error('Error forwarding to webhookService', err);
    }
  }

  @EventListener('activity-end')
  async onActivityEnd(data: any) {
    this.logger.log('Received activity-end event', data);
  }

  @EventListener('unreachable-wiki')
  async onUnreachableWiki(data: any) {
    this.logger.log('Received unreachable-wiki event', data);
  }

  @EventListener('rooms')
  async onRooms(data: any) {
    this.logger.log('Received rooms event', data);
  }

  subscribeToWiki(interwiki: string) {
    this.logger.log(`Subscribing to wiki: ${interwiki}`);
    this.io.send('join', [interwiki]);
  }

  public getHealth() {
    return {
      consumerReady: this.io.connected,
      connectionId: this.io.id,
    };
  }

  onModuleInit() {
    this.logger.log(`Connecting to ws-wikiactivity`);
    this.io.connect();
  }

  onModuleDestroy() {
    this.logger.log(`Disconnecting from ws-wikiactivity`);
    this.io.disconnect();
  }
}
