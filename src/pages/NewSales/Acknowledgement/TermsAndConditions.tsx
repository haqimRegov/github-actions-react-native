import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import { TermsAndConditionsTemplate } from "../../../templates/Acknowledgement/TermsAndConditions";

interface TermsAndConditionsProps extends NewSalesContentProps, AcknowledgementStoreProps {}

const TermsAndConditionsComponent: FunctionComponent<TermsAndConditionsProps> = ({
  agreeTerms,
  handleNextStep,
  newSales,
  orders,
  outsideRisk,
  updateAgree,
  updateNewSales,
}: TermsAndConditionsProps) => {
  const { finishedSteps, transactionType } = newSales;

  const handleBack = () => {
    handleNextStep("OrderPreview");
  };

  const handleContinue = () => {
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("TermsAndConditions") === false) {
      updatedFinishedSteps.push("TermsAndConditions");
    }

    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps });

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
      transactionType={transactionType!}
      updateAgree={updateAgree}
    />
  );
};

export const TermsAndConditions = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(TermsAndConditionsComponent);
