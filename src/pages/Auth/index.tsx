import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

import { LoginBackground } from "../../components";
import { getStorageData } from "../../integrations";
import { ForgotPassword } from "./ForgotPassword";
import { Login } from "./Login";
import { Registration } from "./Registration";

interface LoginPageProps {
  navigation: IStackNavigationProp;
}

export const AuthPage: FunctionComponent<LoginPageProps> = ({ navigation }: LoginPageProps) => {
  const [page, setPage] = useState<TypeLoginPages | undefined>(undefined);
  const [passwordRecovery, setPasswordRecovery] = useState<boolean>(false);

  const handleVisited = async () => {
    const visited = await getStorageData("visited");
    if (!visited) {
      return setPage("FIRST_TIME_LOGIN");
    }
    return setPage("LOGIN");
  };

  useEffect(() => {
    handleVisited();
  }, []);

  let content = <View />;

  if (page === "FIRST_TIME_LOGIN") {
    content = <Registration setRootPage={setPage} setPasswordRecovery={setPasswordRecovery} />;
  }

  if (page === "LOGIN" || page === "LOCKED_ACCOUNT" || page === "LOCKED_PASSWORD" || page === "EXPIRED_PASSWORD") {
    content = <Login navigation={navigation} page={page} passwordRecovery={passwordRecovery} setRootPage={setPage} />;
  }

  if (page === "PASSWORD_RECOVERY") {
    content = <ForgotPassword setRootPage={setPage} setPasswordRecovery={setPasswordRecovery} />;
  }

  return <LoginBackground>{content}</LoginBackground>;
};
