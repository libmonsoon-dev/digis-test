import { INestApplication } from '@nestjs/common';
import { clear, setup, teardown } from '../init';
import * as request from 'supertest';
import { CreateUserDto, UpdateUserDto } from '../../../src/dto/user.dto';
import { Gender } from '../../../src/models/gender';
import { AbstractUserRepository } from '../../../src/interfaces/repository/user.repository';
import { RedisUserRepository } from '../../../src/interfaces/repository/cache/user.repository';
import { PostgresUserRepository } from '../../../src/interfaces/repository/postgres/user.repository';
import { PERSISTENT_USER_STORAGE } from '../../../src/providers/constants';

describe('UserController', () => {
  jest.setTimeout(30000);
  let app: INestApplication;
  let cache: RedisUserRepository;
  let repo: PostgresUserRepository;

  beforeAll(async () => {
    app = await setup();
    cache = app.get<AbstractUserRepository, RedisUserRepository>(
      AbstractUserRepository,
    );
    repo = app.get<AbstractUserRepository, PostgresUserRepository>(
      PERSISTENT_USER_STORAGE,
    );
  });

  afterAll(async () => {
    await teardown();
  });

  afterEach(async () => {
    await clear();
  });

  it('Should return 404', async () => {
    const { body, status } = await request(app.getHttpServer())
      .get('/api/user/100500')
      .send();

    expect(body).toStrictEqual({
      error: 'Not Found',
      statusCode: 404,
    });
    expect(status).toBe(404);
  });

  it('Should create user', async () => {
    const dto: Partial<CreateUserDto> = {
      dob: '1996-01-15',
      fullName: 'Daniil Stepanenko',
      gender: Gender.Male,
    };
    const {
      body: { id, ...responseUser },
      status,
    } = await request(app.getHttpServer()).post('/api/user/').send(dto);

    expect(responseUser).toStrictEqual(dto);
    expect(status).toBe(201);

    const cacheResult = await cache.getFromCache(id);
    if (!cacheResult) {
      throw new Error('Data not found');
    }
    const { id: cacheId, ...fromCache } = cacheResult;
    expect(cacheId).toBe(id);
    expect(fromCache).toStrictEqual(dto);

    const databaseResult = await repo.findById(id);
    if (!databaseResult) {
      throw new Error('Data not found');
    }
    const { id: databaseId, ...fromDatabase } = databaseResult;
    expect(databaseId).toBe(id);

    expect(fromDatabase).toStrictEqual(dto);

    const {
      body: { id: getResponseId, ...getResponse },
      status: getStatus,
    } = await request(app.getHttpServer()).get(`/api/user/${id}`).send();

    expect(getResponse).toStrictEqual(dto);
    expect(getStatus).toBe(200);
    expect(getResponseId).toBe(id);
  });

  it('Should update user', async () => {
    const createDto: Partial<CreateUserDto> = {
      dob: '1993-10-04',
      fullName: 'Danil Stepanenko',
      gender: Gender.Female,
    };

    const {
      body: { id, ...postResponseUser },
      status: postStatus,
    } = await request(app.getHttpServer()).post('/api/user/').send(createDto);

    expect(postResponseUser).toStrictEqual(createDto);
    expect(postStatus).toBe(201);

    const updateDto: Partial<UpdateUserDto> = {
      dob: '1996-01-15',
      fullName: 'Daniil Stepanenko',
      gender: Gender.Male,
    };

    const {
      body: { id: idFromUpdate, ...responseUser },
      status,
    } = await request(app.getHttpServer())
      .put(`/api/user/${id}`)
      .send(updateDto);

    expect(responseUser).toStrictEqual(updateDto);
    expect(status).toBe(200);

    const cacheResult = await cache.getFromCache(id);
    if (!cacheResult) {
      throw new Error('Data not found');
    }
    const { id: cacheId, ...fromCache } = cacheResult;
    expect(cacheId).toBe(id);
    expect(fromCache).toStrictEqual(updateDto);

    const databaseResult = await repo.findById(id);
    if (!databaseResult) {
      throw new Error('Data not found');
    }
    const { id: databaseId, ...fromDatabase } = databaseResult;
    expect(databaseId).toBe(id);

    expect(fromDatabase).toStrictEqual(updateDto);

    const {
      body: { id: getResponseId, ...getResponse },
      status: getStatus,
    } = await request(app.getHttpServer()).get(`/api/user/${id}`).send();

    expect(getResponse).toStrictEqual(updateDto);
    expect(getStatus).toBe(200);
    expect(getResponseId).toBe(id);
  });
});
