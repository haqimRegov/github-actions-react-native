declare interface PdfWithSignature {
  active?: boolean;
  adviserSignature: string;
  completed?: boolean;
  jointSignature?: string;
  orderNo: string;
  pdf: FileBase64;
  principalSignature: string;
}

declare interface PdfWithIndex {
  index: number;
  pdf: FileBase64;
}

declare interface IOnboardingReceiptState {
  name?: string;
  orderNumber?: string;
  isScheduled?: string;
  isEpf?: string;
  fundType?: string;
  fundCount?: string;
  orderTotalAmount?: IOrderTotalAmount[];

  url?: string;
  urlPageCount?: string;
  pdf?: FileBase64;
  signedPdf?: FileBase64;
  adviserSignature?: FileBase64;
  principalSignature?: FileBase64;
  jointSignature?: FileBase64;

  completed?: boolean;
}
