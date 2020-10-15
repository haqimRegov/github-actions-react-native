import { CommonActions } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { Fragment, useState } from "react";
import { ActivityIndicator, Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import { BasicModal, Prompt } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_OTP_COOL_OFF, DICTIONARY_OTP_EXPIRY, ERROR, ERROR_CODE } from "../../data/dictionary";
import { updateStorageData } from "../../integrations";
import { SAMPLE_AGENT } from "../../mocks";
import { login, resendLockOtp, verifyLockOtp } from "../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import { centerHV, colorWhite, fullHeight } from "../../styles";
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
    try {
      Keyboard.dismiss();
      setLockPrompt(false);
      setLoading(true);
      setErrorMessage(undefined);
      const credentials = await Auth.Credentials.get();
      const encryptedPassword = await Encrypt(inputPassword, credentials.sessionToken);
      const response: ILoginResponse = await login(
        { username: inputNRIC, password: encryptedPassword },
        { encryptionKey: credentials.sessionToken },
      );
      if (response === undefined) {
        // TODO temporary
        setLoading(false);
        return;
      }
      const { data, error } = response;
      if (error === null) {
        if (data !== null) {
          await Auth.signIn(inputNRIC, inputPassword);
          addGlobal({
            agent: { ...SAMPLE_AGENT, email: data.result.email, licenseCode: data.result.licenseCode },
            config: {
              identityId: data.result.identityId,
              secretAccessKey: data.result.secretAccessKey,
              sessionToken: data.result.sessionToken,
              accessKeyId: data.result.accessKeyId,
            },
          });
          await updateStorageData("visited", true);
          setLoading(false);
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
    } catch (error) {
      // TODO temporary
      // eslint-disable-next-line no-console
      console.log("Error in login line 91 at Login.tsx", error);
      setErrorMessage(ERROR.LOGIN_INVALID);
      setLoading(false);
    }
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
      <BasicModal visible={loading}>
        <Fragment>
          {lockPrompt ? (
            <Prompt
              labelContinue={LOGIN.BUTTON_ENTER}
              handleContinue={handleEnterOTP}
              illustration={LocalAssets.illustration.login_error}
              label={LOGIN.LABEL_LOCKED_ACCOUNT}
              title={LOGIN.TITLE_LOCKED_ACCOUNT}
            />
          ) : (
            <View style={{ ...fullHeight, ...centerHV }}>
              <ActivityIndicator color={colorWhite._1} size="small" />
            </View>
          )}
        </Fragment>
      </BasicModal>
    </Fragment>
  );
};

export const Login = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(LoginComponent);
