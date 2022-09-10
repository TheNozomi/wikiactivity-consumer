import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GlobalModule {}
