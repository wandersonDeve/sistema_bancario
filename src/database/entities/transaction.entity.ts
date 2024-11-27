import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

@Entity('tb_transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => AccountEntity, (account) => account.id, { nullable: true })
  sourceAccount: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.id, { nullable: true })
  targetAccount: AccountEntity;

  @CreateDateColumn()
  created_at: Date;
}