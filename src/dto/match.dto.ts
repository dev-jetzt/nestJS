export class Match {
    public homeTeam: string;
    public guestTeam: string;
    public homeTeamGoals: number;
    public guestTeamGoals: number;
    public isMatchFinished: boolean;

    public static create(
        homeTeam: string,
        guestTeam: string,
        homeTeamGoals: number,
        guestTeamGoals: number,
        isMatchFinished: boolean,
    ): Match {
        const match = new Match();
        match.homeTeam = homeTeam;
        match.guestTeam = guestTeam;
        match.homeTeamGoals = homeTeamGoals;
        match.guestTeamGoals = guestTeamGoals;
        match.isMatchFinished = isMatchFinished;
        return match;
    }
}