// UTF, shariah, EPF, scheduled
export const FUND_MASTER_1 = {
  fundCode: "IAST",
  fundName: "KENANGA SHARIAH GROWTH OPPORTUNITIES FUND",
  fundStatus: "ACTIVE",
  fundCategory: "EQUITY",
  fundProcessingGroup: "LOCAL",
  fundDescription: {
    closedEnd: false,
    distribution: "Retail", // Retail Fund / Wholesale Fund
  },
  fundType: "UTF",
  isShariah: true,
  fundClass: "NA",
  utmc: "KENANGA INVESTORS BERHAD (353563-P)",
  trustee: "KENANGA INVESTORS BERHAD (353563-P)",
  scProcessingGroup: "Option 1",
  epf: {
    approved: true,
    status: "ACTIVE",
  },
  fundStartDate: "4/23/04",
  iopEndDate: "5/14/04",
  maturityDate: "",
  transactionsAfterIop: {
    allow: true,
    newSales: true,
    topUpSales: true,
    redemption: true,
    redemptionCoolOff: true,
    switchIn: true,
    switchOut: true,
    transfer: true,
  },
  incomeDistribution: {
    instruction: "AS PER INVESTOR'S  INSTRUCTION", // need
    dividendTiming: "AFTER EOD",
    minimumAmount: "250",
    dailyDistribution: false,
  },
  fundBaseCurrency: "MYR", // currency, if non-MYR, need FEA
  fundClassCurrency: "MYR",
  issuePrice: "",
  annualManagementFee: "1.550%",
  annualTrusteeFee: "0.070%",
  salesCharge: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "6.5%",
      minimum: "",
    },
  },
  aipAllowed: true, // scheduled payment
  newSalesAmount: {
    epf: {
      maximum: "9999999999999",
      minimum: "1000",
    },
    cash: {
      maximum: "9999999999999",
      minimum: "1000",
    },
  },
  topUpAmount: {
    epf: {
      maximum: "9999999999999",
      minimum: "1000",
    },
    cash: {
      maximum: "9999999999999",
      minimum: "100",
    },
  },
  coolOfDays: "7",
  exitFeesCharge: {
    epf: {
      amount: "",
      percent: "",
    },
    cash: {
      amount: "",
      percent: "",
    },
  },
  redemptionType: "Both", // -Unit Only -Amount only -Both
  switchOutType: "Both", // -Unit Only -Amount only -Both
  switchingFee: "",
  minimumUnits: {
    redemption: "500",
    switchOut: "500",
    transferOut: "500",
    balanceHoldings: "500",
  },
  cutOffTime: {
    batch: "12pm / 4pm",
    redemption: "4:00PM",
    sales: "4:00PM",
  },
  gstParameter: "",
  riskCategory: "",
  nonBusinessDay: {
    fromDate: "",
    toDate: "",
  },
  differenceFundPrice: "",
  settleDate: {
    redemption: "",
    switching: "",
  },
  fundObjective:
    "The Fund aims to achieve consistent capital appreciation over the long term by primarily investing in Shariah-compliant securities with good growth prospects*. *Good growth prospects refers to companies with higher earnings growth than the market average.",
  dedicatedFund: false,
  ampFee: "",
  moneySightedFund: false,
  felSharing: "",
  assetAllocation: "",
  lipperCode: "",
};

// AMP, conventional, non-epf
export const FUND_MASTER_2 = {
  fundCode: "",
  fundName: "AMP 1",
  fundStatus: "ACTIVE",
  fundCategory: "Conservative",
  fundProcessingGroup: "",
  fundDescription: {
    closedEnd: false,
    distribution: "Retail",
  },
  fundType: "AMP",
  isShariah: false,
  fundClass: "NA",
  utmc: "KENANGA INVESTORS BERHAD",
  trustee: "BASED ON INDIVIDUAL FUNDS",
  scProcessingGroup: "",
  epf: {
    approved: false,
    status: "",
  },
  fundStartDate: "",
  iopEndDate: "",
  maturityDate: "",
  transactionsAfterIop: {
    allow: "",
    newSales: "",
    topUpSales: "",
    redemption: "",
    redemptionCoolOff: "",
    switchIn: "",
    switchOut: "",
    transfer: "",
  },
  incomeDistribution: {
    instruction: "",
    dividendTiming: "",
    minimumAmount: "",
    dailyDistribution: false,
  },
  fundBaseCurrency: "", // currency, if non-MYR, need FEA
  fundClassCurrency: "",
  issuePrice: "",
  annualManagementFee: "",
  annualTrusteeFee: "",
  salesCharge: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "",
      minimum: "",
    },
  },
  aipAllowed: false, // scheduled payment
  newSalesAmount: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "",
      minimum: "",
    },
  },
  topUpAmount: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "",
      minimum: "",
    },
  },
  coolOfDays: "",
  exitFeesCharge: {
    epf: {
      amount: "",
      percent: "",
    },
    cash: {
      amount: "",
      percent: "",
    },
  },
  redemptionType: "", // -Unit Only -Amount only -Both
  switchOutType: "", // -Unit Only -Amount only -Both
  switchingFee: "",
  minimumUnits: {
    redemption: "",
    switchOut: "",
    transferOut: "",
    balanceHoldings: "",
  },
  cutOffTime: {
    batch: "",
    redemption: "",
    sales: "",
  },
  gstParameter: "",
  riskCategory: "",
  nonBusinessDay: {
    fromDate: "",
    toDate: "",
  },
  differenceFundPrice: "",
  settleDate: {
    redemption: "",
    switching: "",
  },
  fundObjective:
    "The portfolio seeks to deliver potential consistent return through investments in Kenanga Investors Berhad approved money market, fixed income and equities funds.",
  dedicatedFund: false,
  ampFee: "",
  moneySightedFund: false,
  felSharing: "",
  assetAllocation: "",
  lipperCode: "",
};

