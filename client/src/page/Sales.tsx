import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { salesSchema } from "@/schema/sales.schema";
import type { SalesFormValues } from "@/schema/sales.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useMemo } from "react";
import { ShoppingCart } from "lucide-react";

const Sales = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/product");
      return res.data.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<SalesFormValues>({
    resolver: zodResolver(salesSchema),
  });

  const productID = watch("productID");
  const quantity = watch("quantity") || 0;

  const product = useMemo(
    () => products.find((p) => p.id === productID),
    [products, productID],
  );

  const total = product ? product.price * quantity : 0;
  const remainingStock = product ? product.stockQuantity - quantity : null;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SalesFormValues) =>
      axiosSecure.post("/sales", data),
    onSuccess: () => {
      toast.success("Sale completed successfully");
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["sales"]);
      reset();
    },
    onError: () => {
      toast.error("Sale failed");
    },
  });

  return (
    <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="">
        <CardHeader>
          <CardTitle>Create Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) => mutate(data))}
            className="space-y-4"
          >
            <div>
              <Select
                onValueChange={(value) =>
                  setValue("productID", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem
                      key={p.id}
                      value={p.id}
                      disabled={p.stockQuantity === 0}
                    >
                      {p.name} — Stock: {p.stockQuantity} | ${p.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.productID && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.productID.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="number"
                min={1}
                max={product?.stockQuantity}
                placeholder="Quantity"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full flex items-center gap-2"
              disabled={
                !product ||
                quantity <= 0 ||
                quantity > (product?.stockQuantity || 0) ||
                isLoading
              }
            >
              <ShoppingCart size={18} />
              Complete Sale
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="md:w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Sale Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {product ? (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Product</p>
                <p className="font-medium">{product.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Unit Price</p>
                <p className="font-medium">${product.price}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Quantity</p>
                <p className="font-medium">{quantity} unit(s)</p>
              </div>

              <hr />

              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${total.toFixed(2)}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Remaining stock after sale: {remainingStock}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a product to preview the sale
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
