import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wiki } from '../../wikis/entities/wiki.entity';

@Entity()
export class DiscussionsItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wiki_id', type: 'int' })
  wikiId: number;

  @ManyToOne(() => Wiki)
  @JoinColumn([{ name: 'wiki_id', referencedColumnName: 'id' }])
  wiki: Wiki;

  @Column()
  type: 'ARTICLE_COMMENT' | 'FORUM' | 'WALL';

  @Column({ name: 'post_id', type: 'bigint' })
  postId: string;

  @Column({ name: 'thread_id', type: 'bigint' })
  threadId: string;

  // Replies don't have a thread title
  @Column({ name: 'thread_title', nullable: true })
  threadTitle: string;

  // For forum posts and article comments, this is a 32-bit integer. For wall posts, this is a 64-bit integer.
  // For article comments, this is the article ID.
  @Column({ name: 'forum_id', type: 'bigint' })
  forumId: string;

  // For article comments, this field is null
  @Column({ name: 'forum_name', nullable: true })
  forumName: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: string;

  @Column({ name: 'user_name' })
  username: string;

  @Column({ name: 'is_reply', default: false })
  isReply: boolean;

  @Column({ name: 'json_model', type: 'jsonb' })
  jsonModel: string;

  @Column({ name: 'raw_content', type: 'text' })
  rawContent: string;

  @Column({ type: 'int' })
  position: number;

  @Column()
  timestamp: Date;
}
