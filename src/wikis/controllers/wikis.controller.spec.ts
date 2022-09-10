import { Test, TestingModule } from '@nestjs/testing';
import { WikisController } from './wikis.controller';
import { WikiService } from '../services/wiki.service';

describe('WikisController', () => {
  let controller: WikisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WikisController],
      providers: [WikiService],
    }).compile();

    controller = module.get<WikisController>(WikisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
