import { environment } from "../../../package.json";

const config = {
  dev: {
    bucket: "test-omni-documents",
    region: "ap-southeast-1",
  },
  prod: {
    bucket: "omni-documents-prod",
    region: "ap-southeast-1",
  },
  sit: {
    bucket: "omni-documents-sit",
    region: "ap-southeast-1",
  },
  staging: {
    bucket: "omni-documents-staging",
    region: "ap-southeast-1",
  },
  uat: {
    bucket: "omni-documents-uat",
    region: "ap-southeast-1",
  },
};

export const storageConfig = config[environment];
