import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAccount1732745567832 implements MigrationInterface {
  name = 'CreateTableAccount1732745567832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_account" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "balance" numeric(10,2) NOT NULL, CONSTRAINT "UQ_31b64e7e19681bbee33b2022c38" UNIQUE ("number"), CONSTRAINT "PK_8e478aa22e04d10f744d6dfd457" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_account"`);
  }
}
