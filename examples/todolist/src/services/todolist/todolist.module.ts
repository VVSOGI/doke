import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todolist } from 'src/entities/todolist.entity'
import { TodolistController, TodolistService, TodolistRepository } from '.'
import { CategoryModule } from '../'

@Module({
  imports: [TypeOrmModule.forFeature([Todolist]), CategoryModule],
  controllers: [TodolistController],
  providers: [TodolistService, TodolistRepository]
})
export class TodolistModule {}
