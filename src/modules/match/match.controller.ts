// tslint:disable-next-line:max-line-length
import { Get, Controller, Param, Query, Body, Post, UsePipes, ValidationPipe, UseFilters, Put, Patch, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchDto } from './match.dto';
import { GlobalErrorFilter } from '../../global.error.filter';
import { ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role, RoleGuard } from '../authmodule/role.guard';
import { USER_ROLE } from '../usermodule/user.roles';

@Controller('/api')
@UsePipes(ValidationPipe)
@UseFilters(GlobalErrorFilter)
@UseGuards(
  AuthGuard('token'),
  RoleGuard,
)
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  @Get('/matches')
  public async getAllMatches(
    @Query('finished') finished: boolean,
  ): Promise<MatchDto[]> {
    return this.matchService.getAllMatches(finished);
  }

  @Get('/match/:matchId')
  public async getMatchById(@Param('matchId', ParseUUIDPipe) matchId: string): Promise<MatchDto> {
    return this.matchService.getMatchById(matchId);
  }

  @Post('/match')
  @Role(USER_ROLE.ADMIN)
  public async createNewMatch(
    @Body() newMatch: MatchDto,
  ): Promise<MatchDto> {
    return this.matchService.createNewMatch(newMatch);
  }

  @Put('/match/:id')
  public async updateMatch(
    @Param('id', ParseUUIDPipe) matchId: string,
    @Body() updatedMatch: MatchDto,
  ): Promise<MatchDto> {
    return this.matchService.updateMatch(matchId, updatedMatch);
  }

  @Patch('/match/:id/finish')
  public async finishMatch(
    @Param('id', ParseUUIDPipe) matchId: string,
  ): Promise<MatchDto> {
    return this.matchService.finishMatch(matchId);
  }

  @Patch('/match/:id/homegoal')
  public async homeTeamShotAGoal(
    @Param('id', ParseUUIDPipe) matchId: string,
  ): Promise<MatchDto> {
    return this.matchService.scoreHomeGoal(matchId);
  }

  @Patch('/match/:id/guestgoal')
  public async guestTeamShotAGoal(
    @Param('id', ParseUUIDPipe) matchId: string,
  ): Promise<MatchDto> {
    return this.matchService.scoreGuestGoal(matchId);
  }

  @Delete('/match/:id')
  @HttpCode(204)
  public async deleteMatch(
    @Param('id', ParseUUIDPipe) matchId: string,
  ): Promise<void> {
    await this.matchService.deleteMatch(matchId);
  }

  @Delete('/matches')
  @HttpCode(204)
  public async deleteAllMatches(): Promise<void> {
    await this.matchService.deleteAllMatches();
  }
}
