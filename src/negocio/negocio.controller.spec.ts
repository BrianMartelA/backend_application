import { Test, TestingModule } from '@nestjs/testing';
import { NegocioController } from './negocio.controller.js';
import { NegocioService } from './negocio.service.js';

describe('NegocioController', () => {
  let controller: NegocioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NegocioController],
      providers: [NegocioService],
    }).compile();

    controller = module.get<NegocioController>(NegocioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
