import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecentChangesItemTable1663301145341
  implements MigrationInterface
{
  name = 'CreateRecentChangesItemTable1663301145341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "recent_changes_item" (
        "id" SERIAL,
        "wiki_id" INTEGER NOT NULL,
        "type" VARCHAR NOT NULL,
        "rcid" INTEGER NOT NULL,
        "ns" INTEGER NOT NULL,
        "title" VARCHAR NOT NULL,
        "user" VARCHAR NOT NULL,
        "anon" BOOLEAN NOT NULL,
        "oldlen" INTEGER NULL DEFAULT NULL,
        "newlen" INTEGER NULL DEFAULT NULL,
        "old_revid" INTEGER NULL DEFAULT NULL,
        "revid" INTEGER NULL DEFAULT NULL,
        "minor" BOOLEAN NOT NULL DEFAULT 'false',
        "new" BOOLEAN NOT NULL DEFAULT 'false',
        "redirect" BOOLEAN NOT NULL DEFAULT 'false',
        "timestamp" TIMESTAMP NOT NULL,
        "comment" VARCHAR NULL DEFAULT NULL,
        PRIMARY KEY ("id")
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recent_changes_item"`);
  }
}
