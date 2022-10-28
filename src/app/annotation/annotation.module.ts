import { Module } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationController } from './annotation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annotation } from './entities/annotation.entity';
import { EventModule } from '../event/event.module';
import { UserPermissionModule } from '../user_permission/user_permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Annotation]),
    EventModule,
    UserPermissionModule,
  ],
  exports: [AnnotationService],
  providers: [AnnotationService],
  controllers: [AnnotationController]
})
export class AnnotationModule {}
