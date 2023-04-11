import { Injectable } from '@nestjs/common';

@Injectable()
export class DockerServerService {
  
  
    Create(): string {
        return 'Server created id: 1 tag: Fluffy bunny';
    }

}
