import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ required: false, example: 0 })
  @IsNumber()
  @IsOptional()
  initialBalance?: number = 0;
}
