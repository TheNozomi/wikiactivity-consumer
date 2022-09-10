import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';

import { WikiActivityService } from './services/wikiactivity.service';

@Injectable()
export class ConsumerHealthIndicator extends HealthIndicator {
  constructor(private readonly wikiActivityService: WikiActivityService) {
    super();
  }

  async checkHealth(key: string): Promise<HealthIndicatorResult> {
    const { consumerReady, connectionId } =
      this.wikiActivityService.getHealth();
    const result = this.getStatus(key, consumerReady, { connectionId });

    if (consumerReady) {
      return result;
    }

    throw new HealthCheckError('Consumer health check failed', result);
  }
}
