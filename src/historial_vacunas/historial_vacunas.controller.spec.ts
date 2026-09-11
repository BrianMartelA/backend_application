import { Test, TestingModule } from '@nestjs/testing';
import { HistorialVacunasController } from './historial_vacunas.controller.js';
import { HistorialVacunasService } from './historial_vacunas.service.js';

describe('HistorialVacunasController', () => {
  let controller: HistorialVacunasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialVacunasController],
      providers: [HistorialVacunasService],
    }).compile();

    controller = module.get<HistorialVacunasController>(HistorialVacunasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
