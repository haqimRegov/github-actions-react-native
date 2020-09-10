export type productsState = {
  filters: IProductFilter;
};

export const productsInitialState: productsState = {
  filters: {
    fundType: [],
    utType: [],
    epfApproved: [],
    fundCurrency: [],
    prsType: [],
    fundCategory: [],
    riskCategory: [],
    shariahApproved: [],
    issuingHouse: [],
  },
};
