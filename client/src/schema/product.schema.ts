import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  price: z.number().positive("Price must be greater than 0"),
  stockQuantity: z.number().int().min(0, "Stock cannot be negative"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
