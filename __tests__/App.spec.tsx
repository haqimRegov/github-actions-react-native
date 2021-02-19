import "react-native";

import Amplify from "aws-amplify";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import config from "../aws-exports";
import { App } from "../src/App";
import { COGNITO_CONFIG_SIT, RNPushNotification } from "../src/integrations";
import { store } from "../src/store";

global.React = React;
// Note: test renderer must be required after react-native.
it("renders correctly", () => {
  Amplify.configure({ ...config, ...COGNITO_CONFIG_SIT });
  RNPushNotification.configure();

  renderer.create(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
