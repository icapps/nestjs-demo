import { TestingModule, Test } from '@nestjs/testing';
import {
    mock,
    anyString,
    instance,
    verify,
    reset,
    deepEqual,
    anything,
} from 'ts-mockito';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { DemoService } from './demo.service';
import { LoggerService } from '../shared/logger.service';
import { SharedModule } from '../shared/shared.module';
import { Demo } from '../database/entities/demo.entity';
import { DatabaseModule } from '../database/database.module';
import { BadRequestException } from '@nestjs/common';

describe('DemoService', () => {
    let service: DemoService;

    const loggerService = mock(LoggerService);
    const demoRepository: Repository<Demo> = mock(Repository) as any;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [SharedModule, DatabaseModule],
            providers: [DemoService],
        })
            .overrideProvider(getRepositoryToken(Demo))
            .useValue(instance(demoRepository))
            .overrideProvider(LoggerService)
            .useValue(instance(loggerService))
            .compile();

        service = module.get(DemoService);
    });

    afterEach(() => {
        reset(loggerService);
        reset(demoRepository);
    });

    describe('saveDemo', () => {
        it('should save the message', async () => {
            const message = 'Message body!';
            const result = await service.saveDemo(message);

            verify(loggerService.log(anyString())).once();
            verify(demoRepository.create(deepEqual({ message }))).once();
            verify(demoRepository.save(anything())).once();

            expect(result.success).toBe(true);
        });

        it('should throw when the message is empty', async () => {
            verify(loggerService.log(anyString())).never();

            await expect(service.saveDemo('')).rejects.toThrowError(
                BadRequestException,
            );
        });
    });
});
