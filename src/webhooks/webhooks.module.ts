import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wiki } from '../wikis/entities/wiki.entity';
import { Webhook } from './entities/webhook.entity';
import { WebhookService } from './services/webhook.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wiki, Webhook])],
  providers: [WebhookService],
  exports: [WebhookService],
})
export class WebhooksModule {}
