import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

import { Language } from "../../constants";
import { Q8_OPTIONS } from "../../data/dictionary";
import { getRiskProfile } from "../../network-actions";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import { RiskAssessmentTemplate } from "../../templates";

const { RISK_ASSESSMENT } = Language.PAGE;

interface QuestionnaireContentProps extends OnboardingContentProps, RiskStoreProps {
  navigation: IStackNavigationProp;
}

const QuestionnaireContentComponent: FunctionComponent<QuestionnaireContentProps> = ({
  addAssessmentQuestions,
  addPersonalInfo,
  agent,
  client,
  details,
  handleNextStep,
  navigation,
  onboarding,
  personalInfo,
  principalHolder,
  questionnaire,
  resetQuestionnaire,
  resetSelectedFund,
  riskScore,
  setLoading,
  updateIsRiskUpdated,
  updateOnboarding,
  updateProductType,
}: QuestionnaireContentProps) => {
  const { clientId, dateOfBirth, id, isEtb } = principalHolder!;
  const { disabledSteps, finishedSteps } = onboarding;

  const fetching = useRef<boolean>(false);
  const [updatedFinishedSteps, setUpdatedFinishedSteps] = useState<TypeOnboardingRoute[]>(finishedSteps);
  const [confirmModal, setConfirmModal] = useState<TypeRiskAssessmentModal>(undefined);
  const [prevRiskAssessment, setPrevRiskAssessment] = useState<IRiskAssessmentQuestions | undefined>(undefined);
  const [isEditConfirmed, setIsEditConfirmed] = useState<boolean>(false);
  const [currentRiskScore, setCurrentRiskScore] = useState<IRiskScore>(riskScore);

  const handleConfirmAssessment = () => {
    updateIsRiskUpdated(true);
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const newFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];

    // add to finishedSteps
    const findRiskAssessment = newFinishedSteps.indexOf("RiskAssessment");
    if (findRiskAssessment === -1) {
      newFinishedSteps.push("RiskAssessment");
    }

    // add to disabledSteps
    if (updatedDisabledSteps.includes("Products") === false) {
      updatedDisabledSteps.push("Products");
    }
    if (updatedDisabledSteps.includes("ProductsConfirmation") === false) {
      updatedDisabledSteps.push("ProductsConfirmation");
    }
    if (updatedDisabledSteps.includes("PersonalInformation") === false) {
      updatedDisabledSteps.push("PersonalInformation");
    }
    if (updatedDisabledSteps.includes("Declarations") === false) {
      updatedDisabledSteps.push("Declarations");
    }

    // remove from finishedSteps
    const findProductsList = newFinishedSteps.indexOf("ProductsList");
    if (findProductsList !== -1) {
      newFinishedSteps.splice(findProductsList, 1);
    }

    const findProductsConfirmation = newFinishedSteps.indexOf("ProductsConfirmation");
    if (findProductsConfirmation !== -1) {
      newFinishedSteps.splice(findProductsConfirmation, 1);
    }

    const toastObject =
      isEtb === true
        ? {
            toast: {
              toastText: RISK_ASSESSMENT.TOAST_CHANGES,
              toastVisible: true,
            },
          }
        : {};

    updateOnboarding({
      ...onboarding,
      finishedSteps: newFinishedSteps,
      disabledSteps: updatedDisabledSteps,
      riskInfo: {
        appetite: currentRiskScore.appetite,
        hnwStatus: currentRiskScore.netWorth,
        profile: currentRiskScore.profile,
        expectedRange: currentRiskScore.rangeOfReturn,
        type: currentRiskScore.type,
      },
      ...toastObject,
    });

    addPersonalInfo({
      ...personalInfo,
      editMode: false,
      principal: {
        ...personalInfo.principal,
        employmentDetails: { ...personalInfo.principal!.employmentDetails, grossIncome: Q8_OPTIONS[questionnaire.questionEight].label },
      },
    });
    resetQuestionnaire();

    if (agent!.licenseType.includes("UT") === false) {
      updateProductType("prs");
    }

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
        isEtb: false,
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
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const findProducts = updatedDisabledSteps.indexOf("Products");
    if (findProducts === -1) {
      updatedDisabledSteps.push("Products");
    }
    setPrevRiskAssessment(undefined);
    setUpdatedFinishedSteps([]);
    resetSelectedFund();
    setIsEditConfirmed(true); // from sales
    return updateOnboarding({ ...onboarding, finishedSteps: [], disabledSteps: updatedDisabledSteps });
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
    // // show prompt after editing
    // if (prevRiskAssessment !== undefined && !isObjectEqual(questionnaire, prevRiskAssessment)) {
    //   setConfirmModal("promptAssessment");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedSteps, prevRiskAssessment, questionnaire]);

  return (
    <RiskAssessmentTemplate
      accountType={client.accountType!} // new
      addAssessmentQuestions={addAssessmentQuestions} // same
      cancelDisabled={isEditConfirmed} // same // currently not doing since functionality is commented in useEffect
      confirmModal={confirmModal} // same // currently not doing since functionality is commented in useEffect
      currentRiskScore={currentRiskScore} // same
      dateOfBirth={dateOfBirth!} // same
      details={details} // new
      handleCancelAssessment={handleCancelAssessment} // same
      handleCancelEdit={handleCancelEdit} // same
      handleConfirmAssessment={handleConfirmAssessment} // TODO not same
      handleConfirmEdit={handleConfirmEdit} // currently not doing since functionality is commented in useEffect
      handlePageContinue={handlePageContinue} // not same
      handleRetakeAssessment={handleRetakeAssessment} // same
      questionnaire={questionnaire} // same
    />
  );
};

export const QuestionnaireContent = connect(RiskMapStateToProps, RiskMapDispatchToProps)(QuestionnaireContentComponent);
