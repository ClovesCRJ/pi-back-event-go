import { forwardRef, Module } from '@nestjs/common';
import { UserPermissionService } from './user_permission.service';
import { UserPermissionController } from './user_permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entities/user_permission.entity';
import { EventModule } from '../event/event.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPermission]),
    forwardRef(() => EventModule),
    UserModule,
  ],
  controllers: [UserPermissionController],
  providers: [UserPermissionService],
  exports: [UserPermissionService],
})
export class UserPermissionModule {}
