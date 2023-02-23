import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { CalculateTimeDifference } from "../../../helpers";
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

  const { disabledSteps, finishedSteps } = onboarding;
  const { editMode, emailOtpSent, emailTimestamp } = personalInfo;
  const { jointHolder, principalHolder } = details!;
  const { isEtb: isEtbJoint } = jointHolder!;
  const { isEtb: isEtbPrincipal } = principalHolder!;
  const fetching = useRef<boolean>(false);
  const [page, setPage] = useState<"verification" | "otp">("verification");
  const [principalOtp, setPrincipalOtp] = useState<string>("");
  const [jointOtp, setJointOtp] = useState<string>("");
  const [prompt, setPrompt] = useState<"cancel" | undefined>(undefined);
  const [principalEmailError, setPrincipalEmailError] = useState<string | undefined>(undefined);
  const [jointEmailError, setJointEmailError] = useState<string | undefined>(undefined);
  const checkTimeDifference = CalculateTimeDifference(emailTimestamp);

  const [resendTimer, setResendTimer] = useState(checkTimeDifference);

  const inputPrincipalEmail = personalInfo.principal!.contactDetails!.emailAddress!;
  const inputJointEmail = personalInfo.joint!.contactDetails!.emailAddress!;
  const principalClientId = details?.principalHolder?.clientId!;
  // dateOfBirth saved in PersonalInfo is in Date type while DEFAULT_DATE_FORMAT string in ClientDetails
  const jointAgeCheck = moment().diff(moment(details!.jointHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "years") >= 18;
  const jointEmailCheck = accountType === "Joint" && (inputJointEmail !== "" || jointAgeCheck) && isEtbJoint === false;

  const handleNavigate = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("EmailVerification") === false) {
      updatedFinishedSteps.push("EmailVerification");
    }

    // remove in disabledSteps if edit mode
    if (editMode === true) {
      const findPersonalInfoSummary = updatedDisabledSteps.indexOf("PersonalInfoSummary");

      if (findPersonalInfoSummary !== -1) {
        updatedDisabledSteps.splice(findPersonalInfoSummary, 1);
      }
      addPersonalInfo({ ...personalInfo, editMode: false });
    }

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });

    handleNextStep("IdentityVerification");
  };

  const handleEmailVerification = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setPrincipalEmailError(undefined);
      setJointEmailError(undefined);
      const checkPrincipalHolder = isEtbPrincipal === true ? {} : { principalHolder: { email: inputPrincipalEmail } };
      const checkJointHolder = jointEmailCheck === true || inputJointEmail !== "" ? { jointHolder: { email: inputJointEmail } } : undefined;
      const request: IEmailVerificationRequest = {
        initId: details!.initId!,
        isForceUpdate: false,
        clientId: principalClientId,
        ...checkPrincipalHolder,
        ...checkJointHolder,
      };
      setLoading(true);
      const response: IEmailVerificationResponse = await emailVerification(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          const otpDifference = CalculateTimeDifference(data.result.otpSendTime);
          setResendTimer(otpDifference);
          if (data.result.status === true) {
            addPersonalInfo({ ...personalInfo, emailOtpSent: true, emailTimestamp: response.data?.result.otpSendTime });
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
    handleNextStep("ProductsConfirmation");
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
          accountType={accountType!}
          addPersonalInfo={addPersonalInfo}
          handleCancel={handleCancel}
          handleContinue={handleContinue}
          handleNavigate={handleNavigate}
          isEtbJoint={isEtbJoint}
          isEtbPrincipal={isEtbPrincipal}
          jointAgeCheck={jointAgeCheck}
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
          accountType={accountType!}
          addPersonalInfo={addPersonalInfo}
          details={details}
          handleCancel={handleCancel}
          handleNavigate={handleNavigate}
          handleResend={handleEmailVerification}
          isEtbJoint={isEtbJoint}
          isEtbPrincipal={isEtbPrincipal}
          jointEmail={inputJointEmail}
          jointEmailCheck={jointEmailCheck}
          jointOtp={jointOtp}
          personalInfo={personalInfo}
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
