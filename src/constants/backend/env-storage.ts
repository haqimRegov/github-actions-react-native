import { environment } from "../../../package.json";

const config = {
  dev: {
    bucket: "test-omni-documents",
    region: "ap-southeast-1",
  },
  prod: {
    bucket: "omni-prod-documents",
    region: "ap-southeast-1",
  },
  sit: {
    bucket: "omni-documents-sit",
    region: "ap-southeast-1",
  },
  staging: {
    bucket: "omni-nonprod-documents",
    region: "ap-southeast-1",
  },
  uat: {
    bucket: "omni-documents",
    region: "ap-southeast-1",
  },
};

export const storageConfig = config[environment];
