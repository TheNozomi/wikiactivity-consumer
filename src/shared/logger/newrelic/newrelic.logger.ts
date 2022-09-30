import { createLogger, format, Logger, transports } from 'winston';

import { ILogger } from '../interfaces/logger.interface';
import { formatter } from '../util/formatter';

export class NewrelicLogger implements ILogger {
  private readonly logger: Logger;
  private context?: string;

  constructor() {
    this.logger = createLogger({
      handleExceptions: true,
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
            format.ms(),
            formatter,
          ),
        }),
        new transports.File({
          filename: 'history.log',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    });
  }

  public setContext(context: string): void {
    this.context = context;
  }

  public log(message: any, context?: string): any {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this.logger.info(msg as string, { context, ...meta });
    }

    return this.logger.info(message, { context });
  }

  public error(message: any, stack?: string, context?: string): any {
    if (context === undefined) {
      context = stack;
      stack = undefined;
    }
    context = context || this.context;

    if (message instanceof Error) {
      const { message: msg, stack, ...meta } = message;

      return this.logger.error(msg, {
        context,
        stack: stack || message.stack,
        ...meta,
      });
    }

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, {
        context,
        stack,
        ...meta,
      });
    }

    return this.logger.error(message, { context, stack: stack || {} });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, { context, ...meta });
    }

    return this.logger.warn(message, { context });
  }

  public debug?(message: any, context?: string): any {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this.logger.debug(msg as string, { context, ...meta });
    }

    return this.logger.debug(message, { context });
  }

  public verbose?(message: any, context?: string): any {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(msg as string, { context, ...meta });
    }

    return this.logger.verbose(message, { context });
  }
}
