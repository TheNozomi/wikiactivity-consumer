import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { WikiActivityModule } from '../wikiactivity/wikiactivity.module';
import { ConsumerHealthIndicator } from '../wikiactivity/consumer.health';

@Module({
  imports: [TerminusModule, HttpModule, WikiActivityModule],
  controllers: [HealthController],
  providers: [ConsumerHealthIndicator],
})
export class HealthModule {}
