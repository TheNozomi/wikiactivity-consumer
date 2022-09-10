import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoClientModule } from 'nestjs-io-client';
import { WikisModule } from '../wikis/wikis.module';
import { WikiActivityService } from './services/wikiactivity.service';
import { WikiSubscriber } from './subscribers/wiki.subscriber';
import { ConsumerHealthIndicator } from './consumer.health';

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
    WikisModule,
  ],
  providers: [WikiActivityService, WikiSubscriber, ConsumerHealthIndicator],
  exports: [WikiActivityService, ConsumerHealthIndicator],
})
export class WikiActivityModule {}
