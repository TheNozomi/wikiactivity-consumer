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

import { WikisService } from '../../wikis/services/wikis.service';

@Injectable()
export class WikiActivityService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(WikiActivityService.name);

  constructor(
    @InjectIoClientProvider()
    private readonly io: IoClient,

    private readonly wikisService: WikisService,
  ) {}

  @OnConnect()
  async connect() {
    this.logger.log(`Connected to ws-wikiactivity - Connection: ${this.io.id}`);
    const wikis = await this.wikisService.findAllEnabled(),
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
  message(
    data: DiscussionsPostResponse | LogEventsResponse | RecentChangesResponse,
  ) {
    console.log(createActivityItem(data));
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
