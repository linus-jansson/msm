import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';
import { MojangService } from './MojangService';

import { Server, Prisma } from '@prisma/client';
import randomName from '@/lib/helpers/randomname';

import * as fs from 'fs'
import { exec } from 'child_process';

/* https://github.com/itzg/docker-minecraft-server/blob/master/README.md */
@Injectable()
export class DockerServerService {
    constructor(
        private prisma: PrismaService,
        private readonly mojang: MojangService
    ) {}

    async ExecuteCommand(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                resolve(stdout);
            });
        });
    }
  
    async Create(
        targetVersion?: string, 
        _type?: string,
        should_start_after_creation: boolean = false
    ): Promise<object> {
        console.log(targetVersion, _type);
        const new_tag = randomName();
        const new_server_version = targetVersion || await this.mojang.getLatestVersion();
        const new_server_type = _type || "vanilla";

        const servers_path = process.cwd();
        console.log(servers_path)
        const path = `${servers_path}/servers/${new_tag}/`;
        console.log(path)

        const docker_compose = `
        version: "3"

        services:
            "${new_tag}":
                image: itzg/minecraft-server
                ports:
                    - 25565:25565
                environment:
                    - EULA="TRUE"
                    - VERSION="${new_server_version}"
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

        if (should_start_after_creation)
        {
            await this.ExecuteCommand(`cd ${path} && docker-compose up -d`);
        }

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

        return {
            ...db_result,
            will_start: should_start_after_creation,
            server_port: 25565,
        };
    }

}
