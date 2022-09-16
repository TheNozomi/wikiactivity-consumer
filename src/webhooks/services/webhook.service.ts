import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ActivityItem,
  DiscussionsItem,
  LogEventsItem,
  RecentChangesItem,
} from '@bitomic/wikiactivity-api';
import { Repository } from 'typeorm';

import { Wiki } from '../../wikis/entities/wiki.entity';
import { Webhook } from '../entities/webhook.entity';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    @InjectRepository(Webhook)
    private readonly webhooksRepository: Repository<Webhook>,
  ) {}

  public async executeWebhooks(wiki: Wiki, item: ActivityItem) {
    const webhooks = await this.findAllByWikiId(wiki.id);

    if (!webhooks?.length) {
      this.logger.log(`No webhooks configured for ${wiki.interwiki}`);
      return;
    }

    if (
      !(item instanceof DiscussionsItem) &&
      !(item instanceof LogEventsItem) &&
      !(item instanceof RecentChangesItem)
    ) {
      this.logger.warn('Unsupported ActivityItem', item);
      return;
    }

    for (const webhook of webhooks) {
      this.logger.log(`Executing webhook ${webhook.id} for ${wiki.interwiki}`);

      switch (webhook.platform) {
        case 'discord':
          this.logger.log('Discord webhook');
          break;

        default:
          this.logger.warn(`Unsupported webhook platform ${webhook.platform}`);
          continue;
      }
    }
  }

  public async findAllByWikiId(wikiId: number) {
    return this.webhooksRepository.findBy({ wikiId });
  }
}
