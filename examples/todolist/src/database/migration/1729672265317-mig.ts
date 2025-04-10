import { MigrationInterface, QueryRunner } from 'typeorm'

export class Mig1729672265317 implements MigrationInterface {
  name = 'Mig1729672265317'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todolist" DROP COLUMN "description"`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "checked" SET DEFAULT 'false'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "checked" SET DEFAULT false`)
    await queryRunner.query(`ALTER TABLE "todolist" ADD "description" character varying(255) NOT NULL`)
  }
}
