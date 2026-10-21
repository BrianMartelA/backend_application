import { Test, TestingModule } from '@nestjs/testing';
import { RecetasMedicasController } from './recetas_medicas.controller.js';
import { RecetasMedicasService } from './recetas_medicas.service.js';

describe('RecetasMedicasController', () => {
  let controller: RecetasMedicasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetasMedicasController],
      providers: [RecetasMedicasService],
    }).compile();

    controller = module.get<RecetasMedicasController>(RecetasMedicasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
