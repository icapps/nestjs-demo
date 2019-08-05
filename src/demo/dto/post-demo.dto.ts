import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PostDemoRequest {
    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    message: string;
}

export class PostDemoResponse {
    @ApiModelProperty()
    succuss: boolean;
}
