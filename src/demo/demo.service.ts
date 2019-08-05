import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggerService } from '../shared/logger.service';
import { Demo } from '../database/entities/demo.entity';
import { Result } from '../shared/interfaces/result.interface';

@Injectable()
export class DemoService {
    public constructor(
        private readonly loggerService: LoggerService,
        @InjectRepository(Demo)
        private readonly demoRepository: Repository<Demo>,
    ) {}

    public getDemos(): Promise<Demo[]> {
        this.loggerService.log('GETTING DEMOS...');
        return this.demoRepository.find();
    }

    public async saveDemo(message: string): Promise<Result> {
        if (!message || message.trim().length === 0) {
            throw new BadRequestException('Message cant be empty!');
        }

        this.loggerService.log('PERFORMING BIG BUSINESS LOGIC');

        const demo = this.demoRepository.create({
            message,
        });
        await this.demoRepository.save(demo);

        return { success: true };
    }
}
