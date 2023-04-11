import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { DockerServerService } from '@/services/DockerServerService';

@Controller("/api/server")
export class ServerController {
  constructor(private readonly server: DockerServerService) {}

    @Get("/")
    getServers(): {id:number, tag:string}[] {
        const servers = [{
            id: 1,
            tag: "Fluffy-bunny",
            version: "1.19.1",
            type: "vanilla",
            status: "running",
            properties: {
                MOTD: "A minecraft server",
            }
        }]

        return servers;
    }

    @Post(["/", "/create"])
    createServer(): string {
        return this.server.Create();
    }

    @Delete("/delete")
    DeleteServer(@Query("tag") tag: string) {
        if (!tag) {
            return "No tag provided";
        }
        return tag;
    }

    @Get("/start")
    StartServer(@Query("tag") tag: string) {

    }

    @Get("/stop")
    StopServer(@Query("tag") tag: string) {
        
    }

    @Get("/restart")
    RestartServer(@Query("tag") tag: string) {
        
    }
}
