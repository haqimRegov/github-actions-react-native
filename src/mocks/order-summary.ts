export const TERMS_AND_CONDITIONS_MOCK = {
  termsContent:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  joint: true,
};

export const SAMPLE_ORDERS: IInvestmentSummary = {
  grandTotal: [
    {
      currency: "MYR",
      amount: "10500.0",
    },
    {
      currency: "AUD",
      amount: "2000.0",
    },
  ],
  orders: [
    {
      orderNumber: "20AA0529",
      orderDate: "22/06/2020",
      orderTotalAmount: [
        {
          currency: "MYR",
          amount: "5500.0",
        },
        {
          currency: "AUD",
          amount: "2000.0",
        },
      ],
      investments: [
        {
          fundingOption: "EPF",
          accountType: "INDIVIDUAL",
          distributionInstruction: "REINVEST",
          fundCode: "5",
          fundClass: null,
          fundCurrency: "MYR",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA BLUE CHIP FUND",
          fundType: "UTF",
          investmentAmount: "5500.0",
          fundProcessingGroup: "LOCAL",
          isEpf: true,
          isSyariah: false,
          salesCharge: "3.0",
          isScheduled: false,
          scheduledInvestmentAmount: null,
          scheduledSalesCharge: "0.0",
          isFea: false,
        },
        {
          fundingOption: "EPF",
          accountType: "INDIVIDUAL",
          distributionInstruction: "REINVEST",
          fundCode: "3",
          fundClass: "Hedged",
          fundCurrency: "AUD",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA DIVERSIFIED FUND",
          fundType: "UTF",
          investmentAmount: "2000.0",
          fundProcessingGroup: "LOCAL",
          isEpf: true,
          isSyariah: false,
          salesCharge: "3.0",
          isScheduled: false,
          scheduledInvestmentAmount: null,
          scheduledSalesCharge: "0.0",
          isFea: false,
        },
      ],
    },
    {
      orderNumber: "20AA0530",
      orderDate: "22/06/2020",
      orderTotalAmount: [
        {
          currency: "MYR",
          amount: "5000.0",
        },
      ],
      investments: [
        {
          fundingOption: "CASH",
          accountType: "INDIVIDUAL",
          distributionInstruction: "PAYOUT",
          fundCode: "2",
          fundClass: null,
          fundCurrency: "MYR",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA SHARIAH BALANCED FUND",
          fundType: "UTF",
          investmentAmount: "5000.0",
          fundProcessingGroup: "LOCAL",
          isEpf: false,
          isSyariah: true,
          salesCharge: "6.5",
          isScheduled: true,
          scheduledInvestmentAmount: "100.0",
          scheduledSalesCharge: "6.5",
          isFea: false,
        },
      ],
    },
  ],
};
