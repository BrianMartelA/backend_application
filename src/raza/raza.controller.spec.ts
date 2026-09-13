import { Test, TestingModule } from '@nestjs/testing';
import { RazaController } from './raza.controller.js';
import { RazaService } from './raza.service.js';

describe('RazaController', () => {
  let controller: RazaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RazaController],
      providers: [RazaService],
    }).compile();

    controller = module.get<RazaController>(RazaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
