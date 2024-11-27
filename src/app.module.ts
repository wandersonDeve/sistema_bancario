import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
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
