import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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
