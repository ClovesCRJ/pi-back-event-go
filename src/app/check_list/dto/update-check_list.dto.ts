import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCheckListDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
