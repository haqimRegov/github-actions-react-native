import React, { FunctionComponent } from "react";

import { AMPFilter, PRSFilter, UTFilter } from "../../../../../templates";

export interface ProductFilterProps {
  accountDetails?: INewSalesAccountDetails;
  availableFilters: IProductAvailableFilter;
  filter: IProductFilter;
  setFilter: (filter: IProductFilter) => void;
  productType: ProductType;
}

export const ProductFilter: FunctionComponent<ProductFilterProps> = ({ accountDetails, ...rest }: ProductFilterProps) => {
  switch (rest.productType) {
    case "ut":
      return <UTFilter accountDetails={accountDetails} {...rest} />;
    case "prs":
      return <PRSFilter accountDetails={accountDetails} {...rest} />;
    case "prsDefault":
      return <PRSFilter accountDetails={accountDetails} {...rest} />;
    case "amp":
      return <AMPFilter {...rest} />;

    default:
      return <UTFilter accountDetails={accountDetails} {...rest} />;
  }
};
