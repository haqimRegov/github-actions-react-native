declare interface IDeclarationTaxNumber {
  country: string;
  explanation?: string;
  noTaxIdNumber: boolean;
  reason?: string;
  taxIdNumber: string;
}

declare interface ILossCertificate {
  acknowledgement?: boolean;
  certificate?: FileBase64;
  explanation?: string;
  noCertificate?: boolean;
  reason?: string;
  uploadLater?: boolean;
}
