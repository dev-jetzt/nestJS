import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Person } from '../src/dto/person.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/Sebastian')
      .expect(200)
      .expect('Hello  Sebastian');
  });

  it('/ (POST)', () => {
    const person = new Person();
    person.firstName = 'TestFirstName';
    person.lastName = 'TestLastName';
    person.age = 55;

    return request(app.getHttpServer())
      .post('/api')
      .expect(201)
      .send(person)
      .expect('I got the person TestFirstName TestLastName which is 55 years old.');
  });
});
