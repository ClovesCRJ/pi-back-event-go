import { Module } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationController } from './annotation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annotation } from './entities/annotation.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Annotation]),
    EventModule,
  ],
  exports: [AnnotationService],
  providers: [AnnotationService],
  controllers: [AnnotationController]
})
export class AnnotationModule {}
