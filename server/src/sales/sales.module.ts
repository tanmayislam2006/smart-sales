import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { AuthModule } from '../common/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
