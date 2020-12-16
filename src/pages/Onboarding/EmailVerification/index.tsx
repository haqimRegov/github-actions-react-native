import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { DATE_OF_BIRTH_FORMAT } from "../../../constants";
import { emailVerification } from "../../../network-actions";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { EmailOTP } from "./EmailOTP";
import { Verification } from "./Verification";

interface EmailVerificationProps extends OnboardingContentProps, PersonalInfoStoreProps {}

const EmailVerificationComponent: FunctionComponent<EmailVerificationProps> = ({
  accountType,
  addPersonalInfo,
  details,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
  setLoading,
}: EmailVerificationProps) => {
  const [page, setPage] = useState<"verification" | "otp">("verification");
  const [principalOtp, setPrincipalOtp] = useState<string>("");
  const [jointOtp, setJointOtp] = useState<string>("");

  const inputPrincipalEmail = personalInfo.principal!.contactDetails!.emailAddress!;
  const inputJointEmail = personalInfo.joint!.contactDetails!.emailAddress!;
  const principalClientId = details?.principalHolder?.clientId!;

  const handleNavigate = () => {
    handleNextStep("IdentityVerification");
  };

  const handleEmailVerification = async () => {
    const jointRequest = accountType === "Joint" ? { email: inputJointEmail } : undefined;
    const req = {
      clientId: principalClientId,
      principalHolder: { email: inputPrincipalEmail },
      jointHolder: jointRequest,
    };
    setLoading(true);
    const response: IEmailVerificationResponse = await emailVerification(req);
    setLoading(false);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        if (data.result.status === true) {
          setPage("otp");
        }
      }
    }
  };

  const handleContinue = () => {
    handleEmailVerification();
  };

  const jointEmailCheck =
    accountType === "Joint" && moment().diff(moment(details?.jointHolder?.dateOfBirth, DATE_OF_BIRTH_FORMAT), "years") >= 18;

  return (
    <Fragment>
      {page === "verification" ? (
        <Verification
          accountType={accountType}
          addPersonalInfo={addPersonalInfo}
          jointEmailCheck={jointEmailCheck}
          handleCancel={handleCancelOnboarding}
          handleContinue={handleContinue}
          personalInfo={personalInfo}
        />
      ) : (
        <EmailOTP
          accountType={accountType}
          handleCancel={handleCancelOnboarding}
          handleNavigate={handleNavigate}
          handleResend={handleEmailVerification}
          jointEmailCheck={jointEmailCheck}
          jointEmail={inputJointEmail}
          jointOtp={jointOtp}
          principalClientId={principalClientId}
          principalEmail={inputPrincipalEmail}
          principalOtp={principalOtp}
          setJointOtp={setJointOtp}
          setPage={setPage}
          setPrincipalOtp={setPrincipalOtp}
        />
      )}
    </Fragment>
  );
};

export const EmailVerification = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(EmailVerificationComponent);
