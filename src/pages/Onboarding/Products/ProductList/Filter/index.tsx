import React, { FunctionComponent } from "react";

import { AMPFilter } from "./AMP";
import { PRSFilter } from "./PRS";
import { UTFilter } from "./UT";

export interface ProductFilterProps {
  filter: IProductFilter;
  setFilter: (filter: IProductFilter) => void;
  productType: ProductType;
}

export const ProductFilter: FunctionComponent<ProductFilterProps> = ({ productType, ...rest }: ProductFilterProps) => {
  switch (productType) {
    case "ut":
      return <UTFilter {...rest} />;
    case "prs":
      return <PRSFilter {...rest} />;
    case "prsDefault":
      return <PRSFilter {...rest} />;
    case "amp":
      return <AMPFilter {...rest} />;

    default:
      return <UTFilter {...rest} />;
  }
};
