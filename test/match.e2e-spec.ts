import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MatchModule } from '../src/match.module';
import { Connection } from 'typeorm';
import { MatchEntity } from '../src/entities/match.entity';
import { MatchDto } from '../src/dto/match.dto';

describe('MatchController (e2e)', () => {

  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MatchModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dbConnection = app.get(Connection);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.synchronize(true);
  });

  it('/ (GET)', async () => {

    const fakeMatch = new MatchEntity();
    fakeMatch.homeTeam = 'FC Heimmannschaft';
    fakeMatch.guestTeam = 'Spvgg. GastMannschaft';
    fakeMatch.homeTeamGoals = 2;
    fakeMatch.guestTeamGoals = 4;

    await dbConnection.getRepository(MatchEntity).save(fakeMatch);

    const response = await request(app.getHttpServer())
      .get('/api/matches')
      .expect(200);

    expect(response.body).toHaveLength(1);
  });

  it('/ (POST)', async () => {

    const fakeMatch = new MatchDto();
    fakeMatch.homeTeam = 'FC Heimmannschaft';
    fakeMatch.guestTeam = 'Spvgg. GastMannschaft';
    fakeMatch.homeTeamGoals = 2;
    fakeMatch.guestTeamGoals = 4;

    const response = await request(app.getHttpServer())
      .post('/api/match')
      .send(fakeMatch)
      .expect(201);

    expect(response.body).toBeDefined();
  });
});
