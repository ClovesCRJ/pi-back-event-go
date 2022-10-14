import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCheckItemDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  checked: boolean;

  @IsOptional()
  status: string;

  @IsOptional()
  obs: string;

  @IsOptional()
  next_step: string;

  @IsOptional()
  deadline: Date;
}
