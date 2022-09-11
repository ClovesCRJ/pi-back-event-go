import { Injectable } from '@nestjs/common';
import { CreatePublicBriefingDto } from './dto/create-public_briefing.dto';
import { UpdatePublicBriefingDto } from './dto/update-public_briefing.dto';

@Injectable()
export class PublicBriefingService {
  create(createPublicBriefingDto: CreatePublicBriefingDto) {
    return 'This action adds a new publicBriefing';
  }

  findAll() {
    return `This action returns all publicBriefing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicBriefing`;
  }

  update(id: number, updatePublicBriefingDto: UpdatePublicBriefingDto) {
    return `This action updates a #${id} publicBriefing`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicBriefing`;
  }
}
