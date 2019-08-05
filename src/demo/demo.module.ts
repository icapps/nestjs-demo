import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [SharedModule, DatabaseModule],
    controllers: [DemoController],
    providers: [DemoService],
})
export class DemoModule {}
