import { MigrationInterface, QueryRunner } from 'typeorm'

export class Mig1729068361177 implements MigrationInterface {
  name = 'Mig1729068361177'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todolist" ADD "checked" boolean NOT NULL DEFAULT 'false'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todolist" DROP COLUMN "checked"`)
  }
}
