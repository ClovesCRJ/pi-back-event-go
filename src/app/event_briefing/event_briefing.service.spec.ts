import { Test, TestingModule } from '@nestjs/testing';
import { EventBriefingService } from './event_briefing.service';

describe('EventBriefingService', () => {
  let service: EventBriefingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventBriefingService],
    }).compile();

    service = module.get<EventBriefingService>(EventBriefingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
