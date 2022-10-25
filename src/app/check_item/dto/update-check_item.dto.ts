import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCheckItemDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiPropertyOptional()
  checked: boolean;

  @IsOptional()
  @ApiPropertyOptional()
  status: string;

  @IsOptional()
  @ApiPropertyOptional()
  obs: string;

  @IsOptional()
  @ApiPropertyOptional()
  next_step: string;

  @IsOptional()
  @ApiPropertyOptional()
  deadline: Date;
}
