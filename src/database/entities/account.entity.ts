import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tb_account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, generated: 'increment' })
  number: number;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
