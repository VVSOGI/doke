import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Config } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: Config.client.url
    }
  })

  await app.listen(Config.server.port)
}
bootstrap()
