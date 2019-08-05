import { ApiModelProperty } from '@nestjs/swagger';

export class GetDemoResponse {
    @ApiModelProperty({ description: 'UUID' })
    id: string;

    @ApiModelProperty()
    message: string;

    @ApiModelProperty({ description: 'ISO string', type: 'string' })
    createdAt: Date;

    @ApiModelProperty({ description: 'ISO string', type: 'string' })
    updatedAt: Date;
}
