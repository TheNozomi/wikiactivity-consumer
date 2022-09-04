import { Test, TestingModule } from '@nestjs/testing';
import { WikisController } from './wikis.controller';
import { WikisService } from '../services/wikis.service';

describe('WikisController', () => {
  let controller: WikisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WikisController],
      providers: [WikisService],
    }).compile();

    controller = module.get<WikisController>(WikisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
