import { MatchEntity } from './match.entity';
import { IsNotEmpty, IsString, Max, Min, IsEnum, IsDefined, IsOptional } from 'class-validator';
import { TEAM } from '../../shared/team.enum';

export class MatchDto {

    @IsNotEmpty()
    @IsEnum(TEAM)
    public homeTeam: TEAM;

    @IsNotEmpty()
    @IsEnum(TEAM)
    public guestTeam: TEAM;

    @IsDefined()
    @Min(0)
    public homeTeamGoals: number;

    @IsDefined()
    @Min(0)
    public guestTeamGoals: number;

    public isMatchFinished: boolean;

    @IsOptional()
    @Min(0)
    public numberOfViewers: number;

    public static createFromEntity(matchEntity: MatchEntity): MatchDto {
        const match = new MatchDto();
        match.homeTeam = matchEntity.homeTeam;
        match.guestTeam = matchEntity.guestTeam;
        match.homeTeamGoals = matchEntity.homeTeamGoals;
        match.guestTeamGoals = matchEntity.guestTeamGoals;
        match.isMatchFinished = matchEntity.isMatchFinished;

        if (matchEntity.numberOfViewers) {
            match.numberOfViewers = matchEntity.numberOfViewers;
        }

        return match;
    }
}