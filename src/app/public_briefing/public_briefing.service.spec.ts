import { Test, TestingModule } from '@nestjs/testing';
import { PublicBriefingService } from './public_briefing.service';

describe('PublicBriefingService', () => {
  let service: PublicBriefingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicBriefingService],
    }).compile();

    service = module.get<PublicBriefingService>(PublicBriefingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