// AMP, conventional, EPF
export const FUND_MASTER_3 = {
  fundCode: "",
  fundName: "AMP 2 E",
  fundStatus: "Active",
  fundCategory: "Moderate",
  fundProcessingGroup: "",
  fundDescription: {
    closedEnd: false,
    distribution: "Retail",
  },
  fundType: "AMP",
  isShariah: false,
  fundClass: "NA",
  utmc: "KENANGA INVESTORS BERHAD",
  trustee: "BASED ON INDIVIDUAL FUNDS",
  scProcessingGroup: "",
  epf: {
    approved: true,
    status: "",
  },
  fundStartDate: "",
  iopEndDate: "",
  maturityDate: "",
  transactionsAfterIop: {
    allow: "",
    newSales: "",
    topUpSales: "",
    redemption: "",
    redemptionCoolOff: "",
    switchIn: "",
    switchOut: "",
    transfer: "",
  },
  incomeDistribution: {
    instruction: "",
    dividendTiming: "",
    minimumAmount: "",
    dailyDistribution: false,
  },
  fundBaseCurrency: "MYR", // currency, if non-MYR, need FEA
  fundClassCurrency: "MYR",
  issuePrice: "",
  annualManagementFee: "1.550%",
  annualTrusteeFee: "0.070%",
  salesCharge: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "",
      minimum: "",
    },
  },
  aipAllowed: false, // scheduled payment
  newSalesAmount: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "",
      minimum: "",
    },
  },
  topUpAmount: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "",
      minimum: "",
    },
  },
  coolOfDays: "",
  exitFeesCharge: {
    epf: {
      amount: "",
      percent: "",
    },
    cash: {
      amount: "",
      percent: "",
    },
  },
  redemptionType: "", // -Unit Only -Amount only -Both
  switchOutType: "", // -Unit Only -Amount only -Both
  switchingFee: "",
  minimumUnits: {
    redemption: "",
    switchOut: "",
    transferOut: "",
    balanceHoldings: "",
  },
  cutOffTime: {
    batch: "",
    redemption: "",
    sales: "",
  },
  gstParameter: "",
  riskCategory: "",
  nonBusinessDay: {
    fromDate: "",
    toDate: "",
  },
  differenceFundPrice: "",
  settleDate: {
    redemption: "",
    switching: "",
  },
  fundObjective:
    "The portfolio seeks to deliver potential consistent return through investments in Kenanga Investors Berhad approved money market, fixed income and equities funds. These funds qualified under EPF Member’s Investment Scheme.",
  dedicatedFund: false,
  ampFee: "",
  moneySightedFund: false,
  felSharing: "",
  assetAllocation: "",
  lipperCode: "",
};

