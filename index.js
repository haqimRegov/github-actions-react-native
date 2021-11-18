import "react-native-get-random-values";

import Amplify from "aws-amplify";
import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";

import { name as appName } from "./app.json";
import config from "./aws-exports";
import { App } from "./src/App";
import { cognitoConfig, storageConfig } from "./src/constants";
import { RNPushNotification } from "./src/integrations";
import { store } from "./src/store";

Amplify.configure({
  ...config,
  ...cognitoConfig,
  Storage: {
    AWSS3: {
      ...storageConfig,
    },
  },
});

RNPushNotification.configure();

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootApp);
