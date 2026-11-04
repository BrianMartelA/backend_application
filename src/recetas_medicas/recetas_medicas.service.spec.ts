import { Test, TestingModule } from '@nestjs/testing';
import { RecetasMedicasService } from './recetas_medicas.service.js';

describe('RecetasMedicasService', () => {
  let service: RecetasMedicasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetasMedicasService],
    }).compile();

    service = module.get<RecetasMedicasService>(RecetasMedicasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
