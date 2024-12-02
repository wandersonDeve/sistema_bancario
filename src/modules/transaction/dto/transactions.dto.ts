import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class TransactionsDto {
  @ApiProperty({ required: true, example: 123 })
  @IsNumber()
  @IsNotEmpty()
  fromAccount: number;

  @ApiProperty({ required: true, example: 123 })
  @IsNumber()
  @IsNotEmpty()
  toAccount: number;

  @ApiProperty({ required: true, example: 50 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;
}
