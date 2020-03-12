import { Get, Controller, Param, Query, Body, Post, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import { MatchService } from './match.service';
import {MatchDto} from './dto/match.dto';
import { MatchErrorFilter } from './match.error.filter';

@Controller('/api')
@UsePipes(ValidationPipe)
@UseFilters(MatchErrorFilter)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('/matches')
  public async getAllMatches(): Promise<MatchDto[]> {
    return this.matchService.getAllMatches();
  }

  @Get('/match/:matchId')
  public async getMatchById(@Param('matchId') matchId: string): Promise<MatchDto> {
    return this.matchService.getMatchById(matchId);
  }

  @Post('/match')
  public async createNewMatch(
    @Body() newMatch: MatchDto,
  ): Promise<MatchDto> {
    return this.matchService.createNewMatch(newMatch);
  }
}
