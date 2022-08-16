declare interface ISubmitProofOfPayment {
  amount?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankName?: string;
  checkNumber?: string;
  clientName?: string;
  clientTrustAccountNumber?: string;
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
  transactionDate?: number;
  transactionTime?: number;
}

declare interface ISubmitProofOfPaymentOrder {
  orderNumber: string;
  paymentType: TypePaymentType;
  payments: ISubmitProofOfPayment[];
}

declare interface ISubmitProofOfPaymentsRequest {
  orders: ISubmitProofOfPaymentOrder[];
}

declare interface ISubmitProofOfPaymentResultOrder extends ISubmissionSummaryResponse {
  excessAmount: IOrderAmount[];
  orderNumber: string;
  totalRecurring: string;
  paymentType: string;
  remarks: string[];
  status: string;
  totalPayment: IOrderAmount[];
}

declare interface ISubmitProofOfPaymentResultAccount {
  status: string;
  remarks: string[];
}

declare interface ISubmitProofOfPaymentsResult {
  account: ISubmitProofOfPaymentResultAccount[];
  message: string;
  orders: ISubmitProofOfPaymentResultOrder[];
  txRef: string;
  withFloating: boolean;
  withHardcopy: boolean;
}

declare type ISubmitProofOfPaymentsResponse = IMutationResponse<ISubmitProofOfPaymentsResult> | undefined;

declare interface ISubmitProofOfPaymentsMutation {
  submitProofOfPayments: ISubmitProofOfPaymentsResponse;
}
