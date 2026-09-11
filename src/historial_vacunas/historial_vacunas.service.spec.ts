import { Test, TestingModule } from '@nestjs/testing';
import { HistorialVacunasService } from './historial_vacunas.service.js';

describe('HistorialVacunasService', () => {
  let service: HistorialVacunasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialVacunasService],
    }).compile();

    service = module.get<HistorialVacunasService>(HistorialVacunasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
