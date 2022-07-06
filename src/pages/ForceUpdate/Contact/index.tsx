import { useNavigation } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

import { emailVerification } from "../../../network-actions";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { ContactUpdate } from "./ContactUpdate";
import { VerifyOTP } from "./VerifyOTP";

interface ContactContentProps extends ForceUpdateContentProps, PersonalInfoStoreProps {
  navigation: IStackNavigationProp;
}

const ContactContentComponent: FunctionComponent<ContactContentProps> = ({
  addPersonalInfo,
  handleCancelForceUpdate,
  personalInfo,
  details,
  forceUpdate,
  handleNextStep,
  setLoading,
  updateForceUpdate,
}: ContactContentProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { emailOtpSent } = personalInfo;
  const fetching = useRef<boolean>(false);
  const [page, setPage] = useState<"contact-update" | "verify-otp">("contact-update");

  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const inputEmail = personalInfo.principal!.contactDetails!.emailAddress!;
  const inputClientId = details?.principalHolder?.clientId!;

  const handleNavigate = () => {
    handleNextStep("ContactSummary");
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...forceUpdate.disabledSteps];
    const updatedFinishedSteps: TypeForceUpdateKey[] = [...forceUpdate.finishedSteps];
    const findContactSummary = updatedDisabledSteps.indexOf("ContactSummary");
    if (findContactSummary !== -1) {
      updatedDisabledSteps.splice(findContactSummary, 1);
    }
    updatedFinishedSteps.push("InvestorInformation");
    updatedDisabledSteps.push("Contact");
    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps, emailVerified: true, finishedSteps: updatedFinishedSteps });
  };

  const setEmailOtpSent = (value: boolean) => {
    addPersonalInfo({ ...personalInfo, emailOtpSent: value });
  };

  const handleEmailVerification = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setEmailError(undefined);
      const request: IEmailVerificationRequest = {
        isForceUpdate: true,
        id: details!.principalHolder!.id,
        initId: details!.initId!,
        clientId: inputClientId,
        principalHolder: { email: inputEmail },
      };
      setLoading(true);
      const response: IEmailVerificationResponse = await emailVerification(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          if (data.result.status === true) {
            addPersonalInfo({ ...personalInfo, emailOtpSent: true });
            setEmailOtpSent(true);
            setPage("verify-otp");
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

  const handleCancel = () => {
    setPage("contact-update");
  };

  const handleContinue = () => {
    handleEmailVerification();
  };

  useEffect(() => {
    if (emailOtpSent === true) {
      setPage("verify-otp");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {page === "contact-update" ? (
        <ContactUpdate
          addPersonalInfo={addPersonalInfo}
          handleCancel={handleCancelForceUpdate}
          handleContinue={handleContinue}
          personalInfo={personalInfo}
          inputEmailError={emailError}
          setInputEmailError={setEmailError}
        />
      ) : (
        <VerifyOTP
          details={details}
          emailOtpSent={emailOtpSent === true}
          handleCancel={handleCancel}
          handleNavigate={handleNavigate}
          handleResend={handleEmailVerification}
          inputEmail={inputEmail}
          setEmailOtpSent={setEmailOtpSent}
        />
      )}
    </Fragment>
  );
};

export const ContactContent = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(ContactContentComponent);
