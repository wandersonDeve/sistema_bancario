import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableAccount1732747065777 implements MigrationInterface {
    name = 'UpdateTableAccount1732747065777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_account" DROP CONSTRAINT "PK_8e478aa22e04d10f744d6dfd457"`);
        await queryRunner.query(`ALTER TABLE "tb_account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD CONSTRAINT "PK_8e478aa22e04d10f744d6dfd457" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tb_account" DROP CONSTRAINT "UQ_31b64e7e19681bbee33b2022c38"`);
        await queryRunner.query(`ALTER TABLE "tb_account" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD "number" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD CONSTRAINT "UQ_31b64e7e19681bbee33b2022c38" UNIQUE ("number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_account" DROP CONSTRAINT "UQ_31b64e7e19681bbee33b2022c38"`);
        await queryRunner.query(`ALTER TABLE "tb_account" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD "number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD CONSTRAINT "UQ_31b64e7e19681bbee33b2022c38" UNIQUE ("number")`);
        await queryRunner.query(`ALTER TABLE "tb_account" DROP CONSTRAINT "PK_8e478aa22e04d10f744d6dfd457"`);
        await queryRunner.query(`ALTER TABLE "tb_account" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_account" ADD CONSTRAINT "PK_8e478aa22e04d10f744d6dfd457" PRIMARY KEY ("id")`);
    }

}
