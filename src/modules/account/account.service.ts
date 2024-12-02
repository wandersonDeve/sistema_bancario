import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountDto } from './dto/account.dto';
import { AccountEntity } from '../../database/entities/account.entity';
import { transactionType } from './constants/transatiuon.enum';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async createAccount(data: CreateAccountDto): Promise<AccountEntity> {
    const createAccount = {
      balance: data?.initialBalance,
    };
    return this.accountRepository.createAccount(createAccount);
  }

  async findOne(accountNumber: number): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne(accountNumber);
    if (!account)
      throw new NotFoundException(
        `A conta de número ${accountNumber} não foi encontrada`,
      );
    return account;
  }

  async getAccountByNumber(accountNumber: number) {
    const account =
      await this.accountRepository.findAccountByNumber(accountNumber);
    if (!account)
      throw new NotFoundException(
        `A conta de número ${accountNumber} não foi encontrada`,
      );
    const formattedAccount = {
      numero: account?.number,
      saldo: Number(account?.balance),
    };

    const outgoingTransactions = account?.outgoingTransactions?.map(
      (transaction) => ({
        tipo: transactionType[transaction.type],
        origem: account?.number,
        destino: transaction?.targetAccount?.number,
        valor: Number(transaction?.amount),
      }),
    );

    const incomingTransactions = account?.incomingTransactions?.map(
      (transaction) => ({
        tipo: transactionType[transaction.type],
        origem: transaction?.sourceAccount?.number,
        destino: account?.number,
        valor: Number(transaction?.amount),
      }),
    );

    const formattedTransactions = [
      ...outgoingTransactions,
      ...incomingTransactions,
    ];

    return {
      contas: [formattedAccount],
      transacoes: formattedTransactions,
    };
  }
}
