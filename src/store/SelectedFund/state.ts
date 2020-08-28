export type SelectedFundState = {
  funds: IFund[];
  investmentDetails?: IFundSales[];
};

export const selectedFundInitialState: SelectedFundState = {
  funds: [],
  investmentDetails: [],
};
