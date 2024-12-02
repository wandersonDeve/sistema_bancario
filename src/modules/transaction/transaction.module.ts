import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './repository/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../../database/entities/transaction.entity';
import { AccountModule } from '../account/account.module';
import { AccountEntity } from '../../database/entities/account.entity';
import { AccountRepository } from '../account/repository/account.repository';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forFeature([
      TransactionRepository,
      TransactionEntity,
      AccountRepository,
      AccountEntity,
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
