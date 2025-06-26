import React, { createContext, useContext } from "react";
import { BreadcrumbContextValue, BreadcrumbProviderProps } from "../types";

const BreadcrumbContext = createContext<BreadcrumbContextValue | undefined>(
  undefined
);

export const BreadcrumbProvider = ({
  children,
  dropdownMenuConfig,
  tooltipConfig,
}: BreadcrumbProviderProps) => {
  return (
    <BreadcrumbContext.Provider value={{ dropdownMenuConfig, tooltipConfig }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export function useBreadcrumbContext() {
  return useContext(BreadcrumbContext);
}

export { BreadcrumbContext };
