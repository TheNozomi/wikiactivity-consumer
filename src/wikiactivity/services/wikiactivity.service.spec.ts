import { Test, TestingModule } from '@nestjs/testing';
import { WikiActivityService } from './wikiactivity.service';

describe('WikiactivityService', () => {
  let service: WikiActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WikiActivityService],
    }).compile();

    service = module.get<WikiActivityService>(WikiActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
