import { Repository, EntityRepository, Brackets } from 'typeorm';
import { MatchEntity } from '../entities/match.entity';
import { TEAM } from '../dto/team.enum';

@EntityRepository(MatchEntity)
export class MatchRepository extends Repository<MatchEntity> {

    public async getNumberOfWinsForTeam(team: TEAM): Promise<number> {
        return this.createQueryBuilder('match')
            .select('count(match.id)', 'wins')
            .where(new Brackets((qb) => {
                qb.where('match.homeTeam = :team', { team })
                    .andWhere('match.homeTeamGoals > match.guestTeamGoals');
            }))
            .orWhere(new Brackets((qb) => {
                qb.where('match.guestTeam = :team', { team })
                    .andWhere('match.guestTeamGoals > match.homeTeamGoals');
            }))
            .getRawOne()
            .then((raw) => raw.wins);
    }

    public async getNumberOfDrawsForTeam(team: TEAM): Promise<number> {
        return this.createQueryBuilder('match')
            .select('count(match.id)', 'draws')
            .where(new Brackets((qb) => {
                qb.where('match.homeTeam = :team', { team })
                    .orWhere('match.guestTeam = :team', { team });
            }))
            .andWhere('match.homeTeamGoals = match.guestTeamGoals')
            .getRawOne()
            .then((raw) => raw.draws);
    }
}