import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View, ViewStyle } from "react-native";

import { ContentPage, CustomSpacer, CustomTextInput, CustomTooltip, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import {
  flexRow,
  fs12BoldBlack2,
  fs12BoldWhite1,
  fs12RegBlack2,
  fsTransformNone,
  px,
  sh136,
  sh16,
  sh24,
  sh32,
  sh8,
  sw02,
  sw12,
  sw16,
  sw24,
  sw264,
  sw320,
  sw7,
  sw8,
} from "../../../styles";

const { EMAIL_VERIFICATION } = Language.PAGE;

declare interface VerificationProps {
  addPersonalInfo: (state: IPersonalInfoState) => void;
  accountType: TypeAccountChoices;
  handleCancel?: () => void;
  handleContinue: () => void;
  isJointEmail: boolean;
  personalInfo: IPersonalInfoState;
}

export const Verification: FunctionComponent<VerificationProps> = ({
  accountType,
  addPersonalInfo,
  handleCancel,
  handleContinue,
  isJointEmail,
  personalInfo,
}: VerificationProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const { joint, principal } = personalInfo!;
  const inputPrincipalEmail = principal!.contactDetails!.emailAddress!;
  const inputJointEmail = joint!.contactDetails!.emailAddress!;

  const setInputPrincipalEmail = (value: string) =>
    addPersonalInfo({
      ...personalInfo,
      principal: { ...principal, contactDetails: { ...principal?.contactDetails, emailAddress: value } },
    });

  const setInputJointEmail = (value: string) =>
    addPersonalInfo({
      ...personalInfo,
      joint: { ...joint, contactDetails: { ...joint?.contactDetails, emailAddress: value } },
    });

  const handleCloseModal = () => {
    setShowInfo(false);
  };

  useEffect(() => {
    if (personalInfo.principal?.contactDetails?.emailAddress !== "") {
      setShowInfo(false);
    }
  }, [personalInfo]);

  const tooltipContent = (
    <View>
      <Text style={fs12BoldWhite1}>{EMAIL_VERIFICATION.TOOLTIP_CONTENT}</Text>
    </View>
  );
  const contentStyle: ViewStyle = { width: sw264 };
  const principalEmailLabel = accountType === "Individual" ? EMAIL_VERIFICATION.LABEL_EMAIL : EMAIL_VERIFICATION.LABEL_EMAIL_PRINCIPAL;
  const disabled = isJointEmail === false ? inputPrincipalEmail === "" : inputPrincipalEmail === "" || inputJointEmail === "";

  return (
    <ContentPage
      continueTextStyle={fsTransformNone}
      handleCancel={handleCancel!}
      handleContinue={handleContinue}
      labelContinue={EMAIL_VERIFICATION.LABEL_GET_OTP}
      noBounce={false}
      subheading={EMAIL_VERIFICATION.HEADING}
      subtitle={EMAIL_VERIFICATION.SUBHEADING}
      continueDisabled={disabled}>
      <View style={flexRow}>
        <CustomSpacer isHorizontal={true} space={sw24} />
        <View>
          <CustomSpacer space={sh24} />
          <Text style={fs12BoldBlack2}>{principalEmailLabel}</Text>
          <CustomTooltip
            content={tooltipContent}
            contentStyle={contentStyle}
            isVisible={showInfo}
            onClose={handleCloseModal}
            arrowSize={{ width: sw12, height: sw7 }}
            spacing={sw8}
            tooltipStyle={{ top: sh136 }}>
            <CustomTextInput
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setInputPrincipalEmail}
              spaceToBottom={sh8}
              value={inputPrincipalEmail}
            />
          </CustomTooltip>
          <Text style={{ ...fs12RegBlack2, ...px(sw12), letterSpacing: sw02 }}> {EMAIL_VERIFICATION.NOTE_LINK}</Text>
          {isJointEmail === true ? (
            <Fragment>
              <CustomSpacer space={sh32} />
              <Text style={fs12BoldBlack2}>{EMAIL_VERIFICATION.LABEL_EMAIL_JOINT}</Text>
              <CustomTextInput
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setInputJointEmail}
                spaceToBottom={sh8}
                value={inputJointEmail}
              />
              <Text style={{ ...fs12RegBlack2, ...px(sw12) }}> {EMAIL_VERIFICATION.NOTE_LINK}</Text>
            </Fragment>
          ) : null}
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <TextSpaceArea
              spaceToBottom={sh32}
              spaceToTop={sh16}
              style={{ ...fs12RegBlack2, letterSpacing: sw02, maxWidth: sw320 }}
              text={EMAIL_VERIFICATION.NOTE_SPAM}
            />
          </View>
        </View>
      </View>
    </ContentPage>
  );
};
