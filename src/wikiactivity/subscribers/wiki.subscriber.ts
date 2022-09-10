import { Injectable, Logger } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { Wiki } from '../../wikis/entities/wiki.entity';
import { WikiActivityService } from '../services/wikiactivity.service';

@Injectable()
@EventSubscriber()
export class WikiSubscriber implements EntitySubscriberInterface<Wiki> {
  private readonly logger = new Logger(WikiSubscriber.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly wikiActivityService: WikiActivityService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Wiki;
  }

  async afterInsert(event: InsertEvent<Wiki>) {
    const wiki = event.entity;
    this.logger.log(
      `Wiki created: ${wiki.interwiki} (enabled: ${wiki.enabled})`,
    );

    if (wiki.enabled) {
      this.wikiActivityService.subscribeToWiki(wiki.interwiki);
    }
  }
}
