import { Injectable, Logger } from '@nestjs/common';
import {
  ActivityItem,
  DiscussionsItem,
  LogEventsItem,
  RecentChangesItem,
} from '@bitomic/wikiactivity-api';

import { Wiki } from '../../wikis/entities/wiki.entity';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  public executeWebhooks(wiki: Wiki, item: ActivityItem) {
    console.log(`Executing webhooks for ${wiki.interwiki}...`, item);

    if (!wiki.webhooks?.length) {
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

    for (const webhook of wiki.webhooks) {
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
}
