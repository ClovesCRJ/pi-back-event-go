import { IsNotEmpty } from 'class-validator';

export class UpdateCheckListDto {
  @IsNotEmpty()
  name: string;
}
