declare type RootNavigatorType = {
  AddClient: undefined;
  Dashboard: undefined;
  Login: undefined;
  Onboarding: undefined;
};

declare type IStackNavigationProp = import("@react-navigation/stack").StackNavigationProp<RootNavigatorType>;

declare type TypeLoginPages = "LOGIN" | "PASSWORD_RECOVERY" | "FIRST_TIME_LOGIN";
