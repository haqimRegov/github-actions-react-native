// UTF, shariah, EPF, scheduled
export const SAMPLE_PRODUCT_2: IFund = {
  name: "KENANGA SHARIAH GROWTH OPPORTUNITIES FUND",
  issuer: "KENANGA INVESTORS BERHAD (353563-P)",
  documents: [
    {
      name: "Prospectus / Information Memorandum",
      link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "Product Highlight Sheet",
      link: "http://africau.edu/images/default/sample.pdf",
    },
    {
      name: "Annual Report",
      link: "http://www.fundacionsgae.org/Lists/FSGAE_SalaPrensa_Recursos/Attachments/1/dummy.pdf",
    },
    {
      name: "Fund Fact Sheet",
      link: "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf",
    },
  ],
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
    epf: {
      maximum: 8,
      minimum: 5,
    },
    cash: {
      maximum: 10,
      minimum: 8,
    },
  },
  annualManagementFee: 1.55,
  topUpAmount: {
    cash: {
      maximum: 9999999999999,
      minimum: 500,
    },
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
  },
  newSalesAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 2000,
    },
  },
  fundCurrency: "AUD",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
    benchmark: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
  },
};

// AMP, conventional, non-epf
export const SAMPLE_PRODUCT_3: IFund = {
  name: "AMP 1",
  issuer: "KENANGA INVESTORS BERHAD",
  documents: [
    {
      name: "Prospectus / Information Memorandum",
      link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "Product Highlight Sheet",
      link: "http://africau.edu/images/default/sample.pdf",
    },
    {
      name: "Annual Report",
      link: "http://www.fundacionsgae.org/Lists/FSGAE_SalaPrensa_Recursos/Attachments/1/dummy.pdf",
    },
    {
      name: "Fund Fact Sheet",
      link: "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf",
    },
  ],
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
    epf: {
      maximum: 10,
      minimum: 5,
    },
    cash: {
      maximum: 10,
      minimum: 8,
    },
  },
  annualManagementFee: 1.55,
  topUpAmount: {
    cash: {
      maximum: 9999999999999,
      minimum: 500,
    },
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
  },
  newSalesAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 2000,
    },
  },
  fundCurrency: "MYR",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
    benchmark: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
  },
};

// AMP, conventional, EPF
export const SAMPLE_PRODUCT_4: IFund = {
  name: "AMP 2 E",
  issuer: "KENANGA INVESTORS BERHAD",
  documents: [
    {
      name: "Prospectus / Information Memorandum",
      link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "Product Highlight Sheet",
      link: "http://africau.edu/images/default/sample.pdf",
    },
    {
      name: "Annual Report",
      link: "http://www.fundacionsgae.org/Lists/FSGAE_SalaPrensa_Recursos/Attachments/1/dummy.pdf",
    },
    {
      name: "Fund Fact Sheet",
      link: "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf",
    },
  ],
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
    epf: {
      maximum: 10,
      minimum: 5,
    },
    cash: {
      maximum: 10,
      minimum: 8,
    },
  },
  annualManagementFee: 1.55,
  topUpAmount: {
    cash: {
      maximum: 9999999999999,
      minimum: 500,
    },
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
  },
  newSalesAmount: {
    epf: {
      maximum: 9999999999999,
      minimum: 1000,
    },
    cash: {
      maximum: 9999999999999,
      minimum: 2000,
    },
  },
  fundCurrency: "MYR",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
    benchmark: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
  },
};

// UT, conventional,  non-EPF, one time only
export const SAMPLE_PRODUCT_5: IFund = {
  name: "KENANGA ASIAPAC CAPITAL GUARANTEED",
  issuer: "KENANGA INVESTORS BERHAD",
  documents: [
    {
      name: "Prospectus / Information Memorandum",
      link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "Product Highlight Sheet",
      link: "http://africau.edu/images/default/sample.pdf",
    },
    {
      name: "Annual Report",
      link: "http://www.fundacionsgae.org/Lists/FSGAE_SalaPrensa_Recursos/Attachments/1/dummy.pdf",
    },
    {
      name: "Fund Fact Sheet",
      link: "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf",
    },
  ],
  fundType: "UTF",
  riskCategory: "High",
  isEpf: false,
  isShariah: false,
  isScheduled: true,
  fundObjective:
    "The portfolio seeks to deliver potential consistent return through investments in Kenanga Investors Berhad approved money market, fixed income and equities funds. These funds qualified under EPF Member’s Investment Scheme.",
  fundCategory: "CAPITAL GUARANTEED",
  latestFundSize: 5000000,
  salesCharge: {
    epf: {
      maximum: 10,
      minimum: 0,
    },
    cash: {
      maximum: 10,
      minimum: 0,
    },
  },
  annualManagementFee: 1,
  topUpAmount: {
    cash: {
      maximum: 9999999999999,
      minimum: 500,
    },
    epf: {
      maximum: 9999999999999,
      minimum: 500,
    },
  },
  newSalesAmount: {
    cash: {
      maximum: 50000000,
      minimum: 2000,
    },
    epf: {
      maximum: 10000000,
      minimum: 1000,
    },
  },
  fundCurrency: "MYR",
  performanceOverview: "+5.3%",
  performance: {
    details: "60% FTSE Bursa Malaysia 100 Index and 40% Maybank 12-month Fixed Deposit Rate : 140.49",
    nav: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
    benchmark: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
  },
};

// PRS, conventional,  non-EPF, one time only
export const SAMPLE_PRODUCT_6: IFund = {
  name: "KENANGA ONEPRS GROWTH FUND",
  issuer: "KENANGA INVESTORS BERHAD",
  documents: [
    {
      name: "Prospectus / Information Memorandum",
      link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "Product Highlight Sheet",
      link: "http://africau.edu/images/default/sample.pdf",
    },
    {
      name: "Annual Report",
      link: "http://www.fundacionsgae.org/Lists/FSGAE_SalaPrensa_Recursos/Attachments/1/dummy.pdf",
    },
    {
      name: "Fund Fact Sheet",
      link: "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf",
    },
  ],
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
      maximum: 1.5,
    },
  },
  annualManagementFee: 1.55,
  topUpAmount: {
    cash: {
      maximum: 9999999999999,
      minimum: 100,
    },
    epf: {
      maximum: 9999999999999,
      minimum: 500,
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
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
    benchmark: {
      oneMonth: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      sixMonths: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      oneYear: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      threeYears: [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
      fiveYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
      tenYears: [
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
        Math.floor(Math.random() * 101),
      ],
    },
  },
};

export const SAMPLE_PRODUCTS_1: IFund[] = [SAMPLE_PRODUCT_2, SAMPLE_PRODUCT_3, SAMPLE_PRODUCT_4, SAMPLE_PRODUCT_5, SAMPLE_PRODUCT_6];
