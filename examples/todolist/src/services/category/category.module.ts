import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from 'src/entities/category.entity'
import { CategoryController, CategoryService, CategoryRepository } from '.'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService]
})
export class CategoryModule {}
