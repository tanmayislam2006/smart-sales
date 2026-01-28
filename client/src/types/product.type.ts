export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
};


export type Sale = {
  id: string;
  productID: string;
  userID: string;
  quantity: number;
  total: number;
  product: {
    name: string;
    sku: string;
  };
};