import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { LoggerService } from '../shared/logger.service';
import { ConfigService } from '../shared/config.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(private loggerService: LoggerService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ConfigService.jwt.secret,
        });
    }

    async validate(payload: { sub: string }): Promise<any> {
        this.loggerService.log(`Validated user JWT token for ${payload.sub}`);
        return { email: payload.sub };
    }
}
