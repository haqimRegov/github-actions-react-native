import { CommonActions } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { Fragment, useState } from "react";
import { ActivityIndicator, Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import { Prompt, RNModal } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_OTP_COOL_OFF, DICTIONARY_OTP_EXPIRY, ERROR_CODE } from "../../data/dictionary";
import { updateStorageData } from "../../integrations";
import { SAMPLE_AGENT } from "../../mocks";
import { login, resendLockOtp, verifyLockOtp } from "../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import { centerHV, colorWhite, fullHeight, fullHW } from "../../styles";
import { Encrypt, maskedString } from "../../utils";
import { LoginDetails, OTPDetails } from "./Details";

const { LOGIN } = Language.PAGE;

interface LoginProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
  page: TypeLoginPages;
  passwordRecovery?: boolean;
  setRootPage: (page: TypeLoginPages) => void;
}

const LoginComponent = ({ addGlobal, navigation, page, passwordRecovery, setRootPage }: LoginProps) => {
  const [inputNRIC, setInputNRIC] = useState<string>("");
  const [inputOTP, setInputOTP] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [recoveryEmail, setRecoveryEmail] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [lockPrompt, setLockPrompt] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(DICTIONARY_OTP_EXPIRY);
  const handleForgotPassword = () => {
    setRootPage("PASSWORD_RECOVERY");
  };

  const handleEnterOTP = () => {
    setRootPage("LOCKED_ACCOUNT");
    setLoading(false);
    setLockPrompt(false);
  };
  const handleLogin = async () => {
    // TODO deviceToken is only available for real devices
    // const uniqueId = DeviceInfo.getUniqueId();
    Keyboard.dismiss();
    setLockPrompt(false);
    setLoading(true);
    setErrorMessage(undefined);
    const credentials = await Auth.Credentials.get();
    const encryptedPassword = await Encrypt(inputPassword, credentials.sessionToken);
    setLoading(true);
    const response: ILoginResponse = await login(
      { username: inputNRIC, password: encryptedPassword },
      { encryptionKey: credentials.sessionToken },
    );
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null) {
        if (data !== null) {
          const { name, licenseCode, licenseType, email, agentId } = data.result;
          await Auth.signIn(inputNRIC, inputPassword);
          addGlobal({
            agent: { name: name, email: email, licenseCode: licenseCode, licenseType: licenseType, id: agentId, image: SAMPLE_AGENT.image },
            config: {
              identityId: data.result.identityId,
              secretAccessKey: data.result.secretAccessKey,
              sessionToken: data.result.sessionToken,
              accessKeyId: data.result.accessKeyId,
            },
          });
          setLoading(false);
          await updateStorageData("visited", true);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Dashboard" }],
            }),
          );
        }
      } else if (error.errorCode === ERROR_CODE.lockedAccount) {
        if (data?.result.email !== undefined) {
          setLockPrompt(true);
          setRecoveryEmail(maskedString(data?.result.email, 0, 4));
        }
      } else {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
    return undefined;
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setErrorMessage(undefined);
    const response: IVerifyLockOTPResponse = await verifyLockOtp({ nric: inputNRIC, code: inputOTP });
    if (response === undefined) {
      // TODO temporary
      setLoading(false);
      return;
    }
    setLoading(false);
    const { data, error } = response;
    if (error === null) {
      if (data !== null) {
        if (data?.result.status === true) {
          setInputNRIC("");
          setInputPassword("");
          setInputOTP("");
          setRecoveryEmail(undefined);
          setRootPage("LOGIN");
        }
      }
    } else {
      if (error.errorCode === ERROR_CODE.otpAttempt) {
        setResendTimer(DICTIONARY_OTP_COOL_OFF);
      }
      setErrorMessage(error.message);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setErrorMessage(undefined);
    const response: IResendLockOTPResponse = await resendLockOtp({ nric: inputNRIC });
    if (response === undefined) {
      // TODO temporary
      setLoading(false);
      return;
    }
    setLoading(false);
    const { error } = response;
    if (error !== null) {
      if (error.errorCode === ERROR_CODE.otpAttempt) {
        setResendTimer(DICTIONARY_OTP_COOL_OFF);
      }
      setErrorMessage(error.message);
    }
  };

  return (
    <Fragment>
      {recoveryEmail !== undefined && page === "LOCKED_ACCOUNT" ? (
        <OTPDetails
          email={recoveryEmail}
          error={errorMessage}
          handleResend={handleResend}
          handleSubmit={handleVerifyOTP}
          inputOTP={inputOTP}
          resendTimer={resendTimer}
          setError={setErrorMessage}
          setInputOTP={setInputOTP}
          setResendTimer={setResendTimer}
        />
      ) : (
        <LoginDetails
          errorMessage={errorMessage}
          handleForgotPassword={handleForgotPassword}
          handleLogin={handleLogin}
          inputNRIC={inputNRIC}
          inputPassword={inputPassword}
          passwordRecovery={passwordRecovery}
          setInputNRIC={setInputNRIC}
          setInputPassword={setInputPassword}
        />
      )}
      <RNModal animationType="fade" visible={loading}>
        <Fragment>
          {lockPrompt ? (
            <View style={{ ...centerHV, ...fullHW }}>
              <Prompt
                labelContinue={LOGIN.BUTTON_ENTER}
                handleContinue={handleEnterOTP}
                illustration={LocalAssets.illustration.loginError}
                label={LOGIN.LABEL_LOCKED_ACCOUNT}
                title={LOGIN.TITLE_LOCKED_ACCOUNT}
              />
            </View>
          ) : (
            <View style={{ ...fullHeight, ...centerHV }}>
              <ActivityIndicator color={colorWhite._1} size="small" />
            </View>
          )}
        </Fragment>
      </RNModal>
    </Fragment>
  );
};

export const Login = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(LoginComponent);
