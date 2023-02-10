import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

import { Language } from "../../constants";
import { getRiskProfile } from "../../network-actions";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import { RiskAssessmentTemplate } from "../../templates";

const { RISK_ASSESSMENT } = Language.PAGE;

interface RiskAssessmentContentProps extends RiskStoreProps, NewSalesContentProps {
  navigation: IStackNavigationProp;
}

const NewSalesRiskAssessmentComponent: FunctionComponent<RiskAssessmentContentProps> = ({
  addAssessmentQuestions,
  addRiskInfo,
  details,
  handleNextStep,
  navigation,
  newSales,
  principalHolder,
  questionnaire,
  resetQuestionnaire,
  riskScore,
  setLoading,
  updateIsRiskUpdated,
  updateNewSales,
  updateToast,
}: RiskAssessmentContentProps) => {
  const { clientId, dateOfBirth, id } = principalHolder!;
  const { disabledSteps, finishedSteps } = newSales;

  const fetching = useRef<boolean>(false);
  const [updatedFinishedSteps, setUpdatedFinishedSteps] = useState<TypeNewSalesRoute[]>(finishedSteps);
  const [confirmModal, setConfirmModal] = useState<TypeRiskAssessmentModal>(undefined);
  const [prevRiskAssessment, setPrevRiskAssessment] = useState<IRiskAssessmentQuestions | undefined>(undefined);
  const [isEditConfirmed, setIsEditConfirmed] = useState<boolean>(false);
  const [currentRiskScore, setCurrentRiskScore] = useState<IRiskScore>(riskScore);

  const handleConfirmAssessment = () => {
    updateIsRiskUpdated(true);
    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
    const newFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];
    const findProducts = updatedDisabledSteps.indexOf("Products");
    if (findProducts === -1) {
      updatedDisabledSteps.push("Products");
    }
    const findRiskAssessment = newFinishedSteps.indexOf("RiskAssessment");
    if (findRiskAssessment === -1) {
      newFinishedSteps.push("RiskAssessment");
    }
    updateNewSales({
      ...newSales,
      finishedSteps: newFinishedSteps,
      disabledSteps: updatedDisabledSteps,
      toast: {
        toastText: RISK_ASSESSMENT.TOAST_CHANGES,
        toastVisible: true,
      },
    });
    addRiskInfo({
      appetite: currentRiskScore.appetite,
      hnwStatus: currentRiskScore.netWorth,
      profile: currentRiskScore.profile,
      expectedRange: currentRiskScore.rangeOfReturn,
      type: currentRiskScore.type,
    });
    resetQuestionnaire();
    updateToast({ toastText: RISK_ASSESSMENT.TOAST_CHANGES, toastVisible: true });
    handleNextStep("RiskSummary");
  };

  const handleRetakeAssessment = () => {
    setConfirmModal(undefined);
    resetQuestionnaire();
    // resetRiskAssessment();
  };

  const handlePageContinue = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const request: IGetRiskProfileRequest = {
        clientId: clientId!,
        id: id!,
        initId: details!.initId!,
        isEtb: true,
        isForceUpdate: false,
        riskAssessment: { ...questionnaire },
      };
      const response: IGetRiskProfileResponse = await getRiskProfile(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          const riskAssessment = { ...data.result };
          setCurrentRiskScore(riskAssessment);
          setTimeout(() => {
            setConfirmModal("assessment");
          }, 300);
        }
        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          setTimeout(() => {
            Alert.alert(error.message, errorList);
          }, 300);
        }
      }
    }
  };

  const handleConfirmEdit = () => {
    setConfirmModal(undefined);
    setPrevRiskAssessment(undefined);
    setUpdatedFinishedSteps([]);
    setIsEditConfirmed(true);
  };

  const handleCancelEdit = () => {
    if (prevRiskAssessment !== undefined) {
      setConfirmModal(undefined);
      addAssessmentQuestions(prevRiskAssessment);
    }
  };

  const handleCancelAssessment = () => {
    resetQuestionnaire();
    handleNextStep("RiskSummary");
  };

  useEffect(() => {
    if (prevRiskAssessment === undefined && updatedFinishedSteps.includes("RiskAssessment")) {
      setPrevRiskAssessment(questionnaire);
    }
    // if (prevRiskAssessment !== undefined && !isObjectEqual(questionnaire, prevRiskAssessment)) {
    //   setConfirmModal("promptAssessment");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedSteps, prevRiskAssessment, questionnaire]);

  return (
    <RiskAssessmentTemplate
      addAssessmentQuestions={addAssessmentQuestions}
      cancelDisabled={isEditConfirmed}
      confirmModal={confirmModal}
      currentRiskScore={currentRiskScore}
      dateOfBirth={dateOfBirth!}
      handleCancelAssessment={handleCancelAssessment}
      handleCancelEdit={handleCancelEdit}
      handleConfirmAssessment={handleConfirmAssessment}
      handleConfirmEdit={handleConfirmEdit}
      handlePageContinue={handlePageContinue}
      handleRetakeAssessment={handleRetakeAssessment}
      questionnaire={questionnaire}
    />
  );
};

export const NewSalesRiskAssessment = connect(RiskMapStateToProps, RiskMapDispatchToProps)(NewSalesRiskAssessmentComponent);
