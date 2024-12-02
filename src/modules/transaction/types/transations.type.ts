import { AccountEntity } from '../../../database/entities/account.entity';
import { TransactionType } from '../../../database/entities/transaction.entity';

export type TransationsType = {
  type: TransactionType;
  amount: number;
  sourceAccount: AccountEntity;
  targetAccount?: AccountEntity;
};
