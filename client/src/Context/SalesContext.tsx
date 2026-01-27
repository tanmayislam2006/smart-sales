import { createContext } from "react";

export interface SalesContextType {
  hello?: string;
  sales?: any[];
  setSales?: React.Dispatch<React.SetStateAction<any[]>>;
}

const SalesContext = createContext<SalesContextType | null>(null);

export default SalesContext;
