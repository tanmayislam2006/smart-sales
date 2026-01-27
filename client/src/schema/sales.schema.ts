import { z } from "zod";

export const salesSchema = z.object({
  productID: z.string().min(1, "Product is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export type SalesFormValues = z.infer<typeof salesSchema>;
