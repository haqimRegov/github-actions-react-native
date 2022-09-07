import { CommonActions } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { isEmulator } from "react-native-device-info";
import { connect } from "react-redux";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Loading, Prompt, RNModal } from "../../components";
import { Language, OTP_CONFIG } from "../../constants";
import { ERROR_CODE, ERRORS } from "../../data/dictionary";
import { getStorageData, removeStorageData, RNFirebase, RNPushNotification, updateStorageData } from "../../integrations";
import { expiredPassword, login, resendLockOtp, resetPassword, verifyLockOtp } from "../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import { centerHV, colorWhite, fullHeight, fullHW } from "../../styles";
import { AlertDialog, Encrypt, maskedString } from "../../utils";
import { LoginDetails, OTPDetails, PasswordDetails } from "./Details";

const { ACTION_BUTTONS, LOGIN } = Language.PAGE;

interface LoginProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
  page: TypeLoginPages;
  passwordRecovery?: boolean;
  setRootPage: (page: TypeLoginPages) => void;
}

const LoginComponent: FunctionComponent<LoginProps> = ({ navigation, page, passwordRecovery, setRootPage, ...props }: LoginProps) => {
  const fetching = useRef<boolean>(false);
  const [inputNRIC, setInputNRIC] = useState<string>("");
  const [inputOTP, setInputOTP] = useState<string>("");
  const [recoveryEmail, setRecoveryEmail] = useState<string | undefined>(undefined);
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputNewPassword, setInputNewPassword] = useState<string>("");
  const [inputRetypePassword, setInputRetypePassword] = useState<string>("");
  const [input1Error, setInput1Error] = useState<string | undefined>(undefined);
  const [nricInputError, setNricInputError] = useState<string | undefined>(undefined);
  const [input2Error, setInput2Error] = useState<string | undefined>(undefined);
  const [lockPrompt, setLockPrompt] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(OTP_CONFIG.EXPIRY);

  const handleForgotPassword = () => {
    setRootPage("PASSWORD_RECOVERY");
  };

  const handleEnterOTP = () => {
    setRootPage("LOCKED_ACCOUNT");
    setLoading(false);
    setLockPrompt(false);
  };

  const handleDone = () => {
    setShowModal(false);
    setRootPage("LOGIN");
  };

  const handleLogin = async () => {
    try {
      const checkEmulator = await isEmulator();
      const token = await RNFirebase.getToken();
      const deviceToken = checkEmulator === true ? {} : { deviceToken: token };
      Keyboard.dismiss();
      setLoading(true);
      setLockPrompt(false);
      setInput1Error(undefined);
      setNricInputError(undefined);
      const credentials = await Auth.Credentials.get();
      if ("sessionToken" in credentials === false) {
        setLoading(false);
        setTimeout(() => {
          return Alert.alert(ERRORS.network.message);
        }, 100);
      }

      const encryptedPassword = await Encrypt(inputPassword, credentials.sessionToken);
      const hideEvent: string = await getStorageData("hideEvent");
      setLoading(true);
      const request = { username: inputNRIC, password: encryptedPassword, hideEvents: hideEvent };
      const header = { encryptionKey: credentials.sessionToken, ...deviceToken };
      const response: ILoginResponse = await login(request, header, setLoading);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null) {
          if (data !== null) {
            const {
              agentId,
              agentCategory,
              branch,
              email,
              events,
              inboxCount,
              isExpired,
              isMultiUtmc,
              licenseCode,
              licenseType,
              name,
              rank,
            } = data.result;
            await Auth.signIn(inputNRIC, inputPassword);
            if (isExpired === false) {
              props.addGlobal({
                agent: {
                  category: agentCategory as TypeAgentCategory,
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
                events: events && events.length > 0 ? events : undefined,
                isMultiUtmc: isMultiUtmc,
                unreadMessages: inboxCount,
              });
              setLoading(false);
              RNPushNotification.setBadge(inboxCount);
              await updateStorageData("visited", true);
              if (checkEmulator === false) {
                RNPushNotification.requestPermission();
              }
              props.resetTransactions();

              if (hideEvent) {
                await removeStorageData("hideEvent");
              }

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Private" }],
                }),
              );
            } else {
              setLoading(false);
              setRootPage("EXPIRED_PASSWORD");
            }
          }
        } else if (error.errorCode === ERROR_CODE.lockedAccount) {
          if (data?.result.email !== undefined) {
            setLoading(false);
            setLockPrompt(true);
            setRecoveryEmail(maskedString(data?.result.email, 0, 4));
          }
        } else if (error.errorCode === ERROR_CODE.invalidNricFormat) {
          setNricInputError(error.message);
          setLoading(false);
        } else {
          setInput1Error(error.message);
          setLoading(false);
        }
      }
    } catch (error) {
      AlertDialog(ERRORS.internal.message, () => setLoading(false));
    }
  };

  const handleVerifyOTP = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      setInput1Error(undefined);
      const response: IVerifyLockOTPResponse = await verifyLockOtp({ nric: inputNRIC, code: inputOTP }, setLoading);
      fetching.current = false;
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
          setResendTimer(OTP_CONFIG.COOL_OFF);
        }
        setInput1Error(error.message);
      }
    }
  };

  const handleResend = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      setInput1Error(undefined);
      const response: IResendLockOTPResponse = await resendLockOtp({ nric: inputNRIC }, setLoading);
      fetching.current = false;
      if (response === undefined) {
        // TODO temporary
        setLoading(false);
        return;
      }
      setLoading(false);
      const { error } = response;
      if (error !== null) {
        if (error.errorCode === ERROR_CODE.otpAttempt) {
          setResendTimer(OTP_CONFIG.COOL_OFF);
        }
        setInput1Error(error.message);
      }
    }
  };

  const handleNewPassword = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      setInput2Error(undefined);
      const credentials = await Auth.Credentials.get();
      const encryptedNewPassword = await Encrypt(inputNewPassword, credentials.sessionToken);
      const encryptedRetypePassword = await Encrypt(inputRetypePassword, credentials.sessionToken);
      const baseParams = { password: encryptedNewPassword, confirmPassword: encryptedRetypePassword };
      const header = { encryptionKey: credentials.sessionToken };
      const response: ISignUpResponse | IChangePasswordResponse =
        page === "EXPIRED_PASSWORD"
          ? await expiredPassword(baseParams, header, undefined, setLoading)
          : await resetPassword({ ...baseParams, username: inputNRIC }, header, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response === undefined) {
        // TODO temporary
        return;
      }
      const { data, error } = response;
      if (error === null) {
        if (data?.result.status === true) {
          setInputNRIC("");
          setInputPassword("");
          setInputNewPassword("");
          setInputRetypePassword("");
          if (page !== "EXPIRED_PASSWORD") {
            setRootPage("LOGIN");
          } else {
            setShowModal(true);
          }
        }
      } else {
        setInput2Error(error.message);
      }
    }
  };

  let content: JSX.Element = <View />;
  const checkHeading = page === "EXPIRED_PASSWORD" ? LOGIN.LABEL_PASSWORD_EXPIRED : undefined;

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
    case "EXPIRED_PASSWORD":
      content = (
        <PasswordDetails
          error1={input1Error}
          error2={input2Error}
          handleSubmit={handleNewPassword}
          heading={checkHeading}
          inputNewPassword={inputNewPassword}
          inputRetypePassword={inputRetypePassword}
          setError1={setInput1Error}
          setError2={setInput2Error}
          setInputNewPassword={setInputNewPassword}
          setInputRetypePassword={setInputRetypePassword}
          subheading={page === "EXPIRED_PASSWORD" ? LOGIN.SUBHEADING_EXPIRED : undefined}
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
          nricErrorMessage={nricInputError}
          passwordRecovery={passwordRecovery}
          setInputNRIC={setInputNRIC}
          setInputPassword={setInputPassword}
        />
      );
      break;

    default:
      break;
  }

  let modalContent: JSX.Element = <View />;
  if (loading === true) {
    modalContent = <Loading color={colorWhite._1} style={fullHeight} />;
  } else if (lockPrompt) {
    modalContent = (
      <View style={{ ...centerHV, ...fullHW }}>
        <Prompt
          labelContinue={LOGIN.BUTTON_ENTER}
          handleContinue={handleEnterOTP}
          illustration={LocalAssets.illustration.loginError}
          label={LOGIN.LABEL_LOCKED_ACCOUNT}
          title={LOGIN.TITLE_LOCKED_ACCOUNT}
        />
      </View>
    );
  } else if (page === "EXPIRED_PASSWORD" && showModal === true) {
    modalContent = (
      <View style={{ ...centerHV, ...fullHW }}>
        <Prompt
          labelContinue={ACTION_BUTTONS.BUTTON_DONE}
          handleContinue={handleDone}
          illustration={LocalAssets.illustration.passwordUpdated}
          label={LOGIN.LABEL_PASSWORD_UPDATED}
          title={LOGIN.LABEL_PASSWORD_UPDATED_SUBHEADING}
        />
      </View>
    );
  }

  return (
    <Fragment>
      {content}
      <RNModal animationType="fade" visible={loading || lockPrompt || showModal}>
        <Fragment>{modalContent}</Fragment>
      </RNModal>
    </Fragment>
  );
};

export const Login = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(LoginComponent);
