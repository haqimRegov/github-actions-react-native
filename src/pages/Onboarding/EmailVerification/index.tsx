import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { LocalAssets } from "../../../assets/LocalAssets";
import { PromptModal } from "../../../components";
import { Language } from "../../../constants/language";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { EmailOTP } from "./EmailOTP";
import { Verification } from "./Verification";

const { EMAIL_VERIFICATION } = Language.PAGE;

interface EmailVerificationProps extends OnboardingContentProps, PersonalInfoStoreProps {}

const EmailVerificationComponent: FunctionComponent<EmailVerificationProps> = ({
  accountType,
  addPersonalInfo,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
}: EmailVerificationProps) => {
  const [page, setPage] = useState<"verification" | "otp">("verification");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleNext = () => {
    handleNextStep("IdentityVerification");
  };

  const handleContinue = () => {
    if (page === "otp") {
      // TODO integration
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        handleNext();
      }, 5000);
    } else {
      setPage("otp");
    }
  };

  const jointEmailCheck = accountType === "Joint" && moment().diff(personalInfo.joint?.personalDetails!.dateOfBirth, "years") >= 18;
  const props = {
    accountType,
    handleCancel: handleCancelOnboarding,
    handleContinue,
    isJointEmail: jointEmailCheck,
    personalInfo,
  };

  return (
    <Fragment>
      {page === "verification" ? <Verification {...props} addPersonalInfo={addPersonalInfo} /> : <EmailOTP {...props} setPage={setPage} />}
      <PromptModal
        handleContinue={handleNext}
        illustration={LocalAssets.illustration.email_verified}
        label={EMAIL_VERIFICATION.LABEL_EMAIL_VERIFIED}
        title={EMAIL_VERIFICATION.LABEL_EMAIL_VERIFIED_TITLE}
        visible={showModal}
      />
    </Fragment>
  );
};

export const EmailVerification = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmailVerificationComponent);
