import { IOrderSummary } from "../../types/order-summary";

export const TERMS_AND_CONDITIONS_MOCK = {
  termsContent:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  joint: true,
};

export const ORDER_SUMMARY_MOCKS: IOrderSummary[] = [
  {
    date: "22/06/2020",
    funds: [
      {
        fundName: "Kenanga Investment Fund",
        fundIssuer: "Kenanga",
        amount: 7105,
        accountFund: "EPF",
        fundType: "UT",
        shariah: "Yes",
        epf: "Yes",
        accountType: "Individual",
        channel: "Pay to Account",
        currency: "MYR",
        salesCharge: "1.5%",
      },
      {
        fundName: "Kenanga Investment Fund",
        fundIssuer: "Kenanga",
        amount: 7105,
        accountFund: "EPF",
        fundType: "UT",
        shariah: "Yes",
        epf: "Yes",
        accountType: "Individual",
        channel: "Pay to Account",
        currency: "MYR",
        salesCharge: "1.5%",
      },
    ],
    orderNo: "O-RI001",
    totalAmount: 7105,
  },
  {
    date: "23/06/2020",
    funds: [
      {
        fundName: "Kenanga Investment Fund",
        fundIssuer: "Kenanga",
        amount: 7105,
        accountFund: "EPF",
        fundType: "UT",
        shariah: "Yes",
        epf: "Yes",
        accountType: "Individual",
        channel: "Pay to Account",
        currency: "MYR",
        salesCharge: "1.5%",
      },
      {
        fundName: "Kenanga Investment Fund",
        fundIssuer: "Kenanga",
        amount: 7105,
        accountFund: "EPF",
        fundType: "UT",
        shariah: "Yes",
        epf: "Yes",
        accountType: "Individual",
        channel: "Pay to Account",
        currency: "MYR",
        salesCharge: "1.5%",
      },
    ],
    orderNo: "O-EI002",
    totalAmount: 7105,
  },
];
