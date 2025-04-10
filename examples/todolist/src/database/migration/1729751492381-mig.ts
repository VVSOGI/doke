import { MigrationInterface, QueryRunner } from 'typeorm'

export class Mig1729751492381 implements MigrationInterface {
  name = 'Mig1729751492381'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ADD "deleted" boolean NOT NULL DEFAULT 'false'`)
    await queryRunner.query(`ALTER TABLE "todolist" DROP CONSTRAINT "FK_b927e96b3f463746f6fbf3893c3"`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "categoryId" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "checked" SET DEFAULT 'false'`)
    await queryRunner.query(
      `ALTER TABLE "todolist" ADD CONSTRAINT "FK_b927e96b3f463746f6fbf3893c3" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todolist" DROP CONSTRAINT "FK_b927e96b3f463746f6fbf3893c3"`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "checked" SET DEFAULT false`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "categoryId" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "todolist" ADD CONSTRAINT "FK_b927e96b3f463746f6fbf3893c3" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deleted"`)
  }
}
