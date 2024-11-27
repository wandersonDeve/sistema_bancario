import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { AccountEntity } from '../../../database/entities/account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async createAccount(data: DeepPartial<AccountEntity>): Promise<AccountEntity> {
    const account = this.accountRepository.create(data);
    return this.accountRepository.save(account);
  }

  async findAccountByNumber(accountNumber: number): Promise<AccountEntity> {
    return this.accountRepository.findOneBy({ number: accountNumber });
  }
}
