import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Demo } from './entities/demo.entity';

@Module({
    imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Demo])],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
