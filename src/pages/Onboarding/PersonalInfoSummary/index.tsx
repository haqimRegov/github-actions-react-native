import React, { Fragment, FunctionComponent, useState } from "react";
import { View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import { ContentPage, CustomButton, CustomSpacer, defaultContentProps, SelectionBanner } from "../../../components";
import { Language } from "../../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import {
  autoWidth,
  colorBlue,
  colorTransparent,
  flexChild,
  flexRow,
  fs10BoldBlue1,
  fs20BoldBlack2,
  fsTransformNone,
  px,
  sh24,
  sw1,
  sw16,
  sw228,
  sw24,
} from "../../../styles";
import { isNotEmpty, titleCaseString } from "../../../utils";
import { InvestorProfilePage } from "../../NewSales/AccountInfoSummary/Profile";
import { Joint } from "./Joint";
import { SummaryJointDetails } from "./JointDetails";
import { Principal } from "./Principal";

const { NEW_SALES_SUMMARY, SUMMARY } = Language.PAGE;

interface PersonalInfoSummaryProps extends PersonalInfoStoreProps, OnboardingContentProps {}

const PersonalInfoSummaryComponent: FunctionComponent<PersonalInfoSummaryProps> = ({
  accountType,
  addPersonalInfo,
  client,
  details,
  handleNextStep,
  newSales,
  onboarding,
  personalInfo,
  updateOnboarding,
}: PersonalInfoSummaryProps) => {
  const { jointHolder, principalHolder } = details!;
  const { accountDetails } = newSales;
  const { isEtb: isPrincipalEtb } = principalHolder!;
  const { isEtb: isJointEtb } = jointHolder!;
  const { disabledSteps, finishedSteps, riskInfo } = onboarding;

  const [viewFile, setViewFile] = useState<FileBase64 | undefined>(undefined);
  const [page, setPage] = useState<"summary" | "profile">("summary");
  const [currentProfile, setCurrentProfile] = useState<TypeAccountHolder>("Principal");

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

  const handleInvestorProfileBack = () => {
    setPage("summary");
  };
  const handleProfilePage = () => {
    setPage("summary");
  };

  const handlePrincipalProfile = () => {
    setCurrentProfile("Principal");
    setPage("profile");
  };

  const handleJointProfile = () => {
    setCurrentProfile("Joint");
    setPage("profile");
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

  const containerStyle: ViewStyle = {
    ...flexRow,
    borderRadius: sw24,
    borderWidth: sw1,
    borderColor: colorBlue._1,
    height: sh24,
    maxWidth: sw228,
  };

  const profileButtonStyle: ViewStyle = {
    ...px(sw16),
    ...autoWidth,
    backgroundColor: colorTransparent,
    height: sh24,
    borderWidth: 0,
  };
  const checkLabel = client.accountType === "Joint" ? NEW_SALES_SUMMARY.LABEL_PRINCIPAL_PROFILE : NEW_SALES_SUMMARY.LABEL_INVESTOR_PROFILE;
  const checkPrincipalId =
    accountDetails.accountNo !== "" ? details?.principalHolder?.clientId : newSales.investorProfile.principalClientId;
  const checkJointId = accountDetails.accountNo !== "" ? details?.jointHolder?.clientId : newSales.investorProfile.jointClientId;
  const checkClientId = currentProfile === "Principal" ? checkPrincipalId : checkJointId;

  let content: JSX.Element = <View />;
  if (page === "profile") {
    content = <InvestorProfilePage clientId={checkClientId!} handleBack={handleInvestorProfileBack} setPage={handleProfilePage} />;
  }

  return (
    <View style={flexChild}>
      {page === "summary" ? (
        <Fragment>
          <ContentPage
            noBounce={true}
            subheading={SUMMARY.HEADING}
            subtitle={SUMMARY.SUBHEADING}
            sideElement={
              <View>
                <CustomSpacer space={defaultContentProps.spaceToTop!} />
                {isPrincipalEtb === false && isJointEtb === false ? null : (
                  <View style={containerStyle}>
                    {isPrincipalEtb === true ? (
                      <CustomButton
                        secondary={true}
                        buttonStyle={profileButtonStyle}
                        onPress={handlePrincipalProfile}
                        text={checkLabel}
                        textStyle={fs10BoldBlue1}
                      />
                    ) : null}
                    {client.accountType === "Joint" && isJointEtb === true ? (
                      <Fragment>
                        {isPrincipalEtb === true ? <View style={{ borderLeftWidth: sw1, borderColor: colorBlue._1 }} /> : null}
                        <CustomButton
                          secondary={true}
                          buttonStyle={profileButtonStyle}
                          onPress={handleJointProfile}
                          text={NEW_SALES_SUMMARY.LABEL_JOINT_PROFILE}
                          textStyle={fs10BoldBlue1}
                        />
                      </Fragment>
                    ) : null}
                  </View>
                )}
              </View>
            }>
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
          <SelectionBanner
            label={SUMMARY.BANNER_TITLE}
            labelStyle={fs20BoldBlack2}
            labelSubmit={SUMMARY.BUTTON_NEXT}
            submitOnPress={handleContinue}
          />
        </Fragment>
      ) : (
        content
      )}
    </View>
  );
};

export const PersonalInfoSummary = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(PersonalInfoSummaryComponent);
