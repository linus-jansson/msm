import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/PrismaService';
import { MojangService } from './MojangService';

import { Server, Prisma } from '@prisma/client';
import randomName from '@/lib/helpers/randomname';

import * as fs from 'fs'
import { exec } from 'child_process';

const findFreePort = () => "25565";

/* https://github.com/itzg/docker-minecraft-server/blob/master/README.md */
@Injectable()
export class DockerServerService {
    servers_path = process.cwd() + "/servers/";
    constructor(
        private prisma: PrismaService,
        private readonly mojang: MojangService
    ) {
        console.log(this.servers_path)
    }

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
        const new_tag = randomName();
        const new_server_version = targetVersion || await this.mojang.getLatestVersion();
        const new_server_type = _type || "vanilla";
        const port = findFreePort();


        /*
            Create docker ymal to server folder location <servers>/<tag>/docker-compose.yml
            file structure:
            <servers>
                <tag>
                    docker-compose.yml
                    server_data/
                        world/
                        server.properties
                        eula.txt
                        ....
        */

        const new_server_path = `${this.servers_path}/${new_tag}/`;

        const docker_compose = `version: "3"

services:
    "${new_tag}":
        image: itzg/minecraft-server
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
        fs.mkdirSync(new_server_path, {recursive: true});
        // Create server_data folder
        fs.mkdirSync(`${new_server_path}/server_data`, {recursive: true});
        // Create docker-compose.yml
        fs.writeFileSync(`${new_server_path}/docker-compose.yml`, docker_compose);

        if (should_start_after_creation)
        {
            await this.ExecuteCommand(`cd ${new_server_path} && docker-compose up -d`);
        }


        

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
            server: {
                ...db_result,
            },
            custom_properties: {},
            will_start: should_start_after_creation,
            server_port: (should_start_after_creation === true) ? findFreePort() : null, // when a server is started start searching for a free port on 25565 and increment by 1
        };
    }

    async Start(tag: string): Promise<{status:string, port: string} | {status: string, error: any}> {
        const port = findFreePort();
        try {
            await this.ExecuteCommand(`cd ${this.servers_path}/${tag} && docker-compose up -p ${port}:25565 -d`);
            return {
                status: "success",
                port: port 
            }
        } catch (error) {
            return {
                status: "Failed",
                error: error,
            }
        }
    }

}
