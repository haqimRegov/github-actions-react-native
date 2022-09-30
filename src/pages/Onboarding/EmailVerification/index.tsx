import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language, OTP_CONFIG } from "../../../constants";
import { emailVerification } from "../../../network-actions";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { fs16RegGray6 } from "../../../styles";
import { EmailOTP } from "./EmailOTP";
import { Verification } from "./Verification";

const { EMAIL_VERIFICATION } = Language.PAGE;
interface EmailVerificationProps extends OnboardingContentProps, PersonalInfoStoreProps {}

const EmailVerificationComponent: FunctionComponent<EmailVerificationProps> = ({
  accountType,
  addPersonalInfo,
  details,
  onboarding,
  handleNextStep,
  personalInfo,
  setLoading,
  updateOnboarding,
}: EmailVerificationProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { emailOtpSent } = personalInfo;
  const fetching = useRef<boolean>(false);
  const [page, setPage] = useState<"verification" | "otp">("verification");
  const [principalOtp, setPrincipalOtp] = useState<string>("");
  const [jointOtp, setJointOtp] = useState<string>("");
  const [prompt, setPrompt] = useState<"cancel" | undefined>(undefined);
  const [principalEmailError, setPrincipalEmailError] = useState<string | undefined>(undefined);
  const [jointEmailError, setJointEmailError] = useState<string | undefined>(undefined);
  const [resendTimer, setResendTimer] = useState(0);

  const inputPrincipalEmail = personalInfo.principal!.contactDetails!.emailAddress!;
  const inputJointEmail = personalInfo.joint!.contactDetails!.emailAddress!;
  const principalClientId = details?.principalHolder?.clientId!;
  const jointEmailCheck =
    accountType === "Joint" &&
    (inputJointEmail !== "" || moment().diff(moment(details!.jointHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "years") >= 18);

  const handleNavigate = () => {
    handleNextStep("IdentityVerification");
    const updatedDisabledSteps: TypeOnboardingKey[] = [...onboarding.disabledSteps];
    const findIdVerification = updatedDisabledSteps.indexOf("IdentityVerification");
    if (findIdVerification !== -1) {
      updatedDisabledSteps.splice(findIdVerification, 1);
    }
    updatedDisabledSteps.push("EmailVerification");
    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });
  };

  const handleEmailVerification = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setPrincipalEmailError(undefined);
      setJointEmailError(undefined);
      const jointRequest = jointEmailCheck === true || inputJointEmail !== "" ? { email: inputJointEmail } : undefined;
      const request: IEmailVerificationRequest = {
        initId: details!.initId!,
        isForceUpdate: false,
        clientId: principalClientId,
        principalHolder: { email: inputPrincipalEmail },
        jointHolder: jointRequest,
      };
      setLoading(true);
      const response: IEmailVerificationResponse = await emailVerification(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      setResendTimer(OTP_CONFIG.EXPIRY);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          if (data.result.status === true) {
            addPersonalInfo({ ...personalInfo, emailOtpSent: true });
            setPage("otp");
          }
        }
        if (error !== null) {
          setTimeout(() => {
            Alert.alert(error.message);
          }, 200);
        }
      }
    }
  };

  const handleBack = () => {
    setPrompt(undefined);
    handleNextStep("Products");
    addPersonalInfo({
      ...personalInfo,
      emailOtpSent: false,
      principal: { ...personalInfo.principal, contactDetails: { ...personalInfo.principal!.contactDetails, emailAddress: "" } },
      joint: { ...personalInfo.joint, contactDetails: { ...personalInfo.joint!.contactDetails, emailAddress: "" } },
    });
  };

  const handleCancel = () => {
    setPrompt("cancel");
  };

  const handlePromptCancel = () => {
    setPrompt(undefined);
  };

  const handleContinue = () => {
    handleEmailVerification();
  };

  useEffect(() => {
    if (emailOtpSent === true) {
      setPage("otp");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let otpTimer: ReturnType<typeof setTimeout>;
    if (resendTimer > 0) {
      otpTimer = setInterval(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearInterval(otpTimer);
  }, [resendTimer]);

  return (
    <Fragment>
      {page === "verification" ? (
        <Verification
          accountType={accountType}
          addPersonalInfo={addPersonalInfo}
          handleCancel={handleCancel}
          handleContinue={handleContinue}
          jointEmailCheck={jointEmailCheck}
          jointError={jointEmailError}
          personalInfo={personalInfo}
          principalError={principalEmailError}
          resendTimer={resendTimer}
          setJointError={setJointEmailError}
          setPrincipalError={setPrincipalEmailError}
        />
      ) : (
        <EmailOTP
          accountType={accountType}
          details={details}
          handleCancel={handleCancel}
          handleNavigate={handleNavigate}
          handleResend={handleEmailVerification}
          jointEmail={inputJointEmail}
          jointEmailCheck={jointEmailCheck}
          jointOtp={jointOtp}
          principalClientId={principalClientId}
          principalEmail={inputPrincipalEmail}
          principalOtp={principalOtp}
          resendTimer={resendTimer}
          setJointOtp={setJointOtp}
          setPage={setPage}
          setPrincipalOtp={setPrincipalOtp}
          setResendTimer={setResendTimer}
        />
      )}
      <ConfirmationModal
        handleCancel={handlePromptCancel}
        handleContinue={handleBack}
        labelCancel={EMAIL_VERIFICATION.BUTTON_NO}
        labelContinue={EMAIL_VERIFICATION.BUTTON_YES}
        title={EMAIL_VERIFICATION.PROMPT_TITLE}
        visible={prompt !== undefined}>
        <Text style={fs16RegGray6}>{EMAIL_VERIFICATION.PROMPT_LABEL}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};

export const EmailVerification = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmailVerificationComponent);
