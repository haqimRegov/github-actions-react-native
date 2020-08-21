export const SAMPLE_PRODUCTS: IProduct[] = [
  {
    epf: "Yes",
    graph: "Kenanga growth fund graph",
    issuer: "Kenanga Investors Berhad",
    name: "Kenanga growth fund",
    performance: "+5.3%",
    risk: "LOW",
    shariah: "No",
    type: "Equity / Growth",
  },
  {
    epf: "Yes",
    graph: "Kenanga Investment Fund graph",
    name: "Kenanga Investment Fund",
    performance: "+5.3%",
    risk: "LOW",
    shariah: "No",
    type: "Equity / Growth",
    issuer: "Kenanga Investors Berhad",
  },
  {
    epf: "Yes",
    graph: "KENANGA ACTIVELY MANAGED PORTFOLIOS (AMP) SERVICE graph",
    name: "KENANGA ACTIVELY MANAGED PORTFOLIOS (AMP) SERVICE",
    performance: "+5.3%",
    risk: "HIGH",
    shariah: "No",
    type: "UT",
    issuer: "Kenanga Investors Berhad",
  },
  {
    epf: "Yes",
    graph: "Kenanga Balanced Fund graph",
    name: "Kenanga Balanced Fund",
    performance: "+5.3%",
    risk: "MEDIUM",
    shariah: "No",
    type: "UT",
    issuer: "Kenanga Investors Berhad",
  },
  {
    epf: "Yes",
    graph: "Kenanga Cash Plus Fund graph",
    name: "Kenanga Cash Plus Fund",
    performance: "+5.3%",
    risk: "LOW",
    shariah: "No",
    type: "UT",
    issuer: "Kenanga Investors Berhad",
  },
  {
    epf: "Yes",
    graph: "Kenanga Principal Protected Income Fund graph",
    name: "Kenanga Principal Protected Income Fund",
    performance: "+5.3%",
    risk: "LOW",
    shariah: "No",
    type: "UT",
    issuer: "Kenanga Investors Berhad",
  },
];

// UTF, shariah, EPF, scheduled
export const SAMPLE_PRODUCT_2: IFund = {
  name: "KENANGA SHARIAH GROWTH OPPORTUNITIES FUND",
  issuer: "KENANGA INVESTORS BERHAD (353563-P)",
  fundType: "UTF",
  riskCategory: "Medium",
  isEpf: true,
  isShariah: true,
  isScheduled: true,
  fundObjective:
    "The Fund aims to achieve consistent capital appreciation over the long term by primarily investing in Shariah-compliant securities with good growth prospects*. *Good growth prospects refers to companies with higher earnings growth than the market average.",
  fundCategory: "EQUITY",
  latestFundSize: 5000000,
  salesCharge: {
    cash: {
      maximum: "6.5%",
      minimum: "",
    },
    epf: {
      maximum: "",
      minimum: "",
    },
  },
  annualManagementFee: "1.550%",
  topUpAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 100,
    },
  },
  newSalesAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 1000,
    },
  },
  fundCurrency: "MYR",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
    benchmark: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
  },
};

// AMP, conventional, non-epf
export const SAMPLE_PRODUCT_3: IFund = {
  name: "AMP 1",
  issuer: "KENANGA INVESTORS BERHAD",
  fundType: "AMP",
  riskCategory: "Low",
  isEpf: false,
  isShariah: false,
  isScheduled: false,
  fundObjective:
    "The portfolio seeks to deliver potential consistent return through investments in Kenanga Investors Berhad approved money market, fixed income and equities funds.",
  fundCategory: "Conservative",
  latestFundSize: 5000000,
  salesCharge: {
    cash: {
      maximum: "6.5%",
      minimum: "",
    },
    epf: {
      maximum: "",
      minimum: "",
    },
  },
  annualManagementFee: "1.550%",
  topUpAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 100,
    },
  },
  newSalesAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 1000,
    },
  },
  fundCurrency: "MYR",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
    benchmark: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
  },
};

// AMP, conventional, EPF
export const SAMPLE_PRODUCT_4: IFund = {
  name: "AMP 2 E",
  issuer: "KENANGA INVESTORS BERHAD",
  fundType: "AMP",
  riskCategory: "High",
  isEpf: true,
  isShariah: false,
  isScheduled: false,
  fundObjective:
    "The portfolio seeks to deliver potential consistent return through investments in Kenanga Investors Berhad approved money market, fixed income and equities funds. These funds qualified under EPF Member’s Investment Scheme.",
  fundCategory: "Moderate",
  latestFundSize: 5000000,
  salesCharge: {
    cash: {
      maximum: "6.5%",
      minimum: "",
    },
    epf: {
      maximum: "",
      minimum: "",
    },
  },
  annualManagementFee: "1.550%",
  topUpAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 100,
    },
  },
  newSalesAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 1000,
    },
  },
  fundCurrency: "MYR",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
    benchmark: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
  },
};

// UT, conventional,  non-EPF, one time only
export const SAMPLE_PRODUCT_5: IFund = {
  name: "KENANGA ASIAPAC CAPITAL GUARANTEED",
  issuer: "KENANGA INVESTORS BERHAD",
  fundType: "UTF",
  riskCategory: "High",
  isEpf: false,
  isShariah: false,
  isScheduled: false,
  fundObjective:
    "The portfolio seeks to deliver potential consistent return through investments in Kenanga Investors Berhad approved money market, fixed income and equities funds. These funds qualified under EPF Member’s Investment Scheme.",
  fundCategory: "CAPITAL GUARANTEED",
  latestFundSize: 5000000,
  salesCharge: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "1.500%",
      minimum: "",
    },
  },
  annualManagementFee: "1.000%",
  topUpAmount: {
    cash: {
      maximum: 9999999999999,
      minimum: 5000,
    },
  },
  newSalesAmount: {
    cash: {
      maximum: 50000000,
      minimum: 5000,
    },
  },
  fundCurrency: "MYR",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
    benchmark: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
  },
};

// PRS, conventional,  non-EPF, one time only
export const SAMPLE_PRODUCT_6: IFund = {
  name: "KENANGA ONEPRS GROWTH FUND",
  issuer: "KENANGA INVESTORS BERHAD",
  fundType: "PRS",
  riskCategory: "High",
  isEpf: false,
  isShariah: false,
  isScheduled: false,
  fundObjective: "The Fund seeks to provide capital growth.",
  fundCategory: "Core (Growth)",
  latestFundSize: 5000000,
  salesCharge: {
    cash: {
      maximum: "1.500%",
      minimum: "",
    },
  },
  annualManagementFee: "1.550%",
  topUpAmount: {
    cash: {
      maximum: 9999999999999,
      minimum: 100,
    },
  },
  newSalesAmount: {
    cash: {
      maximum: 9999999999999,
      minimum: 1000,
    },
  },
  fundCurrency: "MYR",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
    benchmark: {
      oneMonth: [30, 50, 70, 90],
      sixMonths: [30, 50, 70, 90],
      oneYear: [30, 50, 70, 90],
      threeYears: [30, 50, 70, 90],
      fiveYears: [30, 50, 70, 90],
      tenYears: [30, 50, 70, 90],
    },
  },
};

export const SAMPLE_PRODUCTS_1: IFund[] = [SAMPLE_PRODUCT_2, SAMPLE_PRODUCT_3, SAMPLE_PRODUCT_4, SAMPLE_PRODUCT_5, SAMPLE_PRODUCT_6];
