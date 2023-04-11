import { Controller, Get, Query } from '@nestjs/common';
import { MojangService } from '@/services/MojangService';

@Controller("/api/versions")
export class MojangController {
    constructor(private readonly mojangService: MojangService) {}

    @Get("/")
    async root(): Promise<any> {
        return await this.mojangService.getVersionList();
    }

    @Get("/latest")
    async Latest(): Promise<any> {
        return await this.mojangService.getLatestVersion();
    }

    @Get("/latest-snapshot")
    async LatestSnapshot(): Promise<any> {
        return await this.mojangService.getLatestSnapshot();
    }

    @Get("/version")
    async Version(@Query("version") targetVersion: string): Promise<any> {
        if (!targetVersion) {
            return "No version provided";
        }
        let res = await this.mojangService.getVersion(targetVersion);

        if (!res) {
            return "Version " + targetVersion + " not found";
        }
        return res;

    }


    // @Get("/hello")
    // getHello(): string {
    //     return this.appService.getHello();
    // }
}
