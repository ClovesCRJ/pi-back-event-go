import { Test, TestingModule } from '@nestjs/testing';
import { PublicBriefingController } from './public_briefing.controller';
import { PublicBriefingService } from './public_briefing.service';

describe('PublicBriefingController', () => {
  let controller: PublicBriefingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicBriefingController],
      providers: [PublicBriefingService],
    }).compile();

    controller = module.get<PublicBriefingController>(PublicBriefingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
