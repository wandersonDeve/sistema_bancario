import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountDto } from './dto/account.dto';
import { AccountEntity } from '../../database/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async createAccount(data: CreateAccountDto): Promise<AccountEntity> {
    const createAccount = {
      balance: data?.initialBalance,
    };
    return this.accountRepository.createAccount(createAccount);
  }

  async getAccountByNumber(accountNumber: number): Promise<AccountEntity> {
    const account =
      await this.accountRepository.findAccountByNumber(accountNumber);
    if (!account) throw new NotFoundException('Conta não encontrada');
    return account;
  }
}
