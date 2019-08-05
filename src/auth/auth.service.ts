import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    public constructor(private readonly jwtService: JwtService) {}

    public login(email: string, password: string): string {
        const isValidUser =
            email.startsWith('valid') && password.startsWith('valid');

        if (!isValidUser) {
            throw new UnauthorizedException('Login failed');
        }

        const payload = { sub: email };
        return this.jwtService.sign(payload);
    }
}
