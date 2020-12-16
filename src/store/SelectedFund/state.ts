export type SelectedFundState = {
  funds: IProduct[];
  investmentDetails?: IProductSales[];
  viewFund?: IProduct;
};

export const selectedFundInitialState: SelectedFundState = {
  funds: [],
  investmentDetails: [],
  viewFund: undefined,
};
