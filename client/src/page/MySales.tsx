import DataTable from "@/components/DataTable";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MySales = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["my-sales"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sales");
      return res.data.data;
    },
  });
  if (isLoading) {
    return <p className="text-center">Data Is Loading </p>;
  }
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.original.id}</span>,
    },
    {
      accessorKey: "productID",
      header: "Product ID",
      cell: ({ row }) => <span>{row.original.productID}</span>,
    },
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => <span>{row.original.product.name}</span>,
    },
    {
      accessorKey: "userID",
      header: "User ID",
      cell: ({ row }) => <span>{row.original.userID}</span>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <span>{row.original.quantity}</span>,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => <span>{row.original.total}</span>,
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MySales;
