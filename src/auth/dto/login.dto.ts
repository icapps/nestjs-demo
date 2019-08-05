import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginRequest {
    @ApiModelProperty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsString()
    @MinLength(8)
    password: string;
}

export class LoginResponse {
    @ApiModelProperty()
    accessToken: string;
}
