declare type RootNavigatorType = {
  Auth: undefined;
  Dashboard: undefined;
  Logout: undefined;
  Onboarding: undefined;
};

declare type IStackNavigationProp = import("@react-navigation/stack").StackNavigationProp<RootNavigatorType>;

declare type TypeLoginPages = "LOGIN" | "PASSWORD_RECOVERY" | "FIRST_TIME_LOGIN" | "LOCKED_ACCOUNT";
