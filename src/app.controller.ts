import { Get, Controller, Param, Query, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {Person} from './dto/person.dto';

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

  @Post('/')
  public postPerson(
    @Body() person: Person,
  ): string {
    return this.appService.postPerson(person);
  }
}
