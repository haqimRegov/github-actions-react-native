import { environment } from "../../../package.json";

export const config = {
  dev: {
    aws_cognito_region: "ap-southeast-1",
    aws_user_pools_id: "ap-southeast-1_AWYEhim4C",
    aws_user_pools_web_client_id: "2gemjbqdmba9av5i7n8nkdnam9",
    aws_cognito_identity_pool_id: "ap-southeast-1:15dbb055-d600-4daa-92b0-d8cce48142fc",
  },
  prod: {
    aws_cognito_region: "ap-southeast-1",
    aws_user_pools_id: "ap-southeast-1_s2c3blvNX",
    aws_user_pools_web_client_id: "4vvcjpikvccuomsa63rj2tlopl",
    aws_cognito_identity_pool_id: "ap-southeast-1:f3fa5b0d-0e78-4fb0-8a94-0d2d4f5cf754",
  },
  sit: {
    aws_cognito_region: "ap-southeast-1",
    aws_user_pools_id: "ap-southeast-1_EOa6qSu6R",
    aws_user_pools_web_client_id: "3objln3im1icdndh1qui7v7i29",
    aws_cognito_identity_pool_id: "ap-southeast-1:2d1e3a4b-2f0a-4ed0-bffc-fa81999080f7",
  },
  uat: {
    aws_cognito_region: "ap-southeast-1",
    aws_user_pools_id: "ap-southeast-1_gJWaEtZ9a",
    aws_user_pools_web_client_id: "4imb1b14vdh2cg1e4pqlfdl76j",
    aws_cognito_identity_pool_id: "ap-southeast-1:40270a5a-3d03-4f75-95f1-c24dbce00232",
  },
};

export const cognitoConfig = config[environment];
