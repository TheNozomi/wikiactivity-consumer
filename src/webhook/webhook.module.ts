import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wiki } from '../wikis/entities/wiki.entity';
import { Webhook } from './entities/webhook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wiki, Webhook])],
})
export class WebhookModule {}
