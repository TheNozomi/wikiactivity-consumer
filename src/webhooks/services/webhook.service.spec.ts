import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookService } from './webhook.service';
import { Webhook, WebhookPlatform } from '../entities/webhook.entity';
import { Wiki } from '../../wikis/entities/wiki.entity';
import { createActivityItem } from '@bitomic/wikiactivity-api';

describe('WebhookService', () => {
  let service: WebhookService;

  beforeEach(async () => {
    const mockWikiRepository = createMock<Repository<Wiki>>();
    const mockWebhookRepository = createMock<Repository<Webhook>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        {
          provide: getRepositoryToken(Wiki),
          useValue: mockWikiRepository,
        },
        {
          provide: getRepositoryToken(Webhook),
          useValue: mockWebhookRepository,
        },
      ],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('executeWebhooks', () => {
    const mockDiscordWebhook = createMock<Webhook>({
      id: 1,
      wikiId: 1,
      name: 'Test Discord Webhook',
      enabled: true,
      platform: WebhookPlatform.DISCORD,
      url: 'https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz',
      config: {},
    });

    const mockWiki = createMock<Wiki>({
      id: 1,
      interwiki: 'es.drama',
      displayName: 'Wiki Drama',
      enabled: true,
      webhooks: [mockDiscordWebhook],
    });

    it('should execute webhooks given a wiki and recent changes item', async () => {
      jest
        .spyOn(service, 'findAllByWikiId')
        .mockResolvedValue([mockDiscordWebhook]);

      const mockRCItem = createActivityItem({
        wiki: 'es.genshin-impact',
        anon: false,
        comment: '',
        minor: true,
        new: false,
        newlen: 7045,
        ns: 0,
        old_revid: 91258,
        oldlen: 7041,
        rcid: 92194,
        redirect: false,
        revid: 91259,
        timestamp: '2022-10-04T21:54:38Z',
        title: 'Hipostasis Anemo',
        type: 'edit',
        user: 'Remiskar',
      });

      await service.executeWebhooks(mockWiki, mockRCItem);
    });
  });
});
