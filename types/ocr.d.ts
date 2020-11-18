declare interface IOCRError {
  code: string;
  message: string;
}

declare interface IOCRNricData {
  address?: string;
  city?: string;
  country?: string;
  dateOfBirth?: Date;
  error?: IOCRError;
  gender?: string;
  idNumber?: string;
  name?: string;
  placeOfBirth?: string;
  postCode?: string;
  state?: string;
}
