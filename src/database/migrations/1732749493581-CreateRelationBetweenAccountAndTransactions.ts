import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationBetweenAccountAndTransactions1732749493581 implements MigrationInterface {
    name = 'CreateRelationBetweenAccountAndTransactions1732749493581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" ADD "sourceAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" ADD "targetAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" ADD CONSTRAINT "FK_54a47902a2b321220ef0f0f503a" FOREIGN KEY ("sourceAccountId") REFERENCES "tb_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" ADD CONSTRAINT "FK_a132e582a8492b9eeda6d567d6b" FOREIGN KEY ("targetAccountId") REFERENCES "tb_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_transaction" DROP CONSTRAINT "FK_a132e582a8492b9eeda6d567d6b"`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" DROP CONSTRAINT "FK_54a47902a2b321220ef0f0f503a"`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" DROP COLUMN "targetAccountId"`);
        await queryRunner.query(`ALTER TABLE "tb_transaction" DROP COLUMN "sourceAccountId"`);
    }

}
