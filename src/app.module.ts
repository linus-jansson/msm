import { Module } from '@nestjs/common';

/* Controllers */
import { AppController } from '@/controllers/app.controller';
import { ServerController } from '@/controllers/server.controller';
import { MojangController } from './controllers/mojang.controller';

/* Services */
import { AppService } from '@/services/AppService';
import { DockerServerService } from '@/services/DockerServerService';
import { MojangService } from './services/MojangService';
import { PrismaService } from './services/PrismaService';

@Module({
    imports: [],
    controllers: [
        AppController,
        ServerController,
        MojangController
    ],
    providers: [
        AppService,
        DockerServerService, // Definitions for the server creation
        MojangService,
        PrismaService
    ],
})
export class AppModule {}
