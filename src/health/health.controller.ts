import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ConsumerHealthIndicator } from '../wikiactivity/consumer.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private consumerHealth: ConsumerHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.db.pingCheck('database'),
      async () =>
        this.http.pingCheck(
          'fandom',
          'https://community.fandom.com/api.php?action=query&format=json&prop=&meta=siteinfo',
        ),
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () => this.consumerHealth.checkHealth('wikiactivity-consumer'),
    ]);
  }
}
