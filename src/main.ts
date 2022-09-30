import { config } from 'dotenv';
config();

require('newrelic');
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { NewrelicInterceptor } from './shared/interceptors/newrelic.interceptor';
import { ILogger, Logger } from './shared/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const logger: ILogger = new Logger(configService).getLogger();
  app.useLogger(logger);

  const options = new DocumentBuilder()
    .setTitle(configService.get('app.name', 'Service'))
    .setDescription(configService.get('app.description', 'Description'))
    .setVersion(configService.get('app.version', '0.0.1'))
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  app.use(helmet());

  app.useGlobalInterceptors(new NewrelicInterceptor());

  app.enableShutdownHooks();

  const port = configService.get('app.port', 3000);
  await app.listen(port);
}
bootstrap();
