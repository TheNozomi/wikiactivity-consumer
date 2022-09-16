import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecentChangesItem } from '@bitomic/wikiactivity-api';
import { RecentChangesItem as RecentChangesItemEntity } from '../entities/recent-changes-item.entity';
import { Wiki } from 'src/wikis/entities/wiki.entity';

@Injectable()
export class ActivityStorageService {
  constructor(
    @InjectRepository(RecentChangesItemEntity)
    private readonly recentChangesRepository: Repository<RecentChangesItemEntity>,
  ) {}

  async saveRecentChangesItem(wiki: Wiki, item: RecentChangesItem) {
    return this.recentChangesRepository.save({
      ...item,
      wikiId: wiki.id,
    });
  }
}
