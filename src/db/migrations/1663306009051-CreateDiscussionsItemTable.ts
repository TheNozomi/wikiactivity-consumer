import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDiscussionsItemTable1663306009051
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "discussions_item" (
        "id" SERIAL,
        "wiki_id" INTEGER NOT NULL,
        "type" VARCHAR NOT NULL,
        "post_id" BIGINT NOT NULL,
        "thread_id" BIGINT NOT NULL,
        "thread_title" VARCHAR,
        "forum_id" BIGINT NOT NULL,
        "forum_name" VARCHAR,
        "user_id" INTEGER NOT NULL,
        "user_name" VARCHAR NOT NULL,
        "is_reply" BOOLEAN NOT NULL DEFAULT 'false',
        "json_model" JSONB NOT NULL,
        "raw_content" TEXT NOT NULL,
        "position" INTEGER NOT NULL,
        "timestamp" TIMESTAMP NOT NULL,
        PRIMARY KEY ("id"),
        FOREIGN KEY ("wiki_id") REFERENCES "wiki" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "discussions_item"`);
  }
}
