import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateCostItemDto } from "src/app/cost_item/dto/create-cost_item.dto";

export class CreateCostListDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCostItemDto)
  cost_items: CreateCostItemDto[];
}