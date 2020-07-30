import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { LoginBackground } from "../../components";
import { getStorageData } from "../../integrations";
import { FirstTimeLogin } from "./FirstTime";
import { NormalLogin } from "./Login";
import { PasswordRecovery } from "./PasswordRecovery";

interface LoginPageProps {
  navigation: IStackNavigationProp;
}

export const LoginPage = ({ navigation }: LoginPageProps) => {
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
    content = <FirstTimeLogin setRootPage={setPage} setPasswordRecovery={setPasswordRecovery} />;
  }

  if (page === "LOGIN") {
    content = <NormalLogin navigation={navigation} passwordRecovery={passwordRecovery} setRootPage={setPage} />;
  }

  if (page === "PASSWORD_RECOVERY") {
    content = <PasswordRecovery setRootPage={setPage} setPasswordRecovery={setPasswordRecovery} />;
  }

  return <LoginBackground>{content}</LoginBackground>;
};
