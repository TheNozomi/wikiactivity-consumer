import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Webhook } from '../../webhook/entities/webhook.entity';

@Entity()
export class Wiki {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  interwiki: string;

  @Column({ default: true })
  enabled: boolean;

  @OneToMany(() => Webhook, (webhook) => webhook.wiki)
  webhooks: Webhook[];
}
