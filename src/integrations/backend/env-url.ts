import { environment } from "../../../package.json";

interface IS3Url {
  platformAgreement: string;
}

const s3Url = {
  dev: {
    platformAgreement: "https://omni-documents-sit.s3.ap-southeast-1.amazonaws.com/omni-terms-conditions/kenangaPlatformAgreement.pdf",
  },
  prod: {
    platformAgreement: "https://omni-prod-documents.s3.ap-southeast-1.amazonaws.com/terms-and-conditions/kenangaPlatformAgreement.pdf",
  },
  sit: {
    platformAgreement: "https://omni-documents-sit.s3.ap-southeast-1.amazonaws.com/omni-terms-conditions/kenangaPlatformAgreement.pdf",
  },
  staging: {
    platformAgreement: "https://omni-documents-sit.s3.ap-southeast-1.amazonaws.com/omni-terms-conditions/kenangaPlatformAgreement.pdf",
  },
  uat: {
    platformAgreement: "https://omni-documents-sit.s3.ap-southeast-1.amazonaws.com/omni-terms-conditions/kenangaPlatformAgreement.pdf",
  },
};

export const S3_URL: IS3Url = s3Url[environment];
