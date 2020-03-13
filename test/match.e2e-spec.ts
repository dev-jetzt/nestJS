import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { v4 as uuidV4} from 'uuid';
import { MatchModule } from '../src/match.module';
import { Connection } from 'typeorm';
import { MatchEntity } from '../src/entities/match.entity';
import { MatchDto } from '../src/dto/match.dto';
import { TEAM } from '../src/dto/team.enum';

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

  describe(`/ (GET)`, () => {

    it('/ (GET)', async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;

      await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      const response = await request(app.getHttpServer())
        .get('/api/matches')
        .expect(200);

      expect(response.body).toHaveLength(1);
    });

    describe(`/ (GET) by ID`, () => {

      it('/ (GET) found by ID', async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 2;
        fakeMatch.guestTeamGoals = 4;

        const savedMatch = await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        const response = await request(app.getHttpServer())
          .get(`/api/match/${savedMatch.id}`)
          .expect(200);

        expect(response.body).toBeDefined();
      });

      it('/ (GET) non existing', async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 2;
        fakeMatch.guestTeamGoals = 4;

        await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        const response = await request(app.getHttpServer())
          .get(`/api/match/${uuidV4()}`)
          .expect(404);

        expect(response.body.just4fun).toBeDefined();
      });

      it('/ (GET) invalid matchID', async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 2;
        fakeMatch.guestTeamGoals = 4;

        await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        const response = await request(app.getHttpServer())
          .get(`/api/match/invalid`)
          .expect(400);

        expect(response.body.just4fun).toBeDefined();
      });
    });

  });

  it('/ (POST)', async () => {

    const fakeMatch = new MatchDto();
    fakeMatch.homeTeam = TEAM.FC_INGOLSTADT;
    fakeMatch.guestTeam = TEAM.TSV_1860_MUENCHEN;
    fakeMatch.homeTeamGoals = 2;
    fakeMatch.guestTeamGoals = 4;

    const response = await request(app.getHttpServer())
      .post('/api/match')
      .send(fakeMatch)
      .expect(201);

    expect(response.body).toBeDefined();
  });

  it('/ (POST) failes', async () => {
    const fakeMatch = {
      homeTeam: TEAM.FC_INGOLSTADT,
      guestTeam: TEAM.TSV_1860_MUENCHEN,
      homeTeamGoals: 1,
      guestTeamGoals: -2,
    };

    await request(app.getHttpServer())
      .post('/api/match')
      .send(fakeMatch)
      .expect(400);
  });

  describe(`/ (PUT)`, () => {

    it(`/ (PUT) successfully`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;

      const savedMatch = await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      const updatedMatch = Object.assign(new MatchDto(), fakeMatch) as MatchDto;
      updatedMatch.homeTeamGoals = 0;
      updatedMatch.guestTeamGoals = 0;

      const response = await request(app.getHttpServer())
        .put(`/api/match/${savedMatch.id}`)
        .send(updatedMatch)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.homeTeamGoals).toBe(0);
      expect(response.body.guestTeamGoals).toBe(0);
    });

    it(`/ (PUT) match not found`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;

      await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      const updatedMatch = Object.assign(new MatchDto(), fakeMatch) as MatchDto;
      updatedMatch.homeTeamGoals = 0;
      updatedMatch.guestTeamGoals = 0;

      await request(app.getHttpServer())
        .put(`/api/match/${uuidV4()}`)
        .send(updatedMatch)
        .expect(404);
    });

    it(`/ (PUT) invalid new values`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;

      const savedMatch = await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      const updatedMatch = Object.assign(new MatchDto(), fakeMatch) as MatchDto;
      updatedMatch.homeTeamGoals = 0;
      updatedMatch.guestTeamGoals = -2;

      await request(app.getHttpServer())
        .put(`/api/match/${savedMatch.id}`)
        .send(updatedMatch)
        .expect(400);
    });
  });

  describe(`/ (PATCH)`, () => {

    it(`/ (PATCH) successfully`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;
      fakeMatch.isMatchFinished = false;

      const savedMatch = await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      const response = await request(app.getHttpServer())
        .patch(`/api/match/${savedMatch.id}/finish`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.isMatchFinished).toBe(true);
    });

    it(`/ (PATCH) match not found`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;
      fakeMatch.isMatchFinished = false;

      await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      await request(app.getHttpServer())
        .patch(`/api/match/${uuidV4()}/finish`)
        .expect(404);
    });

    it(`/ (PATCH) invalid matchID`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;
      fakeMatch.isMatchFinished = false;

      await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      await request(app.getHttpServer())
        .patch(`/api/match/invalid/finish`)
        .expect(400);
    });

  });
});
