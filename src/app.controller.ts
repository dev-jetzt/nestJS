import { Get, Controller, Param, Query, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {Person} from './dto/person.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  public getPeople(): Person[] {
    return this.appService.getPeople();
  }

  @Post('/')
  public postPerson(
    @Body() person: Person,
  ): string {
    return this.appService.postPerson(person);
  }
}
