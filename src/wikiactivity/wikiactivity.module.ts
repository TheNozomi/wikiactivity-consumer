import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoClientModule } from 'nestjs-io-client';
import { WikisModule } from '../wikis/wikis.module';
import { ActivityStorageService } from './services/activity-storage.service';
import { WikiActivityService } from './services/wikiactivity.service';
import { WikiSubscriber } from './subscribers/wiki.subscriber';
import { ConsumerHealthIndicator } from './consumer.health';
import { WebhooksModule } from '../webhooks/webhooks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentChangesItem } from './entities/recent-changes-item.entity';

@Module({
  imports: [
    IoClientModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('ws.endpoint'),
        options: {
          autoConnect: false,
        },
      }),
    }),
    TypeOrmModule.forFeature([RecentChangesItem]),
    WebhooksModule,
    WikisModule,
  ],
  providers: [
    ActivityStorageService,
    WikiActivityService,
    WikiSubscriber,
    ConsumerHealthIndicator,
  ],
  exports: [WikiActivityService, ConsumerHealthIndicator],
})
export class WikiActivityModule {}
