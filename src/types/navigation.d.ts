declare type RootNavigatorType = {
  Auth: undefined;
  Dashboard: undefined;
  Logout: undefined;
  Onboarding: undefined;
};

declare type PrivateNavigatorType = {
  Dashboard: undefined;
  Logout: undefined;
  Onboarding: undefined;
  Public: undefined;
};

declare type PublicNavigatorType = {
  Auth: undefined;
  Private: undefined;
};

declare type IStackNavigationProp = import("@react-navigation/stack").StackNavigationProp<PrivateNavigatorType>;

declare type TypeLoginPages =
  | "LOGIN"
  | "PASSWORD_RECOVERY"
  | "FIRST_TIME_LOGIN"
  | "LOCKED_ACCOUNT"
  | "LOCKED_PASSWORD"
  | "EXPIRED_PASSWORD";
