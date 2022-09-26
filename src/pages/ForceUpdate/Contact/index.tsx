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
  details,
  forceUpdate,
  handleCancelForceUpdate,
  handleNextStep,
  personalInfo,
  setLoading,
  updateForceUpdate,
}: ContactContentProps) => {
  const inputClientId = details?.principalHolder?.clientId!;
  const { emailOtpSent, principal } = personalInfo;
  const { contactNumber, emailAddress } = principal!.contactDetails!;

  const navigation = useNavigation<IStackNavigationProp>();
  const fetching = useRef<boolean>(false);
  const [page, setPage] = useState<"contact-update" | "verify-otp">("contact-update");
  const [inputEmail, setInputEmail] = useState(emailAddress!);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);

  const isOtpNeeded = inputEmail !== emailAddress || emailAddress === "" || inputEmail === "";

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
        clientId: inputClientId,
        id: details!.principalHolder!.id,
        initId: details!.initId!,
        isForceUpdate: true,
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
            addPersonalInfo({
              ...personalInfo,
              emailOtpSent: true,
              principal: { ...principal, contactDetails: { ...principal!.contactDetails, emailAddress: inputEmail } },
            });
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
    if (isOtpNeeded === false) {
      setPage("verify-otp");
    } else if (otpVerified === false) {
      handleEmailVerification();
    } else {
      handleNavigate();
    }
  };

  const setContactNumber = (value: IContactNumber[]) => {
    addPersonalInfo({
      ...personalInfo,
      principal: { ...principal, contactDetails: { ...principal!.contactDetails, contactNumber: value } },
    });
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
          contactNumber={contactNumber!}
          handleCancel={handleCancelForceUpdate}
          handleContinue={handleContinue}
          inputEmail={inputEmail}
          inputEmailError={emailError}
          isOtpNeeded={isOtpNeeded}
          name={personalInfo.principal!.personalDetails!.name!}
          setContactNumber={setContactNumber}
          setInputEmail={setInputEmail}
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
          setOtpVerified={setOtpVerified}
        />
      )}
    </Fragment>
  );
};

export const ContactContent = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(ContactContentComponent);
