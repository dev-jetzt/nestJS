import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';
import { MatchEntity } from '../src/modules/match/match.entity';
import { MatchDto } from '../src/modules/match/match.dto';
import { TEAM } from '../src/shared/team.enum';
import { AuthService } from '../src/modules/authmodule/auth.service';
import { AuthModule } from '../src/modules/authmodule/auth.module';
import { User } from '../src/modules/usermodule/user.entity';
import { USER_ROLE } from '../src/modules/usermodule/user.roles';

describe('MatchController (e2e)', () => {

  let app: INestApplication;
  let dbConnection: Connection;
  let authService: AuthService;
  let testUser: User;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dbConnection = app.get(Connection);
    authService = app.select(AuthModule).get(AuthService);

    await app.init();

    testUser = new User();
    testUser.password = 'Password-For-Testing';
    testUser.username = 'Test-Username';
    testUser.role = USER_ROLE.ADMIN;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.synchronize(true);
    await dbConnection.getRepository(User).save(testUser);
    const {token} = await authService.validateUser(testUser.username, testUser.password);
    authToken = token;
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
        .set('authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveLength(1);
    });

    it('/ (GET) only finished matches', async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;

      await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      const response = await request(app.getHttpServer())
        .get('/api/matches')
        .query({finished: true})
        .set('authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveLength(0);
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
          .set('authorization', `Bearer ${authToken}`)
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
          .set('authorization', `Bearer ${authToken}`)
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
          .set('authorization', `Bearer ${authToken}`)
          .expect(400);

        expect(response.body.just4fun).toBeDefined();
      });
    });

  });

  describe(`/ POST`, () => {

    it('/ (POST) successfully', async () => {

      const fakeMatch = new MatchDto();
      fakeMatch.homeTeam = TEAM.FC_INGOLSTADT;
      fakeMatch.guestTeam = TEAM.TSV_1860_MUENCHEN;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;

      const response = await request(app.getHttpServer())
        .post('/api/match')
        .set('authorization', `Bearer ${authToken}`)
        .send(fakeMatch)
        .expect(201);

      expect(response.body).toBeDefined();
    });

    it('/ (POST) with number of viewers successfully', async () => {

      const fakeMatch = new MatchDto();
      fakeMatch.homeTeam = TEAM.FC_INGOLSTADT;
      fakeMatch.guestTeam = TEAM.TSV_1860_MUENCHEN;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;
      fakeMatch.numberOfViewers = 33000;

      const response = await request(app.getHttpServer())
        .post('/api/match')
        .set('authorization', `Bearer ${authToken}`)
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
        .set('authorization', `Bearer ${authToken}`)
        .send(fakeMatch)
        .expect(400);
    });
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
        .set('authorization', `Bearer ${authToken}`)
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
        .set('authorization', `Bearer ${authToken}`)
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
        .set('authorization', `Bearer ${authToken}`)
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
        .set('authorization', `Bearer ${authToken}`)
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
        .set('authorization', `Bearer ${authToken}`)
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
        .set('authorization', `Bearer ${authToken}`)
        .expect(400);
    });
  });

  describe(`/ (DELETE)`, () => {

    it(`/ (DELETE) successfully`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;
      fakeMatch.isMatchFinished = false;

      const savedMatch = await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      await request(app.getHttpServer())
        .delete(`/api/match/${savedMatch.id}`)
        .set('authorization', `Bearer ${authToken}`)
        .expect(204);
    });

    it(`/ (DELETE) match not found`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;
      fakeMatch.isMatchFinished = false;

      await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      await request(app.getHttpServer())
        .delete(`/api/match/${uuidV4()}`)
        .set('authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it(`/ (DELETE) invalid matchID`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;
      fakeMatch.isMatchFinished = false;

      await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      await request(app.getHttpServer())
        .delete(`/api/match/invalid`)
        .set('authorization', `Bearer ${authToken}`)
        .expect(400);
    });

    it(`/ (DELETE) all matches`, async () => {

      const fakeMatch = new MatchEntity();
      fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
      fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
      fakeMatch.homeTeamGoals = 2;
      fakeMatch.guestTeamGoals = 4;
      fakeMatch.isMatchFinished = false;

      await dbConnection.getRepository(MatchEntity).save(fakeMatch);
      await dbConnection.getRepository(MatchEntity).save(fakeMatch);
      await dbConnection.getRepository(MatchEntity).save(fakeMatch);

      await request(app.getHttpServer())
        .delete('/api/matches')
        .set('authorization', `Bearer ${authToken}`)
        .expect(204);

      const allMatchesInDb = await dbConnection.getRepository(MatchEntity).find();
      expect(allMatchesInDb).toHaveLength(0);
    });
  });

  describe(`/ (PATCH) goals`, () => {

    describe(`PATCH homegoals`, () => {

      it(`/ (PATCH) invalid machID`, async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 0;
        fakeMatch.guestTeamGoals = 0;
        fakeMatch.isMatchFinished = false;

        await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        await request(app.getHttpServer())
          .patch(`/api/match/invalidID/homegoal`)
          .set('authorization', `Bearer ${authToken}`)
          .expect(400);
      });

      it(`/ (PATCH) match not found`, async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 0;
        fakeMatch.guestTeamGoals = 0;
        fakeMatch.isMatchFinished = false;

        await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        await request(app.getHttpServer())
          .patch(`/api/match/${uuidV4}/homegoal`)
          .set('authorization', `Bearer ${authToken}`)
          .expect(404);
      });

      it(`/ (PATCH) valid mach`, async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 0;
        fakeMatch.guestTeamGoals = 0;
        fakeMatch.isMatchFinished = false;

        await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        const response = await request(app.getHttpServer())
          .patch(`/api/match/${fakeMatch.id}/homegoal`)
          .set('authorization', `Bearer ${authToken}`)
          .expect(200);

        expect(response.body.homeTeamGoals).toBe(1);
        expect(response.body.guestTeamGoals).toBe(0);
      });

    });

    describe(`PATCH guestgoald`, () => {

      it(`/ (PATCH) invalid machID`, async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 0;
        fakeMatch.guestTeamGoals = 0;
        fakeMatch.isMatchFinished = false;

        await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        await request(app.getHttpServer())
          .patch(`/api/match/invalidID/guestgoal`)
          .set('authorization', `Bearer ${authToken}`)
          .expect(400);
      });

      it(`/ (PATCH) match not found`, async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 0;
        fakeMatch.guestTeamGoals = 0;
        fakeMatch.isMatchFinished = false;

        await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        await request(app.getHttpServer())
          .patch(`/api/match/${uuidV4}/guestgoal`)
          .set('authorization', `Bearer ${authToken}`)
          .expect(404);
      });

      it(`/ (PATCH) valid mach`, async () => {

        const fakeMatch = new MatchEntity();
        fakeMatch.homeTeam = TEAM.FC_BAYERN_2;
        fakeMatch.guestTeam = TEAM.SPVGG_UNTERHACHING;
        fakeMatch.homeTeamGoals = 0;
        fakeMatch.guestTeamGoals = 0;
        fakeMatch.isMatchFinished = false;

        await dbConnection.getRepository(MatchEntity).save(fakeMatch);

        const response = await request(app.getHttpServer())
          .patch(`/api/match/${fakeMatch.id}/guestgoal`)
          .set('authorization', `Bearer ${authToken}`)
          .expect(200);

        expect(response.body.homeTeamGoals).toBe(0);
        expect(response.body.guestTeamGoals).toBe(1);
      });

    });
  });
});
