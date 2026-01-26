import { IsInt, IsString } from 'class-validator';

export class CreateSalesDto {
  @IsString()
  productID: string;
  @IsInt()
  quantity: number;
}
