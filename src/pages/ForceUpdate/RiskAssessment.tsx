import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";

import { getRiskProfile, submitChangeRequest } from "../../network-actions";
import { RiskMapDispatchToProps, RiskMapStateToProps, RiskStoreProps } from "../../store";
import { RiskAssessmentTemplate } from "../../templates";
import { isObjectEqual } from "../../utils";

interface RiskAssessmentContentProps extends ForceUpdateContentProps, RiskStoreProps {
  navigation: IStackNavigationProp;
}

const RiskAssessmentContentComponent: FunctionComponent<RiskAssessmentContentProps> = ({
  addAssessmentQuestions,
  addRiskScore,
  details,
  handleNextStep,
  navigation,
  forceUpdate,
  personalInfo,
  principalHolder,
  questionnaire,
  resetRiskAssessment,
  riskScore,
  setLoading,
  updateForceUpdate,
}: RiskAssessmentContentProps) => {
  const { clientId, dateOfBirth, id } = principalHolder!;
  const { principal } = personalInfo;
  const { declarations, disabledSteps, finishedSteps } = forceUpdate;

  const fetching = useRef<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<TypeRiskAssessmentModal>(undefined);
  const [continueLoader, setContinueLoader] = useState<boolean>(false);
  const [prevRiskAssessment, setPrevRiskAssessment] = useState<IRiskAssessmentQuestions | undefined>(undefined);

  const handleSetupClient = async () => {
    if (fetching.current === false) {
      const request: ISubmitChangeRequestRequest = {
        id: details?.principalHolder?.id!,
        initId: details?.initId as string,
        clientId: details!.principalHolder!.clientId!,
        clientInfo: {
          contactDetails: {
            contactNumber: principal!.contactDetails!.contactNumber!.map((contact) => ({
              code: contact.code,
              label: contact.label,
              value: contact.value,
            })),
            emailAddress: principal!.contactDetails!.emailAddress!,
          },
          declaration: {},
        },
      };
      fetching.current = true;
      setContinueLoader(true);
      const response: ISubmitChangeRequestResponse = await submitChangeRequest(request, navigation, setLoading);
      fetching.current = false;
      setContinueLoader(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          return true;
        }

        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          setTimeout(() => {
            Alert.alert(error.message, errorList);
          }, 150);
        }
      }
    }
    return false;
  };

  const handleConfirmAssessment = async () => {
    let setupClient = false;
    if (forceUpdate.declarations.length === 0) {
      setupClient = await handleSetupClient();
    }
    if (forceUpdate.declarations.length !== 0 || setupClient === true) {
      const checkFatca: TypeForceUpdateKey = declarations.includes("fatca") ? "FATCADeclaration" : "CRSDeclaration";
      let nextStep: TypeForceUpdateKey = declarations.length === 0 ? "TermsAndConditions" : checkFatca;
      const updatedDisabledSteps: TypeForceUpdateKey[] = [...disabledSteps];
      const updatedFinishedSteps: TypeForceUpdateKey[] = [...finishedSteps];

      updatedFinishedSteps.push("RiskAssessment");

      const findDeclarations = updatedDisabledSteps.indexOf("Declarations");
      if (findDeclarations !== -1) {
        updatedDisabledSteps.splice(findDeclarations, 1);
      }

      const findFinishedFatca = updatedFinishedSteps.indexOf("FATCADeclaration");
      if (findFinishedFatca !== -1 && declarations.includes("crs")) {
        nextStep = "CRSDeclaration";
      }

      const findFinishedCrs = updatedFinishedSteps.indexOf("CRSDeclaration");
      if (findFinishedCrs !== -1) {
        nextStep = "DeclarationSummary";
      }

      if (declarations.includes("fatca")) {
        const findFatca = updatedDisabledSteps.indexOf("FATCADeclaration");
        if (findFatca !== -1 && findFinishedFatca === -1) {
          updatedDisabledSteps.splice(findFatca, 1);
        }
      }
      if (declarations.includes("crs")) {
        const findCrs = updatedDisabledSteps.indexOf("CRSDeclaration");
        if (findCrs !== -1 && findFinishedFatca === -1) {
          updatedDisabledSteps.splice(findCrs, 1);
        }
      }
      if (declarations.length === 0) {
        const findTerms = updatedDisabledSteps.indexOf("TermsAndConditions");
        if (findTerms !== -1) {
          updatedDisabledSteps.splice(findTerms, 1);
        }
        const findInvestorInfo = updatedDisabledSteps.indexOf("InvestorInformation");
        if (findInvestorInfo === -1) {
          updatedDisabledSteps.push("InvestorInformation");
        }
        const findRiskAssessment = updatedDisabledSteps.indexOf("RiskAssessment");
        if (findRiskAssessment === -1) {
          updatedDisabledSteps.push("RiskAssessment");
        }
      }

      updateForceUpdate({ ...forceUpdate, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
      handleNextStep(nextStep);
    }
  };

  const handleRetakeAssessment = () => {
    setConfirmModal(undefined);
    resetRiskAssessment();
  };

  const handlePageContinue = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const riskRequest: IGetRiskProfileRequest = {
        clientId: clientId!,
        id: id!,
        initId: details!.initId!,
        isEtb: true,
        isForceUpdate: true,
        riskAssessment: { ...questionnaire },
      };
      const response: IGetRiskProfileResponse = await getRiskProfile(riskRequest, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          const riskAssessment = { ...data.result };
          addRiskScore(riskAssessment);
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
    const updatedDisabledSteps: TypeForceUpdateKey[] = [
      "Contact",
      "Declarations",
      "FATCADeclaration",
      "CRSDeclaration",
      "DeclarationSummary",
      "Acknowledgement",
      "TermsAndConditions",
      "Signatures",
    ];
    setPrevRiskAssessment(undefined);
    updateForceUpdate({
      ...forceUpdate,
      disabledSteps: updatedDisabledSteps,
      finishedSteps: ["Contact", "InvestorInformation", "ContactSummary"],
    });
  };

  const handleCancelEdit = () => {
    if (prevRiskAssessment !== undefined) {
      setConfirmModal(undefined);
      addAssessmentQuestions(prevRiskAssessment);
    }
  };

  useEffect(() => {
    if (prevRiskAssessment === undefined && finishedSteps.includes("RiskAssessment")) {
      setPrevRiskAssessment(questionnaire);
    }
    if (prevRiskAssessment !== undefined && !isObjectEqual(questionnaire, prevRiskAssessment)) {
      setConfirmModal("promptAssessment");
    }
  }, [finishedSteps, prevRiskAssessment, questionnaire]);

  const handleCancelAssessment = () => {
    handleNextStep("ContactSummary");
  };

  return (
    <RiskAssessmentTemplate
      addAssessmentQuestions={addAssessmentQuestions}
      confirmModal={confirmModal}
      continueLoader={continueLoader}
      currentRiskScore={riskScore}
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

export const RiskAssessmentContent = connect(RiskMapStateToProps, RiskMapDispatchToProps)(RiskAssessmentContentComponent);
