import { Get, Controller, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:name')
  public sayHello(
    @Param('name') name: string,
    @Query('title') title: string,
  ): string {
    return this.appService.sayHelloToName(title, name);
  }
}
