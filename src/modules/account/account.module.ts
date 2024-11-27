import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './repository/account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../database/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository, AccountEntity])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}