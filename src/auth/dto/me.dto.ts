import { ApiModelProperty } from '@nestjs/swagger';

export class GetMeResponse {
    @ApiModelProperty()
    email: string;
}
