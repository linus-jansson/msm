import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '@/services/PrismaService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const _prismaService = app.get(PrismaService);
  await _prismaService.enableShutdownHooks(app)

  await app.listen(3000);
}
bootstrap();
