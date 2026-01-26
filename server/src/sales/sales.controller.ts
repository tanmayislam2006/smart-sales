import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { AuthGuard } from '../common/auth.guard';
import { CreateSalesDto } from './dto/createSales.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  @Get()
  getSales() {
    return 'Sales data';
  }
  @UseGuards(AuthGuard)
  @Post()
  async createSales(
    @Body()
    data: CreateSalesDto,
    @Req() req,
  ) {
    const user = req.user;

    const res = await this.salesService.createSales({
      productID: data.productID,
      userID: user.userId,
      quantity: data.quantity,
    });
    return {
      success: true,
      message: 'Sales Created successfully',
      data: res,
    };
  }
}
