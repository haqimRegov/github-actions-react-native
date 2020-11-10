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
