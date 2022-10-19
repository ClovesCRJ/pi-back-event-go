import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesUtils } from 'src/utils/messages.utils';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';
import { Annotation } from './entities/annotation.entity';

@Injectable()
export class AnnotationService {
  constructor(
    @InjectRepository(Annotation)
    private readonly annotationRepository: Repository<Annotation>,
  ) {}
  
  async create(event_id: string, createAnnotationDto: CreateAnnotationDto) {
    const annotation = await this.annotationRepository.create({
      ...createAnnotationDto,
      event_id,
    });
    return await this.annotationRepository.save(annotation);
  }

  async findAll(event_id: string) {
    return await this.annotationRepository.find({
      where: { event_id }
    });
  }

  async findOne(options: FindOneOptions<Annotation>) {
    try {
      return await this.annotationRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(MessagesUtils.ANNOTATION_NOT_FOUND);
    }
  }

  async update(event_id: string, id: string, updateAnnotationDto: UpdateAnnotationDto) {
    const annotation = await this.findOne({
      where: { id, event_id },
    });
    this.annotationRepository.merge(annotation, updateAnnotationDto);
    return await this.annotationRepository.save(annotation);
  }

  async remove(event_id: string, id: string) {
    const annotation = await this.findOne({
      where: { id, event_id },
    });
    return await this.annotationRepository.delete({ id: annotation.id });
  }
}
