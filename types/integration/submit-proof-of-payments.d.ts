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
}

declare interface ISubmitProofOfPaymentOrder {
  orderNumber: string;
  paymentType: TypePaymentType;
  payments: ISubmitProofOfPayment[];
}

declare interface ISubmitProofOfPaymentsRequest {
  orders: ISubmitProofOfPaymentOrder[];
}

declare interface ISubmitProofOfPaymentsResult {
  account: {
    status: string;
    remarks: string;
  };
  orders: {
    orderNumber: string;
    paymentType: string;
    status: string;
    remarks: string;
  };
  message: string;
}
declare type ISubmitProofOfPaymentsResponse = IMutationResponse<ISubmitProofOfPaymentsResult> | undefined;

declare interface ISubmitProofOfPaymentsMutation {
  getReceiptSummaryList: ISubmitProofOfPaymentsResponse;
}
