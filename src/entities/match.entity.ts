import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MatchDto } from 'dto/match.dto';

@Entity()
export class MatchEntity {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public homeTeam: string;

    @Column()
    public guestTeam: string;

    @Column()
    public homeTeamGoals: number;

    @Column()
    public guestTeamGoals: number;

    @Column({
        type: 'bool',
        default: false,
    })
    public isMatchFinished: boolean = false;

    public static createFromDto(dto: MatchDto): MatchEntity {
        const entity = new MatchEntity();
        entity.homeTeam = dto.homeTeam;
        entity.guestTeam = dto.guestTeam;
        entity.homeTeamGoals = dto.homeTeamGoals;
        entity.guestTeamGoals = dto.guestTeamGoals;
        entity.isMatchFinished = dto.isMatchFinished;
        return entity;
    }
}