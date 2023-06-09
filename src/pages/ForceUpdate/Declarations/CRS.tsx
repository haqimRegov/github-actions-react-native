import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { ContentPage } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { CrsDeclarationDetails } from "../../../templates";

const { DECLARATIONS } = Language.PAGE;

interface CrsDeclarationProps extends PersonalInfoStoreProps, ForceUpdateContentProps {}

export const CRSContentComponent: FunctionComponent<CrsDeclarationProps> = ({
  addPersonalInfo,
  forceUpdate,
  handleNextStep,
  personalInfo,
  updateForceUpdate,
}: CrsDeclarationProps) => {
  const { principal } = personalInfo;
  const { declarations } = forceUpdate;

  const handlePrincipalCrs = (crsDeclaration: ICrsState) => {
    addPersonalInfo({
      ...personalInfo,
      principal: { declaration: { ...personalInfo.principal!.declaration, crs: { ...crsDeclaration } } },
    });
  };

  const handleContinue = () => {
    const route: TypeForceUpdateRoute = "DeclarationSummary";
    if (personalInfo.editDeclaration === false) {
      addPersonalInfo({ ...personalInfo, editDeclaration: true });
    }
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...forceUpdate.disabledSteps];
    const updatedFinishedSteps: TypeForceUpdateKey[] = [...forceUpdate.finishedSteps];

    const findFinishedCrs = updatedFinishedSteps.indexOf("CRSDeclaration");
    if (findFinishedCrs === -1) {
      updatedFinishedSteps.push("CRSDeclaration");
    }

    const findDeclarationSummary = updatedDisabledSteps.indexOf("DeclarationSummary");
    if (findDeclarationSummary !== -1) {
      updatedDisabledSteps.splice(findDeclarationSummary, 1);
    }

    const findCrs = updatedDisabledSteps.indexOf("CRSDeclaration");
    if (findCrs === -1) {
      updatedDisabledSteps.push("CRSDeclaration");
    }

    const findInvestorInformation = updatedDisabledSteps.indexOf("InvestorInformation");
    if (findInvestorInformation !== -1) {
      updatedDisabledSteps.splice(findInvestorInformation, 1);
    }

    const findRiskAssessment = updatedDisabledSteps.indexOf("RiskAssessment");
    if (findRiskAssessment !== -1) {
      updatedDisabledSteps.splice(findRiskAssessment, 1);
    }

    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });
    handleNextStep(route);
  };

  const isTaxResidentPrincipal = principal?.declaration!.crs!.taxResident! === 0;
  const validateTin = (multipleTin: ITinMultiple[]) =>
    multipleTin
      .map(
        (tin) =>
          tin.country !== "" &&
          ((tin.noTin === false && tin.tinNumber !== "") ||
            (tin.noTin === true && (tin.reason === 0 || tin.reason === 1 || (tin.reason === 2 && tin.explanation !== "")))),
      )
      .includes(false) === false;

  const showTermsPrincipal = isTaxResidentPrincipal || validateTin(principal!.declaration!.crs!.tin!);

  const validationsPrincipal = { showTerms: showTermsPrincipal };

  const showButtonContinuePrincipal = showTermsPrincipal ? handleContinue : undefined;

  const continueEnabledPrincipal =
    showTermsPrincipal &&
    principal?.declaration!.crs!.acceptCrs &&
    principal?.declaration!.crs!.tin!.map((tin) => tin.explanationSaved === true).includes(false) === false;

  const handleBack = () => {
    const checkDeclaration: TypeForceUpdateRoute = declarations.includes("fatca") ? "FATCADeclaration" : "RiskAssessment";
    handleNextStep(checkDeclaration);
  };

  return (
    <ContentPage
      continueDisabled={!continueEnabledPrincipal}
      handleCancel={handleBack}
      handleContinue={showButtonContinuePrincipal}
      labelContinue={DECLARATIONS.BUTTON_ACCEPT_SAVE}
      subheading={DECLARATIONS.CRS_HEADING}>
      <CrsDeclarationDetails
        crs={principal?.declaration?.crs!}
        handleCrsDeclaration={handlePrincipalCrs}
        validations={validationsPrincipal}
      />
    </ContentPage>
  );
};

export const CRSContent = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(CRSContentComponent);
