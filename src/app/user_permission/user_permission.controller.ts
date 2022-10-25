import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserPermissionService } from './user_permission.service';

@Controller('user-permission')
@ApiTags('User Permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}
}
