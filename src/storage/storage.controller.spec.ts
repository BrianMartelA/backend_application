import { Test, TestingModule } from '@nestjs/testing';
import { StorageController } from './storage.controller.js';
import { StorageService } from './storage.service.js';

describe('StorageController', () => {
  let controller: StorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageController],
      providers: [StorageService],
    }).compile();

    controller = module.get<StorageController>(StorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
