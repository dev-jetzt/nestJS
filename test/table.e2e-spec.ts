import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { MatchEntity } from '../src/modules/match/match.entity';
import { TEAM } from '../src/shared/team.enum';
import { AppModule } from '../src/app.module';

describe('TableController (e2e)', () => {

  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
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

  describe(`/ (GET)`, () => {

    it(`should return right table`, async () => {

      const fakeMatch1 = new MatchEntity();
      fakeMatch1.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch1.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch1.homeTeamGoals = 2;
      fakeMatch1.guestTeamGoals = 4;

      const fakeMatch2 = new MatchEntity();
      fakeMatch2.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch2.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch2.homeTeamGoals = 2;
      fakeMatch2.guestTeamGoals = 4;

      const fakeMatch3 = new MatchEntity();
      fakeMatch3.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch3.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch3.homeTeamGoals = 3;
      fakeMatch3.guestTeamGoals = 3;

      await dbConnection.getRepository(MatchEntity).save([fakeMatch1, fakeMatch2, fakeMatch3]);

      const result = await request(app.getHttpServer())
        .get('/api/table')
        .expect(200);

      expect(result.body).toHaveLength(Object.keys(TEAM).length);
      expect(result.body[0].team).toBe(TEAM.SPVGG_UNTERHACHING);
      expect(result.body[1].team).toBe(TEAM.FC_BAYERN_2);
    });

  });
});
