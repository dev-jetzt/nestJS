import { TEAM } from './team.enum';

export class TableEntryDto {
    public team: TEAM;
    public points: number;

    public static create(team: TEAM, points: number): TableEntryDto {
        const dto = new TableEntryDto();
        dto.team = team;
        dto.points = points;
        return dto;
    }
}