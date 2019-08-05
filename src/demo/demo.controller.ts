import {
    Get,
    HttpStatus,
    Post,
    HttpCode,
    Controller,
    Body,
    UploadedFiles,
    UseInterceptors,
    BadRequestException,
    CacheInterceptor,
} from '@nestjs/common';
import {
    ApiResponse,
    ApiUseTags,
    ApiImplicitFile,
    ApiConsumes,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { DemoService } from './demo.service';
import { Result } from '../shared/interfaces/result.interface';
import { GetDemoResponse, PostDemoRequest, PostDemoResponse } from './dto';
import { Demo } from '../database/entities/demo.entity';

@Controller('demo')
@ApiUseTags('Demo')
@UseInterceptors(CacheInterceptor)
export class DemoController {
    public constructor(private readonly demoService: DemoService) {}

    @Get()
    @ApiResponse({
        description: 'Result of get demo endpoint',
        status: HttpStatus.OK,
        type: GetDemoResponse,
        isArray: true,
    })
    public getDemo(): Promise<GetDemoResponse[]> {
        return this.demoService.getDemos();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        description: 'Result of post demo endpoint',
        status: HttpStatus.CREATED,
        type: PostDemoResponse,
    })
    public postDemo(@Body() body: PostDemoRequest): Promise<Result> {
        return this.demoService.saveDemo(body.message);
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    @ApiImplicitFile({
        name: 'files',
        description: 'List of files',
        required: true,
    })
    @ApiConsumes('multipart/form-data')
    public uploadDemo(
        @UploadedFiles() files: Express.Multer.File[],
    ): Express.Multer.File[] {
        if (!files || files.length === 0) {
            throw new BadRequestException('Please add some files');
        }

        return files;
    }
}
