import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tb_account')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: string;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;
}
