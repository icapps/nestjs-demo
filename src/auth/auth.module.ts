import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from '../shared/config.service';
import { AuthStrategy } from './auth.strategy';

@Module({
    imports: [SharedModule, JwtModule.register(ConfigService.jwt)],
    providers: [AuthService, AuthStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
