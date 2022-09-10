import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WikisController } from './controllers/wikis.controller';
import { Wiki } from './entities/wiki.entity';
import { Webhook } from '../webhooks/entities/webhook.entity';
import { WikiService } from './services/wiki.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wiki, Webhook])],
  controllers: [WikisController],
  providers: [WikiService],
  exports: [WikiService],
})
export class WikisModule {}
