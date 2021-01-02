interface ISamplePaymentRequest {
  orders: [
    {
      orderNumber: string;
      paymentType: "Cash" | "EPF" | "Recurring";
      payments: [
        {
          amount?: string;
          bankAccountName?: string;
          bankAccountNumber?: string;
          bankName?: string;
          checkNumber?: string;
          clientName?: string;
          clientTrustAccountNumber?: string;
          currency?: string;
          epfAccountNumber?: string;
          epfReferenceNumber?: string;
          frequency?: string;
          kibBankAccountName?: string;
          kibBankAccountNumber?: string;
          paymentMethod?: string;
          proof?: FileBase64;
          recurringBank?: string;
          recurringType?: string;
          remark?: string;
          transactionDate?: Date;
          transactionTime?: Date;
          uploadLater?: boolean;
        },
      ];
    },
  ];
}

export const SAMPLE_PAYMENT_REQUEST: ISamplePaymentRequest = {
  orders: [
    {
      orderNumber: "20AA0529",
      paymentType: "Cash",
      payments: [
        {
          currency: "MYR",
          paymentMethod: "Online Banking",
          amount: "1000.00",
          // kibBankAccountNumber: string;
          // kibBankAccountName: string;
          // transactionDate: Date;
          // transactionTime: Date;
          // proof: FileBase64;
          // remark: string;
          // checkNumber: string;
          // uploadLater: boolean;
          // clientName: string;
          // clientTrustAccountNumber: string;
          // epfAccountNumber: string;
          // epfReferenceNumber: string;
          // bankAccountName: string;
          // bankAccountNumber: string;
          // recurringType: string;
          // recurringBank: string;
          // frequency: string;
          // bankName: string;
        },
      ],
    },
  ],
};
