import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'generated/prisma/client';
import { prisma } from 'src/libs/prisma';

@Injectable()
export class ProductService {
  async getProducts() {
    return await prisma.product.findMany();
  }
  async uploadProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const result = await prisma.product.create({
      data: {
        ...data,
      },
    });

    return result;
  }
  async updateProduct(
    id: string,
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    const result = await prisma.product.update({
      where: { id },
      data,
    });

    return result;
  }
  async deleteProduct(id: string) {
    console.log(id);
    const isExist = await prisma.product.findUnique({
      where: { id },
    });

    if (!isExist) {
      throw new NotFoundException('Product not found');
    }

    const result = await prisma.product.delete({
      where: { id },
    });

    return result;
  }
}
