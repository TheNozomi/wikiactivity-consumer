import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './shared/global.module';
import { HealthModule } from './health/health.module';
import { WikisModule } from './wikis/wikis.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { WikiActivityModule } from './wikiactivity/wikiactivity.module';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
    }),
    HealthModule,
    WikisModule,
    WebhooksModule,
    WikiActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
