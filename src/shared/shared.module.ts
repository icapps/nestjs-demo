import { Module, CacheModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { diskStorage } from 'multer';

import { LoggerService } from './logger.service';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        CacheModule.register(),
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads/',
                filename: (_req, file, callback) => {
                    callback(null, `${Date.now()}-${file.originalname}`);
                },
            }),
        }),
    ],
    providers: [LoggerService],
    exports: [LoggerService, CacheModule, MulterModule, PassportModule],
})
export class SharedModule {}
