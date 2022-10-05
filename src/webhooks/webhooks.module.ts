import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wiki } from '../wikis/entities/wiki.entity';
import { Webhook } from './entities/webhook.entity';
import { WebhookService } from './services/webhook.service';
import { DiscordWebhookService } from './discord-webhook/discord-webhook.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wiki, Webhook])],
  providers: [WebhookService, DiscordWebhookService],
  exports: [WebhookService],
})
export class WebhooksModule {}
