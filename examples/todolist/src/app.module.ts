import { Module } from '@nestjs/common'
import { CategoryModule } from './services/category/category.module'
import { DiscoveryModule } from '@nestjs/core'

@Module({
  imports: [CategoryModule, DiscoveryModule],
  controllers: [],
  providers: []
})
export class AppModule {}
