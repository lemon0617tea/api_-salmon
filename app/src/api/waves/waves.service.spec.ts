import { Test, TestingModule } from '@nestjs/testing';
import { WavesService } from './waves.service';

describe('WavesService', () => {
  let service: WavesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WavesService],
    }).compile();

    service = module.get<WavesService>(WavesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
