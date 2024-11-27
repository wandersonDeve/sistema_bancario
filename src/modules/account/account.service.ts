import { Injectable } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountDto } from './dto/account.dto';
import { AccountEntity } from '../../database/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async createAccount(data: CreateAccountDto): Promise<AccountEntity> {
    return this.accountRepository.createAccount(data);
  }
}
