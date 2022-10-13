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

  async delete(id: string) {
    return await this.publicBriefingRepository.delete({ id });
  }

  async update(id: string, updatePublicBriefingDto: UpdatePublicBriefingDto) {
    const publicBriefing = await this.publicBriefingRepository.findOneOrFail({
      where: { id },
    });
    this.publicBriefingRepository.merge(publicBriefing, updatePublicBriefingDto);
    return await this.publicBriefingRepository.save(publicBriefing);
  }
}
