import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePublicBriefingDto } from './dto/create-public_briefing.dto';
import { UpdatePublicBriefingDto } from './dto/update-public_briefing.dto';
import { PublicBriefing } from './entities/public_briefing.entity';

@Injectable()
export class PublicBriefingService {
  constructor(
    @InjectRepository(PublicBriefing)
    private readonly publicBriefingRepository: Repository<PublicBriefing>,
  ) {}
  
  
  async create(createPublicBriefingDto: CreatePublicBriefingDto) {
    const publicBriefing = await this.publicBriefingRepository.create(createPublicBriefingDto);
    return await this.publicBriefingRepository.save(publicBriefing);
  }

  // findAll() {
  //   return `This action returns all publicBriefing`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} publicBriefing`;
  // }

  // update(id: number, updatePublicBriefingDto: UpdatePublicBriefingDto) {
  //   return `This action updates a #${id} publicBriefing`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} publicBriefing`;
  // }
}
