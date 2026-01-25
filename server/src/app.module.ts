import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [UserModule, ProductModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
