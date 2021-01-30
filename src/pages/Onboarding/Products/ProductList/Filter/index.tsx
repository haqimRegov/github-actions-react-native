import React, { FunctionComponent } from "react";

import { AMPFilter } from "./AMP";
import { PRSFilter } from "./PRS";
import { UTFilter } from "./UT";

export interface ProductFilterProps {
  filter: IProductFilter;
  setFilter: (filter: IProductFilter) => void;
  productType: ProductType;
}

export const ProductFilter: FunctionComponent<ProductFilterProps> = (props: ProductFilterProps) => {
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
