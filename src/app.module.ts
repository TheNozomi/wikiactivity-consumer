import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './shared/global.module';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRootAsync({
      imports: [GlobalModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
