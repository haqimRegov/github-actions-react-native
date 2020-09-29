declare interface PdfWithSignature {
  orderNo: string;
  pdf: FileBase64;
  adviserSignature: string;
  clientSignature: string;
  jointSignature?: string;
}

declare interface PdfWithIndex {
  index: number;
  pdf: FileBase64;
}
