import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from 'src/libs/prisma';

@Injectable()
export class SalesService {
  async createSales(payload: {
    productID: string;
    userID: string;
    quantity: number;
  }) {
    return await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: payload.productID },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.stockQuantity < payload.quantity) {
        throw new BadRequestException('Insufficient stock available');
      }

      const total = product.price * payload.quantity;

      const updatedProduct = await tx.product.update({
        where: { id: payload.productID },
        data: {
          stockQuantity: {
            decrement: payload.quantity,
          },
        },
      });

      const sale = await tx.sales.create({
        data: {
          productID: payload.productID,
          userID: payload.userID,
          quantity: payload.quantity,
          total,
        },
      });

      return sale;
    });
  }
}
