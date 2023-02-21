import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomSpacer, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { flexChild, fsTransformNone, sh24 } from "../../../styles";
import { isNotEmpty, titleCaseString } from "../../../utils";
import { Joint } from "./Joint";
import { SummaryJointDetails } from "./JointDetails";
import { Principal } from "./Principal";

const { SUMMARY } = Language.PAGE;

interface PersonalInfoSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalInfoSummaryComponent: FunctionComponent<PersonalInfoSummaryProps> = ({
  accountType,
  addPersonalInfo,
  client,
  details,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: PersonalInfoSummaryProps) => {
  const { jointHolder, principalHolder } = details!;
  const { isEtb: isPrincipalEtb } = principalHolder!;
  const { isEtb: isJointEtb } = jointHolder!;
  const { disabledSteps, finishedSteps, riskInfo } = onboarding;

  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);

  const handleEdit = (value: TypeOnboardingKey) => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];

    // add to disabledSteps when editing
    if (updatedDisabledSteps.includes("PersonalInfoSummary") === false) {
      updatedDisabledSteps.push("PersonalInfoSummary");
    }

    // enable edit mode
    addPersonalInfo({ ...personalInfo, editMode: true });

    updateOnboarding({ ...onboarding, disabledSteps: updatedDisabledSteps });

    handleNextStep(value);
  };

  const handleContinue = () => {
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("PersonalInfoSummary") === false) {
      updatedFinishedSteps.push("PersonalInfoSummary");
    }
    if (updatedFinishedSteps.includes("PersonalInformation") === false) {
      updatedFinishedSteps.push("PersonalInformation");
    }

    // remove from disabledSteps
    const findPersonalInfoSummary = updatedDisabledSteps.indexOf("PersonalInfoSummary");
    if (findPersonalInfoSummary !== -1) {
      updatedDisabledSteps.splice(findPersonalInfoSummary, 1);
    }

    // remove from disabledSteps (next step)
    const findDeclarations = updatedDisabledSteps.indexOf("Declarations");
    if (findDeclarations !== -1) {
      updatedDisabledSteps.splice(findDeclarations, 1);
    }

    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });

    handleNextStep("FATCADeclaration");
  };

  const handleCloseViewer = () => {
    setViewFile(undefined);
  };

  // const isAllEpf = personalInfo.isAllEpf !== undefined ? personalInfo.isAllEpf : false;
  const incomeDistribution = { incomeDistribution: personalInfo.incomeDistribution };

  // TODO templates (same with Risk Summary)
  const checkIdType = (data: IClientBasicInfo) => {
    const otherIdType = isNotEmpty(data.otherIdType) ? titleCaseString(data.otherIdType!) : data.otherIdType;
    const idType = isNotEmpty(data.idType) && data.idType !== "NRIC" ? titleCaseString(data.idType!) : data.idType;

    return data.idType === "Other" ? `${otherIdType} ${SUMMARY.LABEL_ID}` : idType;
  };

  const accountDetailsArray: LabeledTitleProps[] = [
    {
      label: accountType === "Joint" ? SUMMARY.LABEL_PRINCIPAL_NAME : SUMMARY.LABEL_INVESTOR_NAME,
      title: principalHolder!.name,
      titleStyle: fsTransformNone,
    },
    {
      label:
        accountType === "Joint"
          ? `${SUMMARY.LABEL_PRINCIPAL} ${checkIdType(principalHolder!)}`
          : `${SUMMARY.LABEL_INVESTOR} ${checkIdType(principalHolder!)}`,
      title: principalHolder!.id,
      titleStyle: fsTransformNone,
    },
    {
      label: SUMMARY.LABEL_RISK_CATEGORY,
      title: isNotEmpty(riskInfo) && riskInfo.appetite !== "" ? riskInfo.appetite : "-",
      titleStyle: fsTransformNone,
    },
  ];
  if (client.accountType === "Joint") {
    accountDetailsArray.push(
      {
        label: SUMMARY.LABEL_JOINT_NAME,
        title: jointHolder!.name,
        titleStyle: fsTransformNone,
      },
      {
        label: `${SUMMARY.LABEL_JOINT} ${checkIdType(jointHolder!)}`,
        title: jointHolder!.id,
        titleStyle: fsTransformNone,
      },
    );
  }

  // const scaledSpace = DEVICE.SCREEN.WIDTH > 1080 ? scaledSpaceBetween() : sw32;
  // const accountTitle = `${client.accountType} ${SUMMARY.LABEL_ACCOUNT}`;

  return (
    <View style={flexChild}>
      <ContentPage noBounce={true} subheading={SUMMARY.HEADING} subtitle={SUMMARY.SUBHEADING}>
        {isPrincipalEtb === false ? (
          <Principal
            accountType={accountType!}
            handleCloseViewer={handleCloseViewer}
            handleEdit={handleEdit}
            setViewFile={setViewFile}
            summary={{ ...personalInfo.principal!, ...incomeDistribution }}
            viewFile={viewFile}
          />
        ) : null}
        {accountType === "Individual" || isJointEtb === true ? null : (
          <Joint
            handleCloseViewer={handleCloseViewer}
            handleEdit={handleEdit}
            setViewFile={setViewFile}
            summary={{ ...personalInfo.joint! }}
            viewFile={viewFile}
          />
        )}
        {accountType === "Individual" ? null : <SummaryJointDetails handleNextStep={handleNextStep} personalInfo={personalInfo} />}
      </ContentPage>
      <CustomSpacer space={sh24} />
      <SelectionBanner label={SUMMARY.BANNER_TITLE} labelSubmit={SUMMARY.BUTTON_NEXT} submitOnPress={handleContinue} />
    </View>
  );
};

export const PersonalInfoSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalInfoSummaryComponent);
