import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTransaction1732749218858 implements MigrationInterface {
  name = 'CreateTableTransaction1732749218858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."tb_transaction_type_enum" AS ENUM('deposit', 'withdraw', 'transfer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_transaction" ("id" SERIAL NOT NULL, "type" "public"."tb_transaction_type_enum" NOT NULL, "amount" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6f9d7f02d8835ac9ef1f685a2e8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_transaction"`);
    await queryRunner.query(`DROP TYPE "public"."tb_transaction_type_enum"`);
  }
}
