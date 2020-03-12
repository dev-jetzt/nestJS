import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchDto } from './dto/match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchEntity } from './entities/match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(MatchEntity) private readonly matchRepository: Repository<MatchEntity>,
  ) {}

  public async getAllMatches(): Promise<MatchDto[]> {
    const allMatches = await this.matchRepository.find();
    return allMatches.map((match: MatchEntity) => MatchDto.createFromEntity(match));
  }

  public async createNewMatch(match: MatchDto): Promise<MatchDto> {
    const newMatchEntity = MatchEntity.createFromDto(match);
    const savedMatch = await this.matchRepository.save(newMatchEntity);
    return MatchDto.createFromEntity(savedMatch);
  }

  public async getMatchById(matchId: string): Promise<MatchDto> {
    const foundMatch = await this.matchRepository.findOne(matchId);

    if (!foundMatch) {
      throw new NotFoundException('The match could not be found');
    }

    return MatchDto.createFromEntity(foundMatch);
  }
}
