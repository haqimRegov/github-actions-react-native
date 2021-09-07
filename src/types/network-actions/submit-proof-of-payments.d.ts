declare interface ISubmitProofOfPayment {
  currency?: TypeCurrency | "";
  paymentMethod?: TypePaymentMethod;
  amount?: string;
  kibBankAccountNumber?: string;
  kibBankAccountName?: string;
  kibBankName?: string;
  transactionDate?: number;
  transactionTime?: number;
  proof?: FileBase64;
  remark?: string;
  checkNumber?: string;
  clientName?: string;
  clientTrustAccountNumber?: string;
  epfAccountNumber?: string;
  epfReferenceNumber?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  recurringType?: string;
  recurringBank?: string;
  frequency?: string;
  bankName?: string;
  referenceNumber?: string;
}

declare interface ISubmitProofOfPaymentOrder {
  orderNumber: string;
  paymentType: TypePaymentType;
  payments: ISubmitProofOfPayment[];
}

declare interface ISubmitProofOfPaymentsRequest {
  orders: ISubmitProofOfPaymentOrder[];
}

declare interface ISubmitProofOfPaymentResultOrder {
  orderNumber: string;
  paymentType: string;
  status: string;
  remarks: string[];
}

declare interface ISubmitProofOfPaymentResultAccount {
  status: string;
  remarks: string[];
}
declare interface ISubmitProofOfPaymentsResult {
  account: ISubmitProofOfPaymentResultAccount;
  orders: ISubmitProofOfPaymentResultOrder[];
  message: string;
  withFloating: boolean;
}
declare type ISubmitProofOfPaymentsResponse = IMutationResponse<ISubmitProofOfPaymentsResult> | undefined;

declare interface ISubmitProofOfPaymentsMutation {
  getReceiptSummaryList: ISubmitProofOfPaymentsResponse;
}
