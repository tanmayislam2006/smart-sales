import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schema/product.schema";
import type { ProductFormValues } from "@/schema/product.schema";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultValues?: ProductFormValues & { id?: string };
};

const ProductFormModal = ({ open, onClose, defaultValues }: Props) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const isEdit = Boolean(defaultValues?.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const { mutate } = useMutation({
    mutationFn: async (data: ProductFormValues) => {
      if (isEdit) {
        return axiosSecure.patch(`/product/${defaultValues?.id}`, data);
      }
      return axiosSecure.post("/product", data);
    },
    onSuccess: () => {
      toast.success(isEdit ? "Product updated" : "Product added");
      queryClient.invalidateQueries(["products"]);
      reset();
      onClose();
    },
    onError: () => {
      toast.error("Operation failed");
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            defaultValue={defaultValues?.name}
            placeholder="Product Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          <Input
            placeholder="SKU"
            defaultValue={defaultValues?.sku}
            {...register("sku")}
          />
          {errors.sku && (
            <p className="text-sm text-red-500">{errors.sku.message}</p>
          )}

          <Input
            type="number"
            step="0.01"
            placeholder="Price"
            defaultValue={defaultValues?.price}
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}

          <Input
            type="number"
            defaultValue={defaultValues?.stockQuantity}
            placeholder="Stock Quantity"
            {...register("stockQuantity", { valueAsNumber: true })}
          />
          {errors.stockQuantity && (
            <p className="text-sm text-red-500">
              {errors.stockQuantity.message}
            </p>
          )}

          <Button className="w-full" disabled={isSubmitting}>
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
