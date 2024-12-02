import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { DepositAndWithdrawalDto } from './dto/depositAndWithdrawal.dto';
import { DepositResponseType } from './types/deposit-response.type';
import { TransactionsDto } from './dto/transactions.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async transaction(@Body() data: TransactionsDto): Promise<DepositResponseType> {
    return this.transactionService.transaction(data);
  }

  @Post('deposit')
  async deposit(@Body() data: DepositAndWithdrawalDto): Promise<DepositResponseType> {
    return this.transactionService.deposit(data);
  }

  @Post('withdrawal')
  async withdrawal(
    @Body() data: DepositAndWithdrawalDto,
  ): Promise<DepositResponseType> {
    return this.transactionService.withdrawal(data);
  }
}
