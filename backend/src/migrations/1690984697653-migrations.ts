import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1690984697653 implements MigrationInterface {
    name = 'Migrations1690984697653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "full_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "full_name" TO "name"`);
    }

}
