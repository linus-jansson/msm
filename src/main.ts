import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from '@/services/PrismaService';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const _prismaService = app.get(PrismaService);
    await _prismaService.enableShutdownHooks(app)

    const config = new DocumentBuilder()
    .setTitle('Msm API')
    .setDescription('The msm API description')
    .addTag('msmapi')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
