import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { ContentPage, CustomSpacer } from "../../../components";
import { Language } from "../../../constants";
import { borderBottomGray4, sh32 } from "../../../styles";
import { JointVerification } from "./Joint";
import { PrincipalVerification } from "./Principal";

const { ID_VERIFICATION } = Language.PAGE;

interface IDVerificationProps {
  accountType: TypeAccountChoices;
  addClientDetails: (details: IClientDetailsState) => void;
  addPersonalInfo: (info: IPersonalInfoState) => void;
  handleCancelOnboarding: () => void;
  handleNextStep: (route: TypeOnboardingRoute) => void;
  details: IClientDetailsState;
  personalInfo: IPersonalInfoState;
  riskScore: IRiskScoreState;
}

export const IDVerification: FunctionComponent<IDVerificationProps> = ({
  accountType,
  addPersonalInfo,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
  riskScore,
}: IDVerificationProps) => {
  const { principal, joint } = personalInfo;

  const handleSubmit = () => {
    addPersonalInfo({ principal: { ...principal, personalDetails: { ...principal?.personalDetails, riskProfile: riskScore.appetite } } });
    const route: TypeOnboardingRoute = personalInfo.editMode === true ? "Summary" : "PersonalDetails";
    handleNextStep(route);
  };

  // TODO validations
  const continueDisabled: boolean = false;

  const handlePrincipalDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ principal: { personalDetails: { ...principal!.personalDetails, ...value } } });
  };

  const handlePrincipalAddress = (value: IAddressInfoState) => {
    addPersonalInfo({ principal: { addressInformation: { ...principal!.addressInformation, ...value } } });
  };

  const handleJointDetails = (value: IPersonalDetailsState) => {
    addPersonalInfo({ joint: { personalDetails: { ...joint!.personalDetails, ...value } } });
  };

  const handleJointAddress = (value: IAddressInfoState) => {
    addPersonalInfo({ joint: { addressInformation: { ...joint!.addressInformation, ...value } } });
  };

  return (
    <ContentPage
      continueDisabled={continueDisabled}
      handleCancel={handleCancelOnboarding!}
      handleContinue={handleSubmit}
      labelCancel={ID_VERIFICATION.BUTTON_BACK}
      labelContinue={ID_VERIFICATION.BUTTON_VERIFY}>
      <PrincipalVerification
        accountType={accountType}
        addressInfo={principal!.addressInformation!}
        personalDetails={principal!.personalDetails!}
        setAddressInfo={handlePrincipalAddress}
        setPersonalDetails={handlePrincipalDetails}
      />
      <CustomSpacer space={sh32} />
      {accountType === "Individual" ? null : (
        <Fragment>
          <View style={borderBottomGray4} />
          <CustomSpacer space={sh32} />
          <JointVerification
            addressInfo={joint!.addressInformation!}
            personalDetails={joint!.personalDetails!}
            setAddressInfo={handleJointAddress}
            setPersonalDetails={handleJointDetails}
          />
        </Fragment>
      )}
    </ContentPage>
  );
};
