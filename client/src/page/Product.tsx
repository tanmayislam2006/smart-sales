import useAxiosSecure from "@/Hooks/useAxiosSecure";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProductFormModal from "@/components/ui/ProductFormModal";
import { useState } from "react";

const Product = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/product");
      return res.data.data;
    },
  });

  const { mutate: deleteProduct, isLoading: deleting } = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/product/${id}`);
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;
    deleteProduct(id);
  };

  if (isLoading) {
    return <p className="text-center">Data is loading...</p>;
  }

  const productColumns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "sku", header: "SKU" },
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
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setEditProduct(product);
                setOpenModal(true);
              }}
            >
              <Pencil size={16} />
            </Button>
            <Button
              onClick={() => handleDelete(product.id)}
              size="icon"
              variant="ghost"
              className="text-red-500"
              disabled={deleting}
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
        <Button onClick={() => setOpenModal(true)}>
          <Plus size={18} /> Add Product
        </Button>
      </div>
      <ProductFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditProduct(null);
        }}
        defaultValues={editProduct}
      />

      <DataTable columns={productColumns} data={data} />
    </div>
  );
};

export default Product;
