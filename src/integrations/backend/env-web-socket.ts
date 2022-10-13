import { environment } from "../../../package.json";

interface IWebSocketConfig {
  apiKey: string;
  stage: "dev" | "uat" | "staging" | "prod";
  url: string;
}

const webSocketConfig = {
  dev: {
    apiKey: "abc",
    stage: "dev",
    url: "x27xhz7bdf.execute-api.ap-southeast-1.amazonaws.com",
  },
  prod: {
    apiKey: "abc",
    stage: "prod",
    url: "w7sx4ckaba.execute-api.ap-southeast-1.amazonaws.com",
  },
  sit: {
    apiKey: "abc",
    stage: "dev",
    url: "x27xhz7bdf.execute-api.ap-southeast-1.amazonaws.com",
  },
  staging: {
    apiKey: "abc",
    stage: "prod",
    url: "kuid6ukot0.execute-api.ap-southeast-1.amazonaws.com",
  },
  uat: {
    apiKey: "abc",
    stage: "uat",
    url: "49stzol3r0.execute-api.ap-southeast-1.amazonaws.com",
  },
};

export const WEB_SOCKET_CONFIG: IWebSocketConfig = webSocketConfig[environment];
