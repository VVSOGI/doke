import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { CategoryModule, TodolistModule } from './services'

@Module({
  imports: [CategoryModule, TodolistModule, DiscoveryModule]
})
export class AppModule {}
