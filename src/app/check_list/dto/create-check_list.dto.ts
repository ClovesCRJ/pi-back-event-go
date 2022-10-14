import { IsNotEmpty, IsOptional } from "class-validator";
import { CreateCheckItemDto } from "src/app/check_item/dto/create-check_item.dto";

export class CreateCheckListDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  check_items: CreateCheckItemDto[];
}
