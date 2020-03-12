import { Get, Controller, Param, Query, Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import {MatchDto} from './dto/match.dto';

@Controller('/api')
@UsePipes(ValidationPipe)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('/matches')
  public async getAllMatches(): Promise<MatchDto[]> {
    return this.matchService.getAllMatches();
  }

  @Post('/match')
  public async createNewMatch(
    @Body() newMatch: MatchDto,
  ): Promise<MatchDto> {
    return this.matchService.createNewMatch(newMatch);
  }
}
