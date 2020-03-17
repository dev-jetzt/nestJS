import { Injectable } from '@nestjs/common';
import { TableEntryDto } from './table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TEAM } from '../../shared/team.enum';
import { MatchRepository } from '../match/match.repository';

@Injectable()
export class TableService {

    constructor(
        @InjectRepository(MatchRepository) private readonly matchRepository: MatchRepository,
    ) { }

    public async calculateAndReturnTable(): Promise<TableEntryDto[]> {
        const entries = await this.calculatePositions();
        return this.sortByPoints(entries);
    }

    private async calculatePositions(): Promise<TableEntryDto[]> {
        return Promise.all(
            Object.values(TEAM).map((team: TEAM) => {
                return this.calculatePointsForTeam(team);
            }),
        );
    }

    private async calculatePointsForTeam(team: TEAM): Promise<TableEntryDto> {
        const [
            numOfWins,
            numOfDraws,
        ] = await Promise.all([
            this.matchRepository.getNumberOfWinsForTeam(team),
            this.matchRepository.getNumberOfDrawsForTeam(team),
        ]);

        const points = Number(numOfWins) * 3 + Number(numOfDraws);
        return TableEntryDto.create(team, points);
    }

    private sortByPoints(entries: TableEntryDto[]): TableEntryDto[] {
        return entries.sort((first, second) => {
            return first.points > second.points
             ? -1
             : 1;
        });
    }

}