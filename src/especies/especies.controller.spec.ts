import { Test, TestingModule } from '@nestjs/testing';
import { EspeciesController } from './especies.controller.js';
import { EspeciesService } from './especies.service.js';

describe('EspeciesController', () => {
  let controller: EspeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspeciesController],
      providers: [EspeciesService],
    }).compile();

    controller = module.get<EspeciesController>(EspeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
