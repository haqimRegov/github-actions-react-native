import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import { TermsAndConditionsTemplate } from "../../../templates/Acknowledgement";

interface TermsAndConditionsProps extends AcknowledgementStoreProps, ForceUpdateContentProps {
  navigation: IStackNavigationProp;
}

export const TermsAndConditionsComponent: FunctionComponent<TermsAndConditionsProps> = ({
  agreeTerms,
  forceUpdate,
  handleNextStep,
  updateAgree,
  updateForceUpdate,
}: TermsAndConditionsProps) => {
  const handleContinue = () => {
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...forceUpdate.disabledSteps];
    const findSignatures = updatedDisabledSteps.indexOf("Signatures");
    if (findSignatures !== -1) {
      updatedDisabledSteps.splice(findSignatures, 1);
    }
    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps });
    handleNextStep("Signatures");
  };

  const disabled = !(agreeTerms.agree1 === true && agreeTerms.agree2 === true && agreeTerms.agree3 === true);

  if (!forceUpdate.disabledSteps.includes("Signatures") && disabled === true) {
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...forceUpdate.disabledSteps, "Signatures"];
    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps });
  }

  return (
    <TermsAndConditionsTemplate
      agreeTerms={agreeTerms}
      // handleBack={handleBack}
      handleContinue={handleContinue}
      fundTypeArray={[]}
      transactionType="CR"
      updateAgree={updateAgree}
    />
  );
};

export const TermsAndConditions = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(TermsAndConditionsComponent);
