import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";

const Product = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/product");
      return res.data.data;
    },
  });
  
  if (isLoading) {
    return <p className="text-center">Data is loading...</p>;
  }
  const productColumns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ getValue }) => `$${getValue()}`,
    },
    {
      accessorKey: "stockQuantity",
      header: "Stock",
      cell: ({ getValue }) => {
        const value = getValue();

        let color = "text-green-600";
        if (value === 0) color = "text-red-600";
        else if (value <= 5) color = "text-yellow-500";

        return <span className={`font-medium ${color}`}>{value}</span>;
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Pencil size={16} />
            </Button>

            <Button
              onClick={() => {
                alert(`Cliked ${product.id}`);
              }}
              size="icon"
              variant="ghost"
              className="text-red-500"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="space-y-6 container mx-auto mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>

        <Button className="flex items-center gap-2">
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      <DataTable columns={productColumns} data={data} />
    </div>
  );
};

export default Product;
