import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wiki } from '../../wikis/entities/wiki.entity';

@Entity()
export class RecentChangesItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wiki_id', type: 'int' })
  wikiId: number;

  @ManyToOne(() => Wiki)
  @JoinColumn([{ name: 'wiki_id', referencedColumnName: 'id' }])
  wiki: Wiki;

  @Column()
  type: 'edit' | 'new';

  @Column({ type: 'int' })
  rcid: number;

  @Column({ type: 'int' })
  ns: number;

  @Column()
  title: string;

  @Column()
  user: string;

  @Column()
  anon: boolean;

  @Column({ type: 'int', nullable: true })
  oldlen: number;

  @Column({ type: 'int', nullable: true })
  newlen: number;

  @Column({ type: 'int', nullable: true })
  old_revid: number;

  @Column({ type: 'int', nullable: true })
  revid: number;

  @Column({ default: false })
  minor: boolean;

  @Column({ default: false })
  new: boolean;

  @Column({ default: false })
  redirect: boolean;

  @Column()
  timestamp: Date;

  @Column({ nullable: true })
  comment: string;
}
