import { MigrationInterface, QueryRunner } from 'typeorm'

export class Mig1729669944640 implements MigrationInterface {
  name = 'Mig1729669944640'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todolist" DROP CONSTRAINT "FK_b927e96b3f463746f6fbf3893c3"`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "checked" SET DEFAULT 'false'`)
    await queryRunner.query(
      `ALTER TABLE "todolist" ADD CONSTRAINT "FK_b927e96b3f463746f6fbf3893c3" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todolist" DROP CONSTRAINT "FK_b927e96b3f463746f6fbf3893c3"`)
    await queryRunner.query(`ALTER TABLE "todolist" ALTER COLUMN "checked" SET DEFAULT false`)
    await queryRunner.query(
      `ALTER TABLE "todolist" ADD CONSTRAINT "FK_b927e96b3f463746f6fbf3893c3" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
