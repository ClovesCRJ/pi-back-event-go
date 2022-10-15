import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateCheckItemDto } from "src/app/check_item/dto/create-check_item.dto";

export class CreateCheckListDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCheckItemDto)
  check_items: CreateCheckItemDto[];
}
