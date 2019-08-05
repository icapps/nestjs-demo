import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import { AuthModule } from '../src/auth/auth.module';

describe('Auth', () => {
    let app: INestApplication;
    let superTest: request.SuperTest<request.Test>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AuthModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        superTest = request(app.getHttpServer());
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/POST /auth/login', () => {
        it('should return an accesstoken on successful login', async () => {
            const response = await superTest.post('/auth/login').send({
                email: 'valid@mail.com',
                password: 'validpassword',
            });

            expect(response.status).toBe(HttpStatus.OK);
            expect(typeof response.body.accessToken).toBe('string');
        });

        it('should throw an unauthorized error when failed to login', async () => {
            const response = await superTest.post('/auth/login').send({
                email: 'invalid@mail.com',
                password: 'invalidpassword',
            });

            expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        });
    });
});
