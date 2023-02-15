import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { ContentPage } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import { fsTransformNone } from "../../../styles";
import { isNotEmpty, titleCaseString } from "../../../utils";
import { Joint } from "./Joint";
import { SummaryJointDetails } from "./JointDetails";
import { Principal } from "./Principal";

const { SUMMARY } = Language.PAGE;

interface PersonalInfoSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalInfoSummaryComponent: FunctionComponent<PersonalInfoSummaryProps> = ({
  accountType,
  client,
  details,
  handleNextStep,
  onboarding,
  personalInfo,
  updateOnboarding,
}: PersonalInfoSummaryProps) => {
  const { jointHolder, principalHolder } = details!;
  const { disabledSteps, finishedSteps, riskInfo } = onboarding;

  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);
  const handleContinue = () => {
    handleNextStep("FATCADeclaration");
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];
    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    updatedFinishedSteps.push("PersonalInformation");
    const findDeclarations = updatedDisabledSteps.indexOf("Declarations");
    if (findDeclarations !== -1) {
      updatedDisabledSteps.splice(findDeclarations, 1);
    }
    const findFATCA = updatedDisabledSteps.indexOf("FATCADeclaration");
    if (findFATCA !== -1) {
      updatedDisabledSteps.splice(findFATCA, 1);
    }
    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleCloseViewer = () => {
    setViewFile(undefined);
  };

  const handleBack = () => {
    handleNextStep("AdditionalDetails");
  };

  const isAllEpf = personalInfo.isAllEpf !== undefined ? personalInfo.isAllEpf : false;
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
    <ContentPage
      handleCancel={handleBack}
      handleContinue={handleContinue}
      noBounce={true}
      subheading={SUMMARY.HEADING}
      subtitle={SUMMARY.SUBHEADING}>
      {/* {accountType === "Individual" ? null : (
        <View style={px(sw24)}>
          <CustomSpacer space={sh24} />
          <ColorCard
            containerStyle={noBorder}
            content={<TextCard data={accountDetailsArray} itemsPerGroup={3} spaceBetweenItem={scaledSpace} itemStyle={{ width: sw239 }} />}
            contentStyle={{ ...border(colorBlue._3, sw1), backgroundColor: colorBlue._3, ...px(sw24), paddingBottom: sh8 }}
            customHeader={
              <View style={{ ...rowCenterVertical, ...px(sw24) }}>
                <Text style={fs10RegGray6}>{accountTitle}</Text>
              </View>
            }
            header="custom"
            headerStyle={{
              ...border(colorBlue._3, sw1),
              ...px(0),
              ...py(sh8),
              backgroundColor: colorBlue._3,
              borderBottomColor: colorRed._1,
            }}
          />
        </View>
      )} */}
      <Principal
        accountType={accountType!}
        handleCloseViewer={handleCloseViewer}
        handleNextStep={handleNextStep}
        isAllEpf={isAllEpf}
        setViewFile={setViewFile}
        summary={{ ...personalInfo.principal!, ...incomeDistribution }}
        viewFile={viewFile}
      />
      {accountType === "Individual" ? null : (
        <Joint
          handleCloseViewer={handleCloseViewer}
          handleNextStep={handleNextStep}
          setViewFile={setViewFile}
          summary={{ ...personalInfo.joint! }}
          viewFile={viewFile}
        />
      )}
      {accountType === "Individual" ? null : <SummaryJointDetails handleNextStep={handleNextStep} personalInfo={personalInfo} />}
    </ContentPage>
  );
};

export const PersonalInfoSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalInfoSummaryComponent);
