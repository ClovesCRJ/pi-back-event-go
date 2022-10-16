import { IsNotEmpty } from "class-validator";

export class UpdateBookingListDto {
  @IsNotEmpty()
  name: string;
}