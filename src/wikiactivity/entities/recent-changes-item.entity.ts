import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class RecentChangesItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wiki_id', type: 'int' })
  wikiId: number;

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
  redirect: boolean;

  @Column()
  timestamp: Date;

  @Column({ nullable: true })
  comment: string;
}
