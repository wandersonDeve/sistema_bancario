import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtInTableAccount1732747331620 implements MigrationInterface {
    name = 'AddCreatedAtInTableAccount1732747331620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_account" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_account" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "tb_account" DROP COLUMN "created_at"`);
    }

}
