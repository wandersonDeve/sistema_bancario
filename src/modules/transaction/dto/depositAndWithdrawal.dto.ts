import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class DepositAndWithdrawalDto {
  @ApiProperty({ required: true, example: 123 })
  @IsNumber()
  @IsNotEmpty()
  accountNumber: number;

  @ApiProperty({ required: true, example: 50 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;
}
