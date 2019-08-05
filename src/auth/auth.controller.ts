import {
    Controller,
    Body,
    HttpStatus,
    UseGuards,
    Post,
    Get,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, GetMeResponse } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../shared/decorators/get-user.decorator';

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiResponse({
        description: 'Successfully logged in',
        type: LoginResponse,
        status: HttpStatus.OK,
    })
    public login(@Body() body: LoginRequest): LoginResponse {
        const accessToken = this.authService.login(body.email, body.password);
        return { accessToken };
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiResponse({
        description: 'Content of the JWT',
        status: HttpStatus.OK,
        type: GetMeResponse,
    })
    public getMe(@GetUser() user: { email: string }): GetMeResponse {
        return user;
    }
}