// UT, conventional,  non-EPF, one time only
export const FUND_MASTER_4 = {
  fundCode: "IACG",
  fundName: "KENANGA ASIAPAC CAPITAL GUARANTEED",
  fundStatus: "ALREADY MATURED FOR CLOSE-END FUND",
  fundCategory: "CAPITAL GUARANTEED",
  fundProcessingGroup: "FOREIGN",
  fundDescription: {
    closedEnd: true,
    distribution: "",
  },
  fundType: "UTF",
  isShariah: false,
  fundClass: "",
  utmc: "KENANGA INVESTORS BERHAD (353563-P)",
  trustee: "CIMB COMMERCE TRUSTEE BERHAD (313031-A)",
  scProcessingGroup: "NA",
  epf: {
    approved: false,
    status: "ACTIVE",
  },
  fundStartDate: "12/04/2006 12:00:00 AM",
  iopEndDate: "26/05/2006 12:00:00 AM",
  maturityDate: "06/06/2009 12:00:00 AM",
  transactionsAfterIop: {
    allow: "",
    newSales: "",
    topUpSales: "",
    redemption: "",
    redemptionCoolOff: "",
    switchIn: "",
    switchOut: "",
    transfer: "",
  },
  incomeDistribution: {
    instruction: "PAYOUT ONLY ",
    dividendTiming: "AFTER EOD",
    minimumAmount: "",
    dailyDistribution: false,
  },
  fundBaseCurrency: "MYR", // currency, if non-MYR, need FEA
  fundClassCurrency: "MYR",
  issuePrice: "",
  annualManagementFee: "1.000%",
  annualTrusteeFee: "0.070%",
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
  aipAllowed: false, // scheduled payment
  topUpAmount: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "9999999999999",
      minimum: "5000",
    },
  },
  newSalesAmount: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "50000000",
      minimum: "5000",
    },
  },
  coolOfDays: "7",
  exitFeesCharge: {
    epf: {
      amount: "",
      percent: "",
    },
    cash: {
      amount: "",
      percent: "",
    },
  },
  redemptionType: "NA", // -Unit Only -Amount only -Both
  switchOutType: "NA", // -Unit Only -Amount only -Both
  switchingFee: "",
  minimumUnits: {
    redemption: "",
    switchOut: "",
    transferOut: "5000",
    balanceHoldings: "5000",
  },
  cutOffTime: {
    batch: "NA",
    redemption: "NA",
    sales: "NA",
  },
  gstParameter: "",
  riskCategory: "",
  nonBusinessDay: {
    fromDate: "",
    toDate: "",
  },
  differenceFundPrice: "",
  settleDate: {
    redemption: "",
    switching: "",
  },
  fundObjective:
    "The portfolio seeks to deliver potential consistent return through investments in Kenanga Investors Berhad approved money market, fixed income and equities funds. These funds qualified under EPF Member’s Investment Scheme.",
  dedicatedFund: false,
  ampFee: "",
  moneySightedFund: false,
  felSharing: "",
  assetAllocation: "",
  lipperCode: "",
};
// PRS, conventional,  non-EPF, one time only
export const FUND_MASTER_5 = {
  fundCode: "PKOGF",
  fundName: "KENANGA ONEPRS GROWTH FUND",
  fundStatus: "ACTIVE",
  fundCategory: "Core (Growth)",
  fundProcessingGroup: "PRS LOCAL",
  fundDescription: {
    closedEnd: false,
    distribution: "Retail",
  },
  fundType: "PRS",
  isShariah: false,
  fundClass: "NA",
  utmc: "KENANGA INVESTORS BERHAD (353563-P)",
  trustee: "MAYBANK TRUSTEES BERHAD (5004-P)",
  scProcessingGroup: "Option 1",
  epf: {
    approved: false,
    status: "ACTIVE",
  },
  fundStartDate: "20/11/2013 12:00:00 AM",
  iopEndDate: "10/12/2013 12:00:00 AM",
  maturityDate: "",
  transactionsAfterIop: {
    allow: true,
    newSales: true,
    topUpSales: true,
    redemption: true,
    redemptionCoolOff: true,
    switchIn: true,
    switchOut: true,
    transfer: true,
  },
  incomeDistribution: {
    instruction: "REINVEST ONLY",
    dividendTiming: "AFTER EOD",
    minimumAmount: "",
    dailyDistribution: false,
  },
  fundBaseCurrency: "MYR", // currency, if non-MYR, need FEA
  fundClassCurrency: "MYR",
  issuePrice: "",
  annualManagementFee: "1.550%",
  annualTrusteeFee: "0.015%",
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
  aipAllowed: true, // scheduled payment
  topUpAmount: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "9999999999999",
      minimum: "100",
    },
  },
  newSalesAmount: {
    epf: {
      maximum: "",
      minimum: "",
    },
    cash: {
      maximum: "9999999999999",
      minimum: "1000",
    },
  },
  coolOfDays: "7",
  exitFeesCharge: {
    epf: {
      amount: "",
      percent: "",
    },
    cash: {
      amount: "",
      percent: "",
    },
  },
  redemptionType: "Both", // -Unit Only -Amount only -Both
  switchOutType: "Both", // -Unit Only -Amount only -Both
  switchingFee: "",
  minimumUnits: {
    redemption: "500",
    switchOut: "500",
    transferOut: "500",
    balanceHoldings: "500",
  },
  cutOffTime: {
    batch: "4:00PM",
    redemption: "4:00PM",
    sales: "12pm / 4pm",
  },
  gstParameter: "",
  riskCategory: "",
  nonBusinessDay: {
    fromDate: "",
    toDate: "",
  },
  differenceFundPrice: "",
  settleDate: {
    redemption: "",
    switching: "",
  },
  fundObjective: "The Fund seeks to provide capital growth.",
  dedicatedFund: false,
  ampFee: "",
  moneySightedFund: false,
  felSharing: "",
  assetAllocation: "<40",
  lipperCode: "",
};
