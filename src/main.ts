import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger
    const options = new DocumentBuilder()
        .setTitle('NestJS Demo API')
        .setDescription('Swagger demonstrating auto generated documentation')
        .addTag('Demo', 'All demo related endpoints')
        .addTag('Auth', 'All authentication related endpoints')
        .addBearerAuth('Authorization', 'header')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/documentation', app, document);

    // Validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    // Security
    app.enableCors();
    app.use(helmet());

    // Startup
    await app.listen(3000);
}

bootstrap();
