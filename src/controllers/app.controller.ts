import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/services/AppService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  root(): string {
    return  "hello world";
  }

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }
}
