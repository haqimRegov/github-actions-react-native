import React, { Fragment, FunctionComponent, useState } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";

import {
  AdvancedDropdown,
  CustomFlexSpacer,
  CustomSpacer,
  LabeledTitle,
  RoundedButton,
  SafeAreaPage,
  TextSpaceArea,
} from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_ALL_ID, DICTIONARY_ALL_ID_TYPE, DICTIONARY_COUNTRIES } from "../../../data/dictionary";
import { SAMPLE_CLIENT_5 } from "../../../mocks";
import { uploadClientId } from "../../../network-actions";
import { ClientStoreProps, PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../../store";
import {
  borderBottomGray4,
  flexGrow,
  fs10BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  px,
  sh24,
  sh32,
  sh40,
  sh56,
  sh8,
  sw24,
} from "../../../styles";
import { IDVerification } from "./IDVerification";
import { UploadID } from "./UploadID";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

interface IdentityConfirmationProps extends PersonalInfoStoreProps, ClientStoreProps, OnboardingContentProps {}
const IdentityConfirmationComponent: FunctionComponent<IdentityConfirmationProps> = ({
  accountType,
  addClientDetails,
  addPersonalInfo,
  details,
  handleCancelOnboarding,
  handleNextStep,
  personalInfo,
  riskScore,
}: IdentityConfirmationProps) => {
  // TODO issue in dropdown and keyboard avoiding view
  const { principal, joint } = personalInfo;
  const { idNumber, idType, otherIdType } = details!;
  const clientIdType = idType === "Other" ? otherIdType : idType;
  const defaultPage = personalInfo.editMode === true ? 1 : 0;
  const [page, setPage] = useState<number>(defaultPage);
  const principalFrontPage = principal!.personalDetails!.id!.frontPage;
  const principalSecondPage = principal!.personalDetails!.id!.secondPage;
  const jointFrontPage = joint!.personalDetails!.id!.frontPage;
  const jointSecondPage = joint!.personalDetails!.id!.secondPage;
  const inputJointIdType = joint!.personalDetails!.idType!;
  const extractedIdType = typeof clientIdType! === "string" ? clientIdType! : DICTIONARY_ALL_ID_TYPE[clientIdType!];
  const isPrincipalMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(extractedIdType as TypeClientID) !== 1;

  const handlePrincipalDetails = (value: IClientIDState) =>
    addPersonalInfo({ ...personalInfo, principal: { ...principal, personalDetails: { ...principal!.personalDetails, id: { ...value } } } });
  const setPrincipalSecondPage = (value?: FileBase64) => handlePrincipalDetails({ ...principal!.personalDetails?.id!, secondPage: value });

  const handleJointDetails = (value: IClientIDState) =>
    addPersonalInfo({ ...personalInfo, principal: { ...joint, personalDetails: { ...joint!.personalDetails, id: { ...value } } } });
  const setJointSecondPage = (value?: FileBase64) => handleJointDetails({ ...joint!.personalDetails?.id!, secondPage: value });

  const setInputJointIdType = (value: string) =>
    addPersonalInfo({ ...personalInfo, joint: { ...joint!, personalDetails: { ...joint!.personalDetails, idType: value } } });

  // TODO validation
  const buttonDisabled = false;

  const handleContinue = () => {
    // TODO validation
    const principalMailingAddress = personalInfo.principal!.addressInformation?.mailingAddress!;
    setPage(1);
    if (accountType === "Joint") {
      addPersonalInfo({
        ...personalInfo,
        joint: {
          ...joint,
          addressInformation: { ...joint!.addressInformation, mailingAddress: { ...principalMailingAddress } },
        },
      });
    }
  };

  const handlePrincipalUpload = (uploaded?: FileBase64) => {
    if (uploaded !== undefined) {
      const ocrResponse = uploadClientId("token", uploaded);

      const principalInfo: IHolderInfoState = {
        ...principal,
        personalDetails: {
          ...principal?.personalDetails,
          dateOfBirth: ocrResponse.dateOfBirth,
          gender: ocrResponse.gender!,
          idNumber: idNumber,
          idType: clientIdType,
          id: {
            frontPage: uploaded,
          },
          name: ocrResponse.name,
          nationality: isPrincipalMalaysian ? DICTIONARY_COUNTRIES[133].value : "",
        },
        addressInformation: {
          mailingAddress: {
            address: ocrResponse.permanentAddress?.address || "",
            city: ocrResponse.permanentAddress?.city || "",
            country: ocrResponse.permanentAddress?.country || "",
            postCode: ocrResponse.permanentAddress?.postCode || "",
            state: ocrResponse.permanentAddress?.state || "",
          },
          permanentAddress: {
            address: ocrResponse.permanentAddress?.address || "",
            city: ocrResponse.permanentAddress?.city || "",
            country: ocrResponse.permanentAddress?.country || "",
            postCode: ocrResponse.permanentAddress?.postCode || "",
            state: ocrResponse.permanentAddress?.state || "",
          },
        },
      };
      return addPersonalInfo({ ...personalInfo, principal: principalInfo });
    }
    return handlePrincipalDetails({ ...principal!.personalDetails?.id!, frontPage: undefined });
  };

  const handleJointUpload = (uploaded?: FileBase64) => {
    if (uploaded !== undefined) {
      // const ocrResponse = uploadClientId("token", uploaded);
      // TODO temporary
      const ocrResponse = SAMPLE_CLIENT_5;
      const jointIdType = joint!.personalDetails?.idType || ocrResponse.idType;
      const isJointMalaysian = DICTIONARY_ALL_ID_TYPE.indexOf(jointIdType as TypeClientID) !== 1;
      const jointInfo: IHolderInfoState = {
        ...joint,
        personalDetails: {
          ...joint!.personalDetails,
          dateOfBirth: ocrResponse.dateOfBirth,
          gender: ocrResponse.gender!,
          idNumber: ocrResponse.idNumber || "",
          idType: ocrResponse.idType || "NRIC",
          id: {
            frontPage: uploaded,
          },
          name: ocrResponse.name,
          nationality: isJointMalaysian ? DICTIONARY_COUNTRIES[133].value : "",
        },
        addressInformation: {
          mailingAddress: {
            address: ocrResponse.permanentAddress?.address || "",
            city: ocrResponse.permanentAddress?.city || "",
            country: ocrResponse.permanentAddress?.country || "",
            postCode: ocrResponse.permanentAddress?.postCode || "",
            state: ocrResponse.permanentAddress?.state || "",
          },
          permanentAddress: {
            address: ocrResponse.permanentAddress?.address || "",
            city: ocrResponse.permanentAddress?.city || "",
            country: ocrResponse.permanentAddress?.country || "",
            postCode: ocrResponse.permanentAddress?.postCode || "",
            state: ocrResponse.permanentAddress?.state || "",
          },
        },
      };
      return addPersonalInfo({ ...personalInfo, joint: jointInfo });
    }
    return handlePrincipalDetails({ ...joint!.personalDetails?.id!, frontPage: undefined });
  };

  const principalTitle = idType !== "Passport" && idType !== "NRIC" ? `${idType} ${IDENTITY_CONFIRMATION.LABEL_ID}` : `${idType}`;
  const defaultPrincipalTitle = `${IDENTITY_CONFIRMATION.SUBHEADING} ${principalTitle}`;

  const jointTitle =
    inputJointIdType !== "Passport" && inputJointIdType !== "NRIC"
      ? `${inputJointIdType} ${IDENTITY_CONFIRMATION.LABEL_ID}`
      : `${inputJointIdType}`;
  const defaultJointTitle = `${IDENTITY_CONFIRMATION.SUBHEADING} ${jointTitle}`;

  return (
    <Fragment>
      {page === 0 ? (
        <SafeAreaPage>
          <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={px(sw24)}>
              <CustomSpacer space={sh32} />
              {accountType === "Individual" ? null : (
                <TextSpaceArea spaceToBottom={sh8} style={fs10BoldBlack2} text={IDENTITY_CONFIRMATION.LABEL_PRINCIPAL} />
              )}
              <LabeledTitle
                label={IDENTITY_CONFIRMATION.HEADING}
                labelStyle={fs24BoldBlack2}
                spaceToLabel={sh8}
                title={defaultPrincipalTitle}
                titleStyle={fs16RegBlack2}
              />
              <CustomSpacer space={sh40} />
              <UploadID
                idType={clientIdType as TypeClientID}
                frontPage={principalFrontPage}
                secondPage={principalSecondPage}
                setFrontPage={handlePrincipalUpload}
                setSecondPage={setPrincipalSecondPage}
              />
              <CustomSpacer space={sh32} />
            </View>
            {accountType === "Individual" ? null : (
              <Fragment>
                <View style={borderBottomGray4} />
                <CustomSpacer space={sh32} />
                <View style={px(sw24)}>
                  <TextSpaceArea spaceToBottom={sh8} style={fs10BoldBlack2} text={IDENTITY_CONFIRMATION.LABEL_JOINT} />
                  <LabeledTitle
                    label={IDENTITY_CONFIRMATION.HEADING}
                    labelStyle={fs24BoldBlack2}
                    spaceToLabel={sh8}
                    spaceToBottom={sh24}
                    title={defaultJointTitle}
                    titleStyle={fs16RegBlack2}
                  />
                  <AdvancedDropdown
                    handleChange={setInputJointIdType}
                    items={DICTIONARY_ALL_ID}
                    label={IDENTITY_CONFIRMATION.LABEL_ID_TYPE}
                    value={inputJointIdType}
                  />
                  <CustomSpacer space={sh24} />
                  <UploadID
                    idType={inputJointIdType as TypeClientID}
                    frontPage={jointFrontPage}
                    secondPage={jointSecondPage}
                    setFrontPage={handleJointUpload}
                    setSecondPage={setJointSecondPage}
                  />
                </View>
              </Fragment>
            )}
            <CustomFlexSpacer />
            <CustomSpacer space={sh56} />
            <View style={px(sw24)}>
              <RoundedButton disabled={buttonDisabled} onPress={handleContinue} text={IDENTITY_CONFIRMATION.BUTTON_CONTINUE} />
            </View>
            <CustomSpacer space={sh56} />
          </ScrollView>
        </SafeAreaPage>
      ) : (
        <IDVerification
          accountType={accountType}
          addClientDetails={addClientDetails}
          addPersonalInfo={addPersonalInfo}
          details={details!}
          handleCancelOnboarding={handleCancelOnboarding!}
          handleNextStep={handleNextStep}
          personalInfo={personalInfo}
          riskScore={riskScore}
        />
      )}
    </Fragment>
  );
};

export const IdentityConfirmation = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(IdentityConfirmationComponent);
