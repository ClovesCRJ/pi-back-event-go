import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckItemDto } from './create-check_item.dto';

export class UpdateCheckItemDto extends PartialType(CreateCheckItemDto) {}
