declare type TypePaymentMethod =
  | "Online Banking / TT / ATM"
  | "Cheque"
  | "Client Trust Account (CTA)"
  | "Cash Deposit Machine"
  | "Recurring"
  | "EPF";

declare type TypePaymentMethodValue = { value: TypePaymentMethod };
declare type TypePaymentMethodLabelValue = { label: string; value: TypePaymentMethod };

declare interface IAmountValueError {
  value: string;
  error?: string;
}

declare type TypePaymentType = "Cash" | "EPF" | "Recurring";

declare interface IFloatingAmount {
  amount: number;
  currency: TypeCurrency;
}

declare interface IPaymentOrderState {
  investments: IOrderInvestment[];
  paymentType: TypePaymentType;
  orderDate: string;
  orderNumber: string;
  epfAccountNumber?: string;
  orderTotalAmount: IOrderAmount[];
  payments: IPaymentState[];

  allowedRecurringType?: string[];
  completed?: boolean;
  floatingAmount?: IFloatingAmount[];
  totalPaidAmount?: IOrderAmount[];
  paymentCount?: number;

  surplusBalance?: IPaymentInfo[];
}

declare interface IPurchaseSummary {
  grandTotal: IOrderAmount[];
  orders: IPaymentOrderState[];
}

declare interface IPurchaseSummaryState {
  grandTotal: IOrderAmount[];
  orders: IPaymentOrderState[];
}

declare interface IGrandTotal {
  grandTotal: IOrderAmount[];
  grandTotalRecurring: IOrderAmount;
}

declare interface IPayment {
  amount?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankName?: string;
  checkNumber?: string;
  clientName?: string;
  clientTrustAccountNumber?: string;
  combinedBankAccountName?: string;
  currency?: TypeCurrency | "";
  epfAccountNumber?: string;
  epfReferenceNumber?: string;
  frequency?: string;
  kibBankAccountName?: string;
  kibBankAccountNumber?: string;
  kibBankName?: string;
  paymentMethod?: TypePaymentMethod;
  proof?: FileBase64;
  recurringBank?: string;
  recurringType?: string;
  referenceNumber?: string;
  remark?: string;
  transactionDate?: Date;
  transactionTime?: Date;
}

declare interface IPaymentState extends IPayment {
  saved?: boolean;
}

declare type TypePaymentInfoActionOption = "update" | "delete";

declare interface IPaymentInfoAction {
  id: string | number;
  option: TypePaymentInfoActionOption;
}

declare interface IEpfReferenceNo {
  amount: string;
  error?: string;
  utmc: string;
  referenceNo: string;
}

declare interface IUtilisedAmount {
  amount: string;
  orderNumber: string;
  paymentId: string;
}

declare interface IPaymentInfo {
  amount: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  checkNumber: string;
  clientName: string;
  clientTrustAccountNumber: string;
  currency: string;
  epfAccountNumber: string;
  epfReferenceNo: IEpfReferenceNo[]; // for FE
  epfReferenceNumber: string; // to submit to BE
  frequency: string;
  kibBankAccountNumber: string;
  kibBankName: string;
  orderNumber: string;
  paymentMethod: TypePaymentMethod;
  paymentType: TypePaymentType; // not in list surplus
  proof: FileBase64 | undefined;
  recurringBank: string;
  recurringType: string;
  referenceNumber: string;
  remark: string | undefined;
  transactionDate: Date | undefined;

  // for surplus, recurring, etc
  action?: IPaymentInfoAction; // action for saved payment
  belongsTo?: string;
  combinedBankAccountName?: string; // not in list surplus
  excess?: IOrderAmount; // excess amount of a payment info
  initialExcess?: IOrderAmount;
  isEditable: boolean | undefined; // saved payment from BE
  isCombined?: boolean; // for Recurring payment to check if the account name is combined
  new: boolean | undefined;
  lastAmountUpdate?: string; // For BE to understand the latest updated POP
  parent: number | string | undefined; // id given to payment info with surplus
  paymentId: string | undefined; // unique id of a payment info
  saved: boolean;
  sharedTo?: string[];
  tag?: { uuid: string; orderNumber?: string }; // if use of surplus, uuid is the parent of the surplus payment info
  usePreviousRecurring?: boolean;
  utilised?: IUtilisedAmount[]; // utilised amount of an available balance
  utmc?: string; // for multiple EPF

  ctaParent: number | string | undefined; // id given to payment info with cta
  ctaTag?: { uuid: string; orderNumber?: string }; // if use of CTA, uuid is the parent of the surplus payment info
  ctaUsedBy?: { uuid: string; orderNumber?: string }[]; // ctaTag of CTA Child
}

declare type TPaymentInfoKey = keyof IPaymentInfo;

declare type TypeCTADetails = Partial<IPaymentInfo>;

declare interface IRecurringInfo {
  bankAccountName: string;
  bankAccountNumber: string;
  frequency: string;
  orderNumber: string;
  recurringBank: string;
}

declare interface IRecurringDetails {
  dda: IRecurringInfo[];
  fpx: IRecurringInfo[];
}

declare interface IPaymentBalance {
  amount: string;
  currency: TypeCurrency;
  id: string;
}

declare interface IPaymentRequired {
  allowedRecurringType: string[];
  // balance: IPaymentBalance[];
  completedSurplusCurrencies?: string[];
  createdOn: string;
  ctaDetails: TypeCTADetails[];
  epfAccountNumber: string | null;
  funds: IOrderInvestment[];
  isLastOrder?: boolean;
  orderNumber: string;
  paymentCount: number;
  paymentType: TypePaymentType;
  recurringDetails?: IRecurringDetails;
  status: string;
  surplusBalance: IPaymentInfo[];
  totalInvestment: IOrderAmount[];
  totalPaidAmount: IOrderAmount[];
  payments: IPaymentInfo[];
}

declare type TypeSetProofOfPaymentMode = "cta" | "surplus" | undefined;

declare interface ISetProofOfPaymentAction {
  paymentId: string;
  option: "update" | "delete";
  mode: TypeSetProofOfPaymentMode;
}
