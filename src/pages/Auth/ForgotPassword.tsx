import { Auth } from "aws-amplify";
import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { Language } from "../../constants";
import { ERROR_CODE } from "../../data/dictionary";
import { OTP_CONFIG } from "../../integrations";
import { forgotPassword, resetPassword, verifyOtp } from "../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../store";
import { Encrypt, maskedString } from "../../utils";
import { NRICDetails, OTPDetails, PasswordDetails } from "./Details";

const { LOGIN } = Language.PAGE;

interface ForgotPasswordProps extends GlobalStoreProps {
  setPasswordRecovery: (value: boolean) => void;
  setRootPage: (page: TypeLoginPages) => void;
}

const ForgotPasswordComponent: FunctionComponent<ForgotPasswordProps> = ({
  setLoading,
  setPasswordRecovery,
  setRootPage,
}: ForgotPasswordProps) => {
  const [email, setEmail] = useState<string>("");
  const [input1Error, setInput1Error] = useState<string | undefined>(undefined);
  const [input2Error, setInput2Error] = useState<string | undefined>(undefined);
  const [inputNRIC, setInputNRIC] = useState<string>("");
  const [inputOTP, setInputOTP] = useState<string>("");
  const [inputNewPassword, setInputNewPassword] = useState<string>("");
  const [inputRetypePassword, setInputRetypePassword] = useState<string>("");
  const [resendTimer, setResendTimer] = useState<number>(OTP_CONFIG.EXPIRY);
  const [page, setPage] = useState<TypePage>("NRIC");

  const handleVerifyOTP = async () => {
    setLoading(true);
    setInput1Error(undefined);
    const response: IVerifySignUpResponse = await verifyOtp({ nric: inputNRIC, code: inputOTP });
    setLoading(false);
    if (response === undefined) {
      // TODO temporary
      return;
    }
    const { data, error } = response;
    if (error === null) {
      if (data?.result.status === true) {
        setPage("PASSWORD");
      }
    } else {
      if (error.errorCode === ERROR_CODE.otpAttempt) {
        setResendTimer(OTP_CONFIG.COOL_OFF);
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
        setRootPage("LOGIN");
        setPasswordRecovery(true);
      }
    } else {
      setInput2Error(error.message);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setInput1Error(undefined);
    const response: IVerifyAgentResponse = await forgotPassword({ nric: inputNRIC });
    setLoading(false);
    if (response === undefined) {
      // TODO temporary
      return;
    }
    const { data, error } = response;
    if (error === null) {
      if (data?.result.status === true) {
        setPage("OTP");
        setEmail(maskedString(data.result.email, 0, 4));
      }
    } else {
      setInput1Error(error.message);
    }
  };

  let content: JSX.Element = <View />;

  switch (page) {
    case "NRIC":
      content = (
        <NRICDetails
          error={input1Error}
          handleSubmit={handleForgotPassword}
          heading={LOGIN.HEADING_RECOVERY}
          inputNRIC={inputNRIC}
          setError={setInput1Error}
          setInputNRIC={setInputNRIC}
          subheading={LOGIN.SUBHEADING_RECOVERY}
        />
      );
      break;
    case "OTP":
      content = (
        <OTPDetails
          email={email}
          error={input1Error}
          handleResend={handleForgotPassword}
          handleSubmit={handleVerifyOTP}
          heading={LOGIN.HEADING_RECOVERY}
          inputOTP={inputOTP}
          resendTimer={resendTimer}
          setError={setInput1Error}
          setInputOTP={setInputOTP}
          setResendTimer={setResendTimer}
        />
      );
      break;
    case "PASSWORD":
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

    default:
      break;
  }

  return content;
};

export const ForgotPassword = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(ForgotPasswordComponent);
