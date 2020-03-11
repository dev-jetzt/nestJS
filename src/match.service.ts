import { Injectable } from '@nestjs/common';
import { Match } from './dto/match.dto';

@Injectable()
export class MatchService {

  private iAmADatabaseNow: Match[] = [
    Match.create(
      '1860 München',
      'MSV Duisburg',
      0,
      4,
      true,
    ),
  ];

  public getAllMatches(): Match[] {
    return this.iAmADatabaseNow;
  }
}
