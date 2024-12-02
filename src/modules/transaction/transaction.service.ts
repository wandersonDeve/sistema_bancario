import { BadRequestException, Injectable } from '@nestjs/common';
import { DepositAndWithdrawalDto } from './dto/depositAndWithdrawal.dto';
import { DepositResponseType } from './types/deposit-response.type';
import { AccountService } from '../account/account.service';
import { AccountRepository } from '../account/repository/account.repository';
import { TransactionsDto } from './dto/transactions.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { AccountEntity } from '../../database/entities/account.entity';
import {
  TransactionEntity,
  TransactionType,
} from '../../database/entities/transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private accountService: AccountService,
    private accountRepository: AccountRepository,
    private transactionRepository: TransactionRepository,
    private readonly dataSource: DataSource,
  ) {}

  async deposit(data: DepositAndWithdrawalDto): Promise<DepositResponseType> {
    const { accountNumber, amount } = data;
    const account = await this.accountService.findOne(accountNumber);
    account.balance = Number(account.balance) + Number(amount.toFixed(2));
    await this.accountRepository.accountUpdate(account);
    const transationsLog = {
      type: TransactionType.DEPOSIT,
      amount: data.amount,
      sourceAccount: account,
    };
    await this.transactionRepository.createTransaction(transationsLog);
    const message = `Saldo da Conta ${account.number}: ${account.balance}`;
    return { message };
  }

  async withdrawal(
    data: DepositAndWithdrawalDto,
  ): Promise<DepositResponseType> {
    const { accountNumber, amount } = data;
    const account = await this.accountService.findOne(accountNumber);
    if (account.balance < data?.amount)
      throw new BadRequestException('Saldo insuficiente');
    account.balance = Number(account.balance) - Number(amount.toFixed(2));
    await this.accountRepository.accountUpdate(account);
    const transationsLog = {
      type: TransactionType.WITHDRAW,
      amount: data.amount,
      sourceAccount: account,
    };
    await this.transactionRepository.createTransaction(transationsLog);
    const message = `Saldo da Conta ${account.number}: ${account.balance.toFixed(2)}`;
    return { message };
  }

  async transaction(data: TransactionsDto): Promise<DepositResponseType> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { fromAccount, toAccount } = await this.getAccounts(
        queryRunner,
        data,
      );

      fromAccount.balance -= data.amount;
      await queryRunner.manager.save(AccountEntity, fromAccount);

      toAccount.balance =
        Number(toAccount.balance) + Number(data.amount.toFixed(2));
      await queryRunner.manager.save(AccountEntity, toAccount);

      const transaction = new TransactionEntity();
      transaction.type = TransactionType.TRANSFER;
      transaction.amount = data.amount;
      transaction.sourceAccount = fromAccount;
      transaction.targetAccount = toAccount;
      transaction.created_at = new Date();

      await queryRunner.manager.save(transaction);

      await queryRunner.commitTransaction();

      return {
        message: `Saldo da Conta ${data.fromAccount}: ${fromAccount.balance}, Saldo da Conta ${data.toAccount}: ${toAccount.balance}`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getAccounts(queryRunner: QueryRunner, data: TransactionsDto) {
    const fromAccount = await queryRunner.manager.findOne(AccountEntity, {
      where: { number: data.fromAccount },
      lock: { mode: 'pessimistic_write' },
    });

    const toAccount = await queryRunner.manager.findOne(AccountEntity, {
      where: { number: data.toAccount },
      lock: { mode: 'pessimistic_write' },
    });

    if (!fromAccount || !toAccount) {
      throw new BadRequestException('Conta não encontrada');
    }

    if (fromAccount.balance < data.amount) {
      throw new BadRequestException('Saldo insuficiente');
    }

    return { fromAccount, toAccount };
  }
}
