import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../common/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getProducts() {
    const res = await this.productService.getProducts();
    return {
      success: true,
      message: 'Product Data Fetch successfully',
      data: res,
    };
  }

  @UseGuards(AuthGuard)
  @Post()
  async uploadProduct(
    @Body() data: Omit<any, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    const res = await this.productService.uploadProduct(data);
    return {
      success: true,
      message: 'Product uploaded successfully',
      data: res,
    };
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: Omit<any, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    const res = await this.productService.updateProduct(id, data);
    return {
      success: true,
      message: 'Product updated successfully',
      data: res,
    };
  }
}
