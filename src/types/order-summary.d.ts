declare interface IFundOrderSummary {
  accountType: string;
  distributionChannel: string;
  fundCode?: string;
  fundCurrency: string;
  fundingOption: string;
  fundIssuer: string;
  fundName: string;
  fundType: string;
  investmentAmount: string;
  isEpf: boolean;
  isShariah: boolean;
  salesCharge: string;
  scheduledPayment?: boolean;
}

declare interface IOrderSummary {
  date: Date;
  funds: IFundOrderSummary[];
  orderNumber: string;
  totalAmount: IOrderTotalAmount[];
}

declare interface IOrderInvestment {
  distributionInstruction: string;
  fundClass: string | null;
  fundCode?: string;
  fundCurrency: string;
  fundId?: string;
  fundingOption: string;
  fundIssuer: string;
  fundName: string;
  fundType: string;
  investmentAmount: string;
  isEpf: boolean;
  isFea: boolean | null;
  isScheduled: boolean;
  isSyariah: boolean;
  isTopup?: boolean;
  landingFund?: string;
  salesCharge: string;
  scheduledInvestmentAmount: string | null;
  scheduledSalesCharge: string | null;
}

declare interface IOrder {
  allowedRecurringType?: string[];
  investments: IOrderInvestment[];
  orderDate: string;
  orderNumber: string;
  orderTotalAmount: IOrderAmount[];
  paymentType: TypePaymentType;
}

declare interface IInvestmentSummary {
  grandTotal: IOrderAmount[];
  grandTotalRecurring?: IOrderAmount;
  orders: IOrder[];
}

declare interface IOrderTotalAmount {
  amount: string;
  currency: TypeCurrency;
}

declare interface IOrderAmount {
  amount: string;
  currency: TypeCurrency;
}

declare interface IInnerDocument {
  label: string;
  name: string;
  title: string;
  type: string;
  url: string;
}

declare interface IOuterDocument {
  documents: IInnerDocument[];
  mainHeader: string;
  subHeader: string;
}

declare interface ISoftcopy {
  documents: IOuterDocument[];
  required: boolean;
}

declare interface IHardcopy {
  accDocs: IOuterDocument[];
  required: boolean;
  utmcDocs: IOuterDocument[];
}

declare interface IDocumentSummary {
  accountType: string;
  hardcopy: IHardcopy;
  softcopy: ISoftcopy;
}

declare interface ITrackingSummary {
  createdOn: string;
  level: string;
  remark: IOuterRemark[];
  status: string;
}

declare interface IOuterRemark {
  label: string;
  remark: string[];
}

declare type IAcknowledgementPage = "OrderPreview" | "TermsAndConditions" | "Signature";
