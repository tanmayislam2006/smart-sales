import { Injectable } from '@nestjs/common';
import { Product } from 'generated/prisma/client';
import { prisma } from 'src/libs/prisma';

@Injectable()
export class ProductService {
  async getProducts() {
    return await prisma.product.findMany();
  }
  async uploadProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const result = await prisma.product.create({
      data,
    });

    return result;
  }
}
