import { MatchEntity } from '../entities/match.entity';

export class MatchDto {
    public homeTeam: string;
    public guestTeam: string;
    public homeTeamGoals: number;
    public guestTeamGoals: number;
    public isMatchFinished: boolean;

    public static createFromEntity(matchEntity: MatchEntity): MatchDto {
        const match = new MatchDto();
        match.homeTeam = matchEntity.homeTeam;
        match.guestTeam = matchEntity.guestTeam;
        match.homeTeamGoals = matchEntity.homeTeamGoals;
        match.guestTeamGoals = matchEntity.guestTeamGoals;
        match.isMatchFinished = matchEntity.isMatchFinished;
        return match;
    }
}