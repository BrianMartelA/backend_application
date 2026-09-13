import { Test, TestingModule } from '@nestjs/testing';
import { ContactoEmergenciaController } from './contacto-emergencia.controller.js';
import { ContactoEmergenciaService } from './contacto-emergencia.service.js';

describe('ContactoEmergenciaController', () => {
  let controller: ContactoEmergenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactoEmergenciaController],
      providers: [ContactoEmergenciaService],
    }).compile();

    controller = module.get<ContactoEmergenciaController>(ContactoEmergenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
