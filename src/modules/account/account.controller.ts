import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/account.dto';
import { AccountEntity } from '../../database/entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async createAccount(@Body() data: CreateAccountDto): Promise<AccountEntity> {
    return this.accountService.createAccount(data);
  }

  @Get(':AccountNumber')
  async getAccountByNumber(
    @Param('AccountNumber') AccountNumber: string,
  ): Promise<AccountEntity> {
    return this.accountService.getAccountByNumber(+AccountNumber)
  }
}
