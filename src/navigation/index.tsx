import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent } from "react";

import { PrivateRoute } from "./Private";
import { PublicRoute } from "./Public";

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator: FunctionComponent = () => {
  const defaultOptions = { animationEnabled: false };

  return (
    <Navigator initialRouteName="Public" headerMode="none">
      <Screen name="Private" component={PrivateRoute} options={defaultOptions} />
      <Screen name="Public" component={PublicRoute} options={defaultOptions} />
    </Navigator>
  );
};
