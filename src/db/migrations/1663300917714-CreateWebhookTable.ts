import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWebhookTable1663300917714 implements MigrationInterface {
  name = 'CreateWebhookTable1663300917714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "webhook" (
            "id" SERIAL,
            "name" VARCHAR NOT NULL,
            "wiki_id" INTEGER NOT NULL,
            "enabled" BOOLEAN NOT NULL,
            "platform" VARCHAR NOT NULL,
            "url" VARCHAR NOT NULL,
            "config" JSONB NOT NULL,
            PRIMARY KEY ("id"),
            FOREIGN KEY ("wiki_id") REFERENCES "wiki" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "webhook"`);
  }
}
