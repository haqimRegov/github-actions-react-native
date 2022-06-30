import React, { Fragment, FunctionComponent, useRef } from "react";
import { Alert, ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, LabeledTitle, SafeAreaPage, SelectionBanner } from "../../../../components";
import { Language } from "../../../../constants";
import {
  OPTION_CRS_NO_TIN_REQUIRED,
  OPTIONS_CRS_TAX_RESIDENCY,
  OPTIONS_CRS_TIN_REASONS_NEW,
  OPTIONS_FATCA_NO_CERTIFICATE,
} from "../../../../data/dictionary";
import { submitChangeRequest } from "../../../../network-actions";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../../store";
import { colorBlue, flexGrow, fs16RegGray5, fs18BoldGray6, px, sh100, sh24, sh4, sh40, sw24 } from "../../../../styles";
import { DeclarationDetails } from "./Details";

const { DECLARATION_SUMMARY } = Language.PAGE;

interface DeclarationSummaryProps extends PersonalInfoStoreProps, ForceUpdateContentProps {
  navigation: IStackNavigationProp;
}

export const DeclarationSummaryContentComponent: FunctionComponent<DeclarationSummaryProps> = ({
  details,
  handleNextStep,
  navigation,
  forceUpdate,
  personalInfo,
  setLoading,
  updateForceUpdate,
}: DeclarationSummaryProps) => {
  const { finishedSteps } = forceUpdate;
  const { principal } = personalInfo;

  const fetching = useRef<boolean>(false);

  const principalTaxResident = principal!.declaration!.crs!.taxResident!;

  const principalTin = principal!.declaration!.crs!.tin!.map((multiTin) => {
    const reason = multiTin.reason !== -1 ? OPTIONS_CRS_TIN_REASONS_NEW[multiTin.reason!].label : OPTIONS_CRS_TIN_REASONS_NEW[0].label;
    const principalNoTinReason = multiTin.reason === 1 ? OPTION_CRS_NO_TIN_REQUIRED : reason;
    const principalTinReason = multiTin.reason === 2 ? multiTin.explanation! : principalNoTinReason;
    return {
      country: principalTaxResident === 0 ? undefined : multiTin.country!, // undefined if taxResident === 0
      noTin: principalTaxResident === 0 ? undefined : `${multiTin.noTin!}`, // "true" || "false", undefined if taxResident === 0
      reason: principalTaxResident === 0 || multiTin.noTin! === false ? undefined : principalTinReason, // undefined if taxResident === 0, required if noTin === true
      tinNumber: principalTaxResident === 0 || multiTin.noTin! === true ? undefined : multiTin.tinNumber!, // undefined if taxResident === 0 or noTin === true}
    };
  });

  const principalUsCitizen = principal!.declaration!.fatca!.usCitizen! === 0;
  const principalUsBorn = principal!.declaration!.fatca!.usBorn! === 0 ? "true" : "false";
  const principalCertReason =
    principal!.declaration!.fatca!.reason! === 1 ? principal!.declaration!.fatca!.explanation! : OPTIONS_FATCA_NO_CERTIFICATE[0].label;
  const principalConfirmAddress = principal!.declaration!.fatca!.confirmAddress! === 0 ? "true" : "false";

  const address = `${Object.values(principal?.addressInformation?.permanentAddress?.address!).join("")}, ${
    principal?.addressInformation?.permanentAddress?.postCode
  }, ${principal?.addressInformation?.permanentAddress?.city}, ${principal?.addressInformation?.permanentAddress?.state}, ${
    principal?.addressInformation?.permanentAddress?.country
  }`;
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
      declaration: {
        crs: {
          taxResident:
            principalTaxResident === -1 ? OPTIONS_CRS_TAX_RESIDENCY[principalTaxResident].label : OPTIONS_CRS_TAX_RESIDENCY[0].label, // required
          tin: principalTin,
        },
        fatca: {
          formW9: principalUsCitizen ? `${principal!.declaration!.fatca!.formW9!}` : undefined, // "true" || "false", required if usCitizen === true
          formW8Ben: principalUsBorn === "false" ? undefined : `${principal!.declaration!.fatca!.formW8Ben!}`, // "true" || "false", required if usCitizen === false && usBorn === true && confirmAddress === true,
          confirmAddress: principalUsBorn === "false" ? undefined : principalConfirmAddress, // "true" || "false", only required if usCitizen is false and usBorn is true
          certificate: principal!.declaration!.fatca!.certificate, // required if noCertificate === false
          noCertificate: `${principal!.declaration!.fatca!.noCertificate}`, // "true" || "false", required if certificate === undefined
          reason: principal!.declaration!.fatca!.noCertificate === true ? principalCertReason : undefined, // required if noCertificate === true
          usBorn: principalUsCitizen ? undefined : principalUsBorn, // "true" || "false", required if usCitizen === false
          usCitizen: principalUsCitizen ? "true" : "false", // "true" || "false", required
        },
      },
    },
  };

  const handleSetupClient = async () => {
    if (fetching.current === false) {
      fetching.current = true;
      setLoading(true);
      const response: ISubmitChangeRequestResponse = await submitChangeRequest(request, navigation, setLoading);
      fetching.current = false;
      setLoading(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          const updatedFinishedSteps: TypeForceUpdateKey[] = [...finishedSteps];
          updatedFinishedSteps.push("Declarations");
          const newDisabledStep: TypeForceUpdateKey[] = [
            "InvestorInformation",
            "RiskAssessment",
            "Declarations",
            "TermsAndConditions",
            "Signatures",
          ];
          updateForceUpdate({ ...forceUpdate, finishedSteps: updatedFinishedSteps, disabledSteps: newDisabledStep });
          return handleNextStep("TermsAndConditions");
        }

        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          setTimeout(() => {
            Alert.alert(error.message, errorList);
          }, 150);
        }
      }
    }
    return null;
  };

  const handleContinue = () => {
    handleSetupClient();
  };

  return (
    <Fragment>
      <SafeAreaPage>
        <ScrollView
          contentContainerStyle={{ ...flexGrow, backgroundColor: colorBlue._2 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <CustomSpacer space={sh40} />
          <View style={{ ...px(sw24) }}>
            <LabeledTitle
              label={DECLARATION_SUMMARY.HEADING_DECLARATION}
              labelStyle={fs18BoldGray6}
              spaceToLabel={sh4}
              title={DECLARATION_SUMMARY.SUBTITLE_REVIEW}
              titleStyle={fs16RegGray5}
            />
            <CustomSpacer space={sh24} />
            <DeclarationDetails address={address} handleNextStep={handleNextStep} summary={personalInfo.principal?.declaration!} />
            <CustomSpacer space={124} />
          </View>
          <CustomFlexSpacer />
        </ScrollView>
        <SelectionBanner
          containerStyle={{ height: sh100 }}
          label={DECLARATION_SUMMARY.BANNER_TITLE}
          submitOnPress={handleContinue}
          labelSubmit={DECLARATION_SUMMARY.BUTTON_CONFIRM}
        />
      </SafeAreaPage>
    </Fragment>
  );
};

export const DeclarationSummaryContent = connect(
  PersonalInfoMapStateToProps,
  PersonalInfoMapDispatchToProps,
)(DeclarationSummaryContentComponent);
