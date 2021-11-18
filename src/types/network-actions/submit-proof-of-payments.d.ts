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
  submitProofOfPayments: ISubmitProofOfPaymentsResponse;
}
