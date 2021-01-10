export const TERMS_AND_CONDITIONS_MOCK = {
  termsContent:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  joint: true,
};

export const SAMPLE_PAYMENT: IPurchaseSummaryState = {
  grandTotal: [
    {
      currency: "MYR",
      amount: "12500.00",
    },
    {
      currency: "AUD",
      amount: "3000.00",
    },
  ],
  orders: [
    {
      orderNumber: "20AA0520",
      orderDate: "24/12/2020",
      paymentType: "Cash",
      orderTotalAmount: [
        {
          currency: "MYR",
          amount: "1000.00",
        },
        {
          currency: "AUD",
          amount: "1000.00",
        },
      ],

      investments: [
        {
          fundId: "0",
          fundingOption: "CASH",
          accountType: "INDIVIDUAL",
          distributionInstruction: "Re-Invest",
          fundCode: "0",
          fundClass: null,
          fundCurrency: "MYR",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA BLUE FUND",
          fundType: "UTF",
          investmentAmount: "1000.00",
          fundProcessingGroup: "LOCAL",
          isEpf: false,
          isSyariah: false,
          salesCharge: "3.0",
          isScheduled: false,
          scheduledInvestmentAmount: "",
          scheduledSalesCharge: "",
          isFea: false,
        },
        {
          fundId: "00",
          fundingOption: "CASH",
          accountType: "INDIVIDUAL",
          distributionInstruction: "Re-Invest",
          fundCode: "00",
          fundClass: null,
          fundCurrency: "AUD",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA GREEN FUND",
          fundType: "UTF",
          investmentAmount: "1000.00",
          fundProcessingGroup: "LOCAL",
          isEpf: false,
          isSyariah: false,
          salesCharge: "3.0",
          isScheduled: false,
          scheduledInvestmentAmount: "",
          scheduledSalesCharge: "",
          isFea: false,
        },
      ],
      payments: [],
    },
    {
      orderNumber: "20AA0529",
      orderDate: "24/12/2020",
      paymentType: "Cash",
      orderTotalAmount: [
        {
          currency: "MYR",
          amount: "6500.00",
        },
        {
          currency: "AUD",
          amount: "2000.00",
        },
      ],

      investments: [
        {
          fundId: "1",
          fundingOption: "CASH",
          accountType: "INDIVIDUAL",
          distributionInstruction: "Re-Invest",
          fundCode: "5",
          fundClass: null,
          fundCurrency: "MYR",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA BLUE CHIP FUND",
          fundType: "UTF",
          investmentAmount: "5500.00",
          fundProcessingGroup: "LOCAL",
          isEpf: true,
          isSyariah: false,
          salesCharge: "3.0",
          isScheduled: true,
          scheduledInvestmentAmount: "1000.00",
          scheduledSalesCharge: "3.0",
          isFea: false,
        },
        {
          fundId: "2",
          fundingOption: "CASH",
          accountType: "INDIVIDUAL",
          distributionInstruction: "Re-Invest",
          fundCode: "3",
          fundClass: "Hedged",
          fundCurrency: "AUD",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA DIVERSIFIED FUND",
          fundType: "UTF",
          investmentAmount: "2000.00",
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
      payments: [],
    },
    {
      orderNumber: "20AA0531",
      orderDate: "24/12/2020",
      paymentType: "EPF",
      orderTotalAmount: [
        {
          currency: "MYR",
          amount: "5000.00",
        },
      ],
      investments: [
        {
          fundId: "3",
          fundingOption: "EPF",
          accountType: "INDIVIDUAL",
          distributionInstruction: "Reinvest",
          fundCode: "2",
          fundClass: null,
          fundCurrency: "MYR",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA INDEX FUND",
          fundType: "UTF",
          investmentAmount: "1000.00",
          fundProcessingGroup: "LOCAL",
          isEpf: true,
          isSyariah: true,
          salesCharge: "6.5",
          isScheduled: false,
          scheduledInvestmentAmount: null,
          scheduledSalesCharge: null,
          isFea: false,
        },
      ],
      payments: [],
    },
    {
      orderNumber: "20AA0529Z",
      orderDate: "24/12/2020",
      paymentType: "Recurring",
      orderTotalAmount: [
        {
          currency: "MYR",
          amount: "1000.00",
        },
      ],
      investments: [
        {
          fundId: "1",
          fundingOption: "CASH",
          accountType: "INDIVIDUAL",
          distributionInstruction: "Re-Invest",
          fundCode: "5",
          fundClass: null,
          fundCurrency: "MYR",
          fundIssuer: "KENANGA INVESTORS BERHAD",
          fundName: "KENANGA BLUE CHIP FUND",
          fundType: "UTF",
          investmentAmount: "5500.00",
          fundProcessingGroup: "LOCAL",
          isEpf: true,
          isSyariah: false,
          salesCharge: "3.0",
          isScheduled: true,
          scheduledInvestmentAmount: "1000.00",
          scheduledSalesCharge: "3.0",
          isFea: false,
        },
      ],
      payments: [
        // { bankAccountName: "Test", bankAccountNumber: "123", recurringType: "FPX", recurringBank: "Public Bank", frequency: "15th" },
      ],
    },
  ],
};
