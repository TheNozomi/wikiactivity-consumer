import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWikiTable1663299974460 implements MigrationInterface {
  name = 'CreateWikiTable1663299974460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wiki" (
        "id" SERIAL,
        "interwiki" VARCHAR NOT NULL,
        "display_name" VARCHAR NOT NULL,
        "enabled" BOOLEAN NOT NULL DEFAULT 'true',
        PRIMARY KEY ("id"),
        UNIQUE ("interwiki")
    )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "wiki"`);
  }
}
