import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import { TermsAndConditionsTemplate } from "../../../templates/Acknowledgement";

interface TermsAndConditionsProps extends OnboardingContentProps, AcknowledgementStoreProps {}

const TermsAndConditionsComponent: FunctionComponent<TermsAndConditionsProps> = ({
  agreeTerms,
  handleNextStep,
  orders,
  onboarding,
  outsideRisk,
  updateAgree,
  updateOnboarding,
}: TermsAndConditionsProps) => {
  const { finishedSteps } = onboarding;

  const handleBack = () => {
    handleNextStep("OrderSummary");
  };

  const handleContinue = () => {
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("TermsAndConditions") === false) {
      updatedFinishedSteps.push("TermsAndConditions");
    }

    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps });

    handleNextStep("Signatures");
  };

  const fundTypeArray: string[] =
    orders !== undefined
      ? orders.orders.map((order: IOrder) => order.investments.map((investment: IOrderInvestment) => investment.fundType)).flat()
      : [];

  return (
    <TermsAndConditionsTemplate
      agreeTerms={agreeTerms}
      handleBack={handleBack}
      handleContinue={handleContinue}
      fundTypeArray={fundTypeArray}
      outsideRisk={outsideRisk}
      transactionType="Sales-AO"
      updateAgree={updateAgree}
    />
  );
};

export const TermsAndConditions = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(TermsAndConditionsComponent);
