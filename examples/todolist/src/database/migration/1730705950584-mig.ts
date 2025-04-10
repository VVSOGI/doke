import { MigrationInterface, QueryRunner } from 'typeorm'

export class Mig1730705950584 implements MigrationInterface {
  name = 'Mig1730705950584'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todolist" ADD "order" integer NOT NULL DEFAULT '0'`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "checked" SET DEFAULT 'false'`)
    await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "deleted" SET DEFAULT 'false'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "deleted" SET DEFAULT false`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "checked" SET DEFAULT false`)
    await queryRunner.query(`ALTER TABLE "todolist" DROP COLUMN "order"`)
  }
}
