import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wiki } from '../../wikis/entities/wiki.entity';

export enum WebhookPlatform {
  DISCORD = 'discord',
}

export interface WebhookConfig {
  language: string;
  embed: boolean;
}

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wiki_id', type: 'int' })
  wikiId: number;

  @ManyToOne(() => Wiki, (wiki) => wiki.webhooks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'wiki_id' })
  wiki: Wiki;

  @Column()
  name: string;

  @Column()
  enabled: boolean;

  @Column({
    type: 'enum',
    enum: WebhookPlatform,
  })
  platform: WebhookPlatform;

  @Column()
  url: string;

  @Column({ type: 'jsonb' })
  config: Partial<WebhookConfig>;
}
