import { CommonActions } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { Fragment, FunctionComponent, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, View } from "react-native";
import { isEmulator } from "react-native-device-info";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/LocalAssets";
import { Prompt, RNModal } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_OTP_COOL_OFF, DICTIONARY_OTP_EXPIRY, ERROR_CODE, ERRORS } from "../../data/dictionary";
import { RNFirebase, RNPushNotification, updateStorageData } from "../../integrations";
import { login, resendLockOtp, resetPassword, verifyLockOtp } from "../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import { centerHV, colorWhite, fullHeight, fullHW } from "../../styles";
import { Encrypt, maskedString } from "../../utils";
import { LoginDetails, OTPDetails, PasswordDetails } from "./Details";

const { LOGIN } = Language.PAGE;

interface LoginProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
  page: TypeLoginPages;
  passwordRecovery?: boolean;
  setRootPage: (page: TypeLoginPages) => void;
}

const LoginComponent: FunctionComponent<LoginProps> = ({ navigation, page, passwordRecovery, setRootPage, ...props }: LoginProps) => {
  const [inputNRIC, setInputNRIC] = useState<string>("");
  const [inputOTP, setInputOTP] = useState<string>("");
  const [recoveryEmail, setRecoveryEmail] = useState<string | undefined>(undefined);
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputNewPassword, setInputNewPassword] = useState<string>("");
  const [inputRetypePassword, setInputRetypePassword] = useState<string>("");
  const [input1Error, setInput1Error] = useState<string | undefined>(undefined);
  const [input2Error, setInput2Error] = useState<string | undefined>(undefined);
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
    const checkEmulator = await isEmulator();
    const token = await RNFirebase.getToken();
    const deviceToken = checkEmulator === true ? {} : { deviceToken: token };
    Keyboard.dismiss();
    setLockPrompt(false);
    setLoading(true);
    setInput1Error(undefined);
    const credentials = await Auth.Credentials.get();

    if ("sessionToken" in credentials === false) {
      setLoading(false);
      setTimeout(() => {
        return Alert.alert(ERRORS.network.message);
      }, 100);
    }

    const encryptedPassword = await Encrypt(inputPassword, credentials.sessionToken);
    setLoading(true);
    const request = { username: inputNRIC, password: encryptedPassword };
    const header = { encryptionKey: credentials.sessionToken, ...deviceToken };
    // eslint-disable-next-line no-console
    console.log("login request", request);
    // eslint-disable-next-line no-console
    console.log("login header", header);
    const response: ILoginResponse = await login(request, header);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null) {
        if (data !== null) {
          const { agentId, branch, email, inboxCount, licenseCode, licenseType, name, rank } = data.result;
          await Auth.signIn(inputNRIC, inputPassword);
          props.addGlobal({
            agent: {
              name: name,
              email: email,
              licenseCode: licenseCode,
              licenseType: licenseType,
              id: agentId,
              branch: branch,
              rank: rank,
            },
            config: {
              identityId: data.result.identityId,
              secretAccessKey: data.result.secretAccessKey,
              sessionToken: data.result.sessionToken,
              accessKeyId: data.result.accessKeyId,
            },
            unreadMessages: inboxCount,
          });
          setLoading(false);
          RNPushNotification.setBadge(inboxCount);
          await updateStorageData("visited", true);
          if (checkEmulator === false) {
            RNPushNotification.requestPermission();
          }
          props.resetTransactions();
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
        setInput1Error(error.message);
        setLoading(false);
      }
    }
    return undefined;
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setInput1Error(undefined);
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
          setInputPassword("");
          setInputOTP("");
          setRecoveryEmail(undefined);
          setRootPage("LOCKED_PASSWORD");
        }
      }
    } else {
      if (error.errorCode === ERROR_CODE.otpAttempt) {
        setResendTimer(DICTIONARY_OTP_COOL_OFF);
      }
      setInput1Error(error.message);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setInput1Error(undefined);
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
      setInput1Error(error.message);
    }
  };

  const handelNewPassword = async () => {
    setLoading(true);
    setInput2Error(undefined);
    const credentials = await Auth.Credentials.get();
    const encryptedNewPassword = await Encrypt(inputNewPassword, credentials.sessionToken);
    const encryptedRetypePassword = await Encrypt(inputRetypePassword, credentials.sessionToken);
    const response: ISignUpResponse = await resetPassword(
      {
        username: inputNRIC,
        password: encryptedNewPassword,
        confirmPassword: encryptedRetypePassword,
      },
      { encryptionKey: credentials.sessionToken },
    );
    setLoading(false);
    if (response === undefined) {
      // TODO temporary
      return;
    }
    const { data, error } = response;
    if (error === null) {
      if (data?.result.status === true) {
        setInputNRIC("");
        setInputNewPassword("");
        setInputRetypePassword("");
        setRootPage("LOGIN");
      }
    } else {
      setInput2Error(error.message);
    }
  };

  let content: JSX.Element = <View />;

  switch (page) {
    case "LOCKED_ACCOUNT":
      content = (
        <OTPDetails
          email={recoveryEmail!}
          error={input1Error}
          handleResend={handleResend}
          handleSubmit={handleVerifyOTP}
          inputOTP={inputOTP}
          resendTimer={resendTimer}
          setError={setInput1Error}
          setInputOTP={setInputOTP}
          setResendTimer={setResendTimer}
        />
      );
      break;
    case "LOCKED_PASSWORD":
      content = (
        <PasswordDetails
          error1={input1Error}
          error2={input2Error}
          handleSubmit={handelNewPassword}
          inputNewPassword={inputNewPassword}
          inputRetypePassword={inputRetypePassword}
          setError1={setInput1Error}
          setError2={setInput2Error}
          setInputNewPassword={setInputNewPassword}
          setInputRetypePassword={setInputRetypePassword}
        />
      );
      break;
    case "LOGIN":
      content = (
        <LoginDetails
          errorMessage={input1Error}
          handleForgotPassword={handleForgotPassword}
          handleLogin={handleLogin}
          inputNRIC={inputNRIC}
          inputPassword={inputPassword}
          passwordRecovery={passwordRecovery}
          setInputNRIC={setInputNRIC}
          setInputPassword={setInputPassword}
        />
      );
      break;

    default:
      break;
  }

  return (
    <Fragment>
      {content}
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
