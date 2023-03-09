import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { CRS_NEW, FATCA_NEW, INVESTOR_UPDATE } from "../../../data/dictionary";
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
  const { declarations } = forceUpdate;

  const handleContinue = () => {
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...forceUpdate.disabledSteps];
    const findSignatures = updatedDisabledSteps.indexOf("Signatures");
    if (findSignatures !== -1) {
      updatedDisabledSteps.splice(findSignatures, 1);
    }
    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps });
    handleNextStep("Signatures");
  };

  const TERMS_AND_CONDITION_LIST: ITermsAccordionSection[] = [FATCA_NEW, CRS_NEW, INVESTOR_UPDATE];
  if (!declarations.includes("fatca")) {
    TERMS_AND_CONDITION_LIST.splice(0, 1);
  }
  if (!declarations.includes("crs")) {
    const checkIndex = !declarations.includes("fatca") ? 0 : 1;
    TERMS_AND_CONDITION_LIST.splice(checkIndex, 1);
  }

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
