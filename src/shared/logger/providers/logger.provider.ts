import { ConsoleLogger, Provider, Scope } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { ConfigService } from '@nestjs/config';
import { ILogger } from '../interfaces/logger.interface';
import { NewrelicLogger } from '../newrelic/newrelic.logger';

export class Logger {
  private readonly logger: ILogger;

  constructor(private readonly configService: ConfigService) {
    const LoggerClass = this.getLoggerClass();
    this.logger = new LoggerClass();
  }

  public getLogger(): ILogger {
    return this.logger;
  }

  private getLoggerClass(): Type<ILogger> {
    const newrelic = this.configService.get<boolean>('logger.newrelic');
    return newrelic ? NewrelicLogger : ConsoleLogger;
  }
}

export const LoggerProvider: Provider<ILogger> = {
  provide: 'ILogger',
  useFactory: (configService: ConfigService) =>
    new Logger(configService).getLogger(),
  inject: [ConfigService],
  scope: Scope.TRANSIENT,
};
