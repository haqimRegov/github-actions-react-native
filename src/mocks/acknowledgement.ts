export const TERMS_AND_CONDITIONS_MOCK = {
  termsContent:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  joint: true,
};

export const SAMPLE_ORDER_SUMMARY: IOrderSummary[] = [
  {
    date: new Date(),
    funds: [
      {
        fundName: "Kenanga Investment Fund",
        fundIssuer: "Kenanga",
        investmentAmount: "7105",
        fundingOption: "EPF",
        fundType: "UT",
        isShariah: true,
        isEpf: true,
        accountType: "Individual",
        distributionChannel: "Pay to Account",
        fundCurrency: "MYR",
        salesCharge: 1.5,
      },
      {
        fundName: "Kenanga Investment Fund",
        fundIssuer: "Kenanga",
        investmentAmount: "7105",
        fundingOption: "EPF",
        fundType: "PRS",
        isShariah: true,
        isEpf: true,
        accountType: "Individual",
        distributionChannel: "Pay to Account",
        fundCurrency: "MYR",
        salesCharge: 1.5,
      },
    ],
    orderNumber: "O-RI001",
    totalAmount: [
      {
        amount: "7105",
        currency: "MYR",
      },
    ],
  },
  {
    date: new Date(),
    funds: [
      {
        fundName: "Kenanga Investment Fund",
        fundIssuer: "Kenanga",
        investmentAmount: "7105",
        fundingOption: "EPF",
        fundType: "UT",
        isShariah: true,
        isEpf: true,
        accountType: "Individual",
        distributionChannel: "Pay to Account",
        fundCurrency: "MYR",
        salesCharge: 1.5,
      },
      {
        fundName: "Kenanga Investment Fund",
        fundIssuer: "Kenanga",
        investmentAmount: "7105",
        fundingOption: "EPF",
        fundType: "UT",
        isShariah: true,
        isEpf: true,
        accountType: "Individual",
        distributionChannel: "Pay to Account",
        fundCurrency: "MYR",
        salesCharge: 1.5,
      },
    ],
    orderNumber: "O-EI002",
    totalAmount: [
      {
        amount: "7105",
        currency: "MYR",
      },
      {
        amount: "7105",
        currency: "AUD",
      },
    ],
  },
];
