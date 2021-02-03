export type SelectedFundState = {
  funds: IProduct[];
  investmentDetails?: IProductSales[];
  viewFund?: IProduct;
  outsideRisk?: boolean;
};

export const selectedFundInitialState: SelectedFundState = {
  funds: [],
  investmentDetails: [],
  viewFund: undefined,
  outsideRisk: false,
};
