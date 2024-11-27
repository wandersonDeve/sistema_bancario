import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Entity('tb_account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, generated: 'increment' })
  number: number;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.sourceAccount)
  outgoingTransactions: TransactionEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.targetAccount)
  incomingTransactions: TransactionEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
