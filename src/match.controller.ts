import { Get, Controller, Param, Query, Body, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import {Match} from './dto/match.dto';

@Controller('/api')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('/matches')
  public getAllMatches(): Match[] {
    return this.matchService.getAllMatches();
  }
}
