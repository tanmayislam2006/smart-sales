import type { ReactNode } from "react";
import SalesContext from "./SalesContext";

interface SalesProviderProps {
  children: ReactNode;
}

const SalesProvider = ({ children }: SalesProviderProps) => {
  const hello = "hello";

  const salesData = {
    hello,
  };

  return (
    <SalesContext.Provider value={salesData}>
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
