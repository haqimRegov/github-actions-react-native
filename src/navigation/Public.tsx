import { createStackNavigator } from "@react-navigation/stack";
import React, { Fragment, FunctionComponent } from "react";

import { AuthPage } from "../pages";

const { Navigator, Screen } = createStackNavigator();

export const PublicRoute: FunctionComponent = () => {
  const defaultOptions = { animationEnabled: false };

  return (
    <Fragment>
      <Navigator initialRouteName="Auth" headerMode="none">
        <Screen name="Auth" component={AuthPage} options={defaultOptions} />
      </Navigator>
    </Fragment>
  );
};
