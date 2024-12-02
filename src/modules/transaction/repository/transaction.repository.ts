import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { TransactionEntity } from '../../../database/entities/transaction.entity';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createTransaction(data: DeepPartial<TransactionEntity>) {
    try {
      const transaction = this.transactionRepository.create(data);
      const data2 = await this.transactionRepository.save(transaction);
      return data2;
    } catch (error) {
      console.log('RROR NO LOG: ', error);
    }
  }
}
