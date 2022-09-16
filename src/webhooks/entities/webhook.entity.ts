import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @Column()
  name: string;

  @ManyToOne(() => Wiki, (wiki) => wiki.webhooks, { onDelete: 'CASCADE' })
  wiki: Wiki;

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
