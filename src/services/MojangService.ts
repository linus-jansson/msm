import { Injectable } from '@nestjs/common';

interface IMojangVersionsObject {
    latest: {
        release: string,
        snapshot: string
    },
    versions: {
        id: string,
        type: string,
        url: string,
        time: string,
        releaseTime: string
    }[]
}

@Injectable()
export class MojangService {
    versionObject = async () => {
        let url = 'https://launchermeta.mojang.com/mc/game/version_manifest.json'

        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    getVersionList(): Promise<IMojangVersionsObject> {
        let url = 'https://launchermeta.mojang.com/mc/game/version_manifest.json'

        return new Promise( async (resolve, reject) => {
            let response = await fetch(url);

            if (response.status != 200)
                reject("Error fetching version list");

            resolve(await response.json())
        })
        
    }

    async getLatestVersion(): Promise<string> {
        return (await this.getVersionList())
            .latest
            .release
    }

    async getLatestSnapshot(): Promise<string> {
        return (await this.getVersionList())
            .latest
            .snapshot
    }

    async getVersion(targetVersion): Promise<any> {
        let versionList = await this.getVersionList();
        let version = versionList
            .versions
            .find(version => version.id == targetVersion);
        
        if (!version) {
            return null
        }
        return version
    }


}