import { Module } from '@nestjs/common';

/* Controllers */
import { AppController } from '@/controllers/app.controller';
import { ServerController } from '@/controllers/server.controller';

/* Services */
import { AppService } from '@/services/AppService';
import { DockerServerService } from '@/services/DockerServerService';

@Module({
    imports: [],
    controllers: [
        AppController,
        ServerController
    ],
    providers: [
        AppService,
        DockerServerService // Definitions for the server creation
    ],
})
export class AppModule {}
