import { Module } from '@nestjs/common';
import { TransactionModule } from './modules/transaction/transaction.module';
import { AccountModule } from './modules/account/account.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './database/data-source';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './configs/environments';

@Module({
  imports: [
    TransactionModule,
    AccountModule,
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...postgresConfig,
        autoLoadEntities: true,
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: +process.env.THROTTLE_TTL,
        limit: +process.env.THROTTLE_LIMIT,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
