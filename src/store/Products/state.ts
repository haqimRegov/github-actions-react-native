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

export const productsInitialState: productsState = {
  ut: {
    filters: productsInitialFilter,
    search: "",
    showBy: "recommended",
    all: [],
    recommended: [],
    page: "",
    pages: "",
    sort: [
      { column: "fundAbbr", value: "" },
      { column: "fundName", value: "" },
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
    page: "",
    pages: "",
    sort: [
      { column: "fundAbbr", value: "" },
      { column: "fundName", value: "" },
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
    page: "",
    pages: "",
    sort: [
      { column: "fundAbbr", value: "" },
      { column: "fundName", value: "" },
    ],
    totalCount: {
      all: "",
      recommended: "",
    },
  },
  amp: {
    filters: productsInitialFilter,
    search: "",
    showBy: "recommended",
    all: [],
    recommended: [],
    page: "",
    pages: "",
    sort: [
      { column: "fundAbbr", value: "" },
      { column: "fundName", value: "" },
    ],
    totalCount: {
      all: "",
      recommended: "",
    },
  },
  productType: "ut",
};
