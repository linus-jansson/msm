import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';
import { MojangService } from './MojangService';

import { Server, Prisma } from '@prisma/client';
import randomName from '@/lib/helpers/randomname';

import fs from 'fs';

/* https://github.com/itzg/docker-minecraft-server/blob/master/README.md */
@Injectable()
export class DockerServerService {
    constructor(
        private prisma: PrismaService,
        private readonly mojang: MojangService
    ) {}
  
    async Create(
        targetVersion: string, 
        _type: string
    ): Promise<object> {
        console.log(targetVersion, _type);
        const new_tag = randomName();
        const new_server_version = targetVersion || await this.mojang.getLatestVersion();
        const new_server_type = _type || "vanilla";

        const servers_path = process.cwd();
        const path = `${servers_path}/${new_tag}/`
        const docker_compose = `
        version: "3"

        services:
        mc:
            image: itzg/minecraft-server
            ports:
                - 25565:25565
            environment:
                EULA: "TRUE"
            tty: true
            stdin_open: true
            restart: unless-stopped
            volumes:
                # attach a directory relative to the directory containing this compose file
                - ./server_data:/data
        `;
        // Create server folder
        fs.mkdirSync(path, {recursive: true});
        // Create server_data folder
        fs.mkdirSync(`${path}/server_data`, {recursive: true});
        // Create docker-compose.yml
        fs.writeFileSync(`${path}/docker-compose.yml`, docker_compose);


        // Create docker ymal to server folder location <servers>/<tag>/docker-compose.yml
        /*
            <servers>
                <tag>
                    docker-compose.yml
                    server_data/
                        world/
                        server.properties
                        eula.txt
                        ....
        */

        

        // Save to new server to database
        const db_result = await this.prisma.server.create({
            data: {
                tag: new_tag,
                version: new_server_version,
                type: new_server_type,
            }
        })

        // console.log(res);

        return db_result;
    }

}
