import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createConnection, getRepository, Repository } from 'typeorm';
import { WebhookService } from './webhook.service';
import { Wiki } from '../../wikis/entities/wiki.entity';

describe('WebhookService', () => {
  let service: WebhookService;

  beforeEach(async () => {
    const testConnectionName = 'testConnection';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: getRepositoryToken(Wiki),
          useClass: Repository,
        },
      ],
    }).compile();

    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Wiki],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    service = module.get<WebhookService>(WebhookService);

    return connection;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
