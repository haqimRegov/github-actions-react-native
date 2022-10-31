import React, { FunctionComponent } from "react";

import { AMPFilter, PRSFilter, UTFilter } from "../../../../../templates";

export interface ProductFilterProps {
  availableFilters: IProductAvailableFilter;
  filter: IProductFilter;
  setFilter: (filter: IProductFilter) => void;
  productType: ProductType;
}

export const ProductFilter: FunctionComponent<ProductFilterProps> = ({ ...props }: ProductFilterProps) => {
  switch (props.productType) {
    case "ut":
      return <UTFilter {...props} />;
    case "prs":
      return <PRSFilter {...props} />;
    case "prsDefault":
      return <PRSFilter {...props} />;
    case "amp":
      return <AMPFilter {...props} />;

    default:
      return <UTFilter {...props} />;
  }
};
