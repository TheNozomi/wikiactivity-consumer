import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WikisController } from './controllers/wikis.controller';
import { Wiki } from './entities/wiki.entity';
import { Webhook } from './entities/webhook.entity';
import { WikisService } from './services/wikis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wiki, Webhook])],
  controllers: [WikisController],
  providers: [WikisService],
})
export class WikisModule {}
