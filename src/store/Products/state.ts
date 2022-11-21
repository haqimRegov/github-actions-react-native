export type productsState = {
  ut: {
    all: IProduct[];
    filters: IProductFilter;
    recommended: IProduct[];
    search: string;
    showBy: ProductListShowByType;
    page: string;
    pages: string;
    sort: IProductSort[];
    totalCount: IProductTotalCount;
  };
  prs: {
    all: IProduct[];
    filters: IProductFilter;
    recommended: IProduct[];
    search: string;
    showBy: ProductListShowByType;
    page: string;
    pages: string;
    sort: IProductSort[];
    totalCount: IProductTotalCount;
  };
  prsDefault: {
    all: IProduct[];
    filters: IProductFilter;
    recommended: IProduct[];
    search: string;
    showBy: ProductListShowByType;
    page: string;
    pages: string;
    sort: IProductSort[];
    totalCount: IProductTotalCount;
  };
  amp: {
    all: IProduct[];
    filters: IProductFilter;
    recommended: IProduct[];
    search: string;
    showBy: ProductListShowByType;
    page: string;
    pages: string;
    sort: IProductSort[];
    totalCount: IProductTotalCount;
  };
  availableFilters: IProductAvailableFilter;
  productType: ProductType;
};

export const productsInitialFilter = {
  epfApproved: [],
  fundCurrency: [],
  fundType: [],
  issuingHouse: [],
  riskCategory: [],
  shariahApproved: [],
  conventional: [],
};

export const initialAvailableFilters: IProductAvailableFilter = {
  fundCurrency: [],
  fundCategory: [],
  issuingHouse: [],
  riskCategory: [],
};

export const ampInitialFilter = {
  epfApproved: [],
  fundCurrency: [],
  fundType: [],
  issuingHouse: ["KENANGA INVESTORS BERHAD"],
  riskCategory: [],
  shariahApproved: [],
  conventional: [],
};

export const productsInitialState: productsState = {
  ut: {
    filters: productsInitialFilter,
    search: "",
    showBy: "recommended",
    all: [],
    recommended: [],
    page: "1",
    pages: "",
    sort: [
      { column: "fundAbbr", value: "" },
      { column: "fundName", value: "" },
      { column: "riskCategory", value: "" },
    ],
    totalCount: {
      all: "",
      recommended: "",
    },
  },
  prs: {
    filters: productsInitialFilter,
    search: "",
    showBy: "recommended",
    all: [],
    recommended: [],
    page: "1",
    pages: "",
    sort: [
      { column: "fundAbbr", value: "" },
      { column: "fundName", value: "" },
      { column: "riskCategory", value: "" },
    ],
    totalCount: {
      all: "",
      recommended: "",
    },
  },
  prsDefault: {
    filters: productsInitialFilter,
    search: "",
    showBy: "recommended",
    all: [],
    recommended: [],
    page: "1",
    pages: "",
    sort: [
      { column: "fundAbbr", value: "" },
      { column: "fundName", value: "" },
      { column: "riskCategory", value: "" },
    ],
    totalCount: {
      all: "",
      recommended: "",
    },
  },
  amp: {
    filters: ampInitialFilter,
    search: "",
    showBy: "recommended",
    all: [],
    recommended: [],
    page: "1",
    pages: "",
    sort: [
      { column: "fundAbbr", value: "" },
      { column: "fundName", value: "" },
      { column: "riskCategory", value: "" },
    ],
    totalCount: {
      all: "",
      recommended: "",
    },
  },
  availableFilters: initialAvailableFilters,
  productType: "ut",
};
