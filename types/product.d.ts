declare interface IProduct {
  epf: string;
  graph: string;
  issuer: string;
  name: string;
  performance: string;
  risk: string;
  shariah: string;
  type: string;
}

declare interface IProductConfirmation extends IProduct {
  accountType: string;
  channel: string;
  currency: string;
  fundMethod: string;
  fundType: string;
  investmentAmount: string;
  salesCharge: string;
  scheduledPayment: string;
}
