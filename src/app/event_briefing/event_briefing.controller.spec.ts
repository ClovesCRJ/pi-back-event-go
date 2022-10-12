import { Test, TestingModule } from '@nestjs/testing';
import { EventBriefingController } from './event_briefing.controller';
import { EventBriefingService } from './event_briefing.service';

describe('EventBriefingController', () => {
  let controller: EventBriefingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventBriefingController],
      providers: [EventBriefingService],
    }).compile();

    controller = module.get<EventBriefingController>(EventBriefingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
