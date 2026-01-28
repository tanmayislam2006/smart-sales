import DataTable from "@/components/DataTable";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import type { Sale } from "@/types";
import { useQuery } from "@tanstack/react-query";

type SaleTableRow = Sale & {
  name: string;
  sku: string;
};

const MySales = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery<Sale[]>({
    queryKey: ["my-sales"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sales");
      return res.data.data;
    },
  });

  if (isLoading) {
    return <p className="text-center">Data Is Loading</p>;
  }

  const tableData: SaleTableRow[] = data.map((sale) => ({
    ...sale,
    name: sale.product.name,
    sku: sale.product.name,
  }));

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }: { row: { original: SaleTableRow } }) => (
        <span>{row.original.id}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Product",
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }: { row: { original: SaleTableRow } }) => (
        <span>{row.original.quantity}</span>
      ),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }: { row: { original: SaleTableRow } }) => (
        <span>${row.original.total}</span>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <DataTable<SaleTableRow> columns={columns} data={tableData} />
    </div>
  );
};

export default MySales;
