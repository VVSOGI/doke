import { Module } from '@nestjs/common'
import { TodolistController } from './todolist.controller'

@Module({
  controllers: [TodolistController]
})
export class TodolistModule {}
