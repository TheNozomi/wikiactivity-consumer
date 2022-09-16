import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscussionsItem, RecentChangesItem } from '@bitomic/wikiactivity-api';
import { RecentChangesItem as RecentChangesItemEntity } from '../entities/recent-changes-item.entity';
import { DiscussionsItem as DiscussionsItemEntity } from '../entities/discussions-item.entity';
import { Wiki } from '../../wikis/entities/wiki.entity';

@Injectable()
export class ActivityStorageService {
  constructor(
    @InjectRepository(RecentChangesItemEntity)
    private readonly recentChangesRepository: Repository<RecentChangesItemEntity>,

    @InjectRepository(DiscussionsItemEntity)
    private readonly discussionsRepository: Repository<DiscussionsItemEntity>,
  ) {}

  async saveRecentChangesItem(wiki: Wiki, item: RecentChangesItem) {
    const { wiki: _interwiki, ...fields } = item;

    return this.recentChangesRepository.save({
      ...fields,
      wikiId: wiki.id,
    });
  }

  async saveDiscussionsItem(wiki: Wiki, item: DiscussionsItem) {
    return this.discussionsRepository.save({
      wikiId: wiki.id,
      type: item.type,
      postId: item.id,
      threadId: item.threadId,
      threadTitle: item.title,
      forumId: item.forumId,
      forumName: item.forumName,
      userId: item.createdBy.id,
      username: item.createdBy.name,
      isReply: item.isReply,
      jsonModel: item.jsonModel,
      rawContent: item.rawContent,
      position: item.position,
      timestamp: new Date(1000 * item.creationDate.epochSecond),
    });
  }
}
