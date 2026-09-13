import { Test, TestingModule } from '@nestjs/testing';
import { EspecieController } from './especie.controller.js';
import { EspecieService } from './especie.service.js';

describe('EspecieController', () => {
  let controller: EspecieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecieController],
      providers: [EspecieService],
    }).compile();

    controller = module.get<EspecieController>(EspecieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
