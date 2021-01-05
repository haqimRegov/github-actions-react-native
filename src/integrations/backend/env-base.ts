export const env: TypeEnv = "dev";

const api = {
  dev: {
    baseURL: "https://ukrr3zhuxvf27mfbafp3qing6q.appsync-api.ap-southeast-1.amazonaws.com/",
    configBaseURL: "https://4w895f9gak.execute-api.ap-southeast-1.amazonaws.com/",
  },
  sit: {
    baseURL: "https://uvprk3hpcffapibockmwqf5lhi.appsync-api.ap-southeast-1.amazonaws.com/",
    configBaseURL: "https://23tjghyu6e.execute-api.ap-southeast-1.amazonaws.com/",
  },
};

export const { baseURL, configBaseURL } = api[env];

export const X_API_KEY = "nvtORmuuhZ35UzQNhsqs41OfDS7D2UXx22VqlQNK";

// export const COGNITO_CONFIG_DEV = {
//   aws_cognito_region: "ap-southeast-1",
//   aws_user_pools_id: "ap-southeast-1_AWYEhim4C",
//   aws_user_pools_web_client_id: "2gemjbqdmba9av5i7n8nkdnam9",
//   aws_cognito_identity_pool_id: "ap-southeast-1:15dbb055-d600-4daa-92b0-d8cce48142fc",
// };

export const COGNITO_CONFIG = {
  aws_cognito_region: "ap-southeast-1",
  aws_user_pools_id: "ap-southeast-1_EOa6qSu6R",
  aws_user_pools_web_client_id: "3objln3im1icdndh1qui7v7i29",
  aws_cognito_identity_pool_id: "ap-southeast-1:2d1e3a4b-2f0a-4ed0-bffc-fa81999080f7",
};
