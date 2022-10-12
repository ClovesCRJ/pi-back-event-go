import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBriefingDto } from './dto/create-briefing.dto';
import { Briefing } from './entities/briefing.entity';

@Injectable()
export class BriefingService {
  constructor(
    @InjectRepository(Briefing)
    private readonly briefingRepository: Repository<Briefing>,
  ) {}
  
  async create(createBriefingDto: CreateBriefingDto) {
    const briefing = await this.briefingRepository.create(createBriefingDto);
    return await this.briefingRepository.save(briefing);
  }

  async delete(id: string) {
    return await this.briefingRepository.delete({ id });
  }
}
