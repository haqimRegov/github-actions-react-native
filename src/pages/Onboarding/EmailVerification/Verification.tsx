import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View, ViewStyle } from "react-native";

import { ContentPage, CustomSpacer, CustomTextInput, CustomTooltip, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { ERROR } from "../../../data/dictionary";
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
import { isEmail } from "../../../utils";

const { EMAIL_VERIFICATION, PERSONAL_DETAILS } = Language.PAGE;

declare interface VerificationProps {
  accountType: TypeAccountChoices;
  addPersonalInfo: (state: IPersonalInfoState) => void;
  handleCancel?: () => void;
  handleContinue: () => void;
  jointEmailCheck: boolean;
  jointError: string | undefined;
  personalInfo: IPersonalInfoState;
  principalError: string | undefined;
  setJointError: (value: string | undefined) => void;
  setPrincipalError: (value: string | undefined) => void;
}

export const Verification: FunctionComponent<VerificationProps> = ({
  accountType,
  addPersonalInfo,
  handleCancel,
  handleContinue,
  jointEmailCheck,
  jointError,
  personalInfo,
  principalError,
  setJointError,
  setPrincipalError,
}: VerificationProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const { joint, principal } = personalInfo;
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

  const validateEmail = (value: string) => {
    if (isEmail(value) === false) {
      return ERROR.INVESTMENT_INVALID_EMAIL;
    }
    return undefined;
  };

  const checkPrincipalEmail = () => {
    setPrincipalError(validateEmail(inputPrincipalEmail));
  };

  const checkJointEmail = () => {
    if (inputJointEmail !== "" || jointEmailCheck === true) {
      setJointError(validateEmail(inputJointEmail));
    } else {
      setJointError(undefined);
    }
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
  const disabled =
    jointEmailCheck === false
      ? inputPrincipalEmail === "" || principalError !== undefined || validateEmail(inputPrincipalEmail) !== undefined
      : inputPrincipalEmail === "" ||
        inputJointEmail === "" ||
        principalError !== undefined ||
        jointError !== undefined ||
        validateEmail(inputPrincipalEmail) !== undefined ||
        validateEmail(inputJointEmail) !== undefined;
  const subtitle = jointEmailCheck === true ? EMAIL_VERIFICATION.SUBHEADING_JOINT : EMAIL_VERIFICATION.SUBHEADING;
  const jointLabel =
    jointEmailCheck === false
      ? `${EMAIL_VERIFICATION.LABEL_EMAIL_JOINT} ${PERSONAL_DETAILS.LABEL_OPTIONAL}`
      : EMAIL_VERIFICATION.LABEL_EMAIL_JOINT;

  return (
    <ContentPage
      continueTextStyle={fsTransformNone}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      labelContinue={EMAIL_VERIFICATION.LABEL_GET_OTP}
      noBounce={false}
      subheading={EMAIL_VERIFICATION.HEADING}
      subtitle={subtitle}
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
              error={principalError}
              keyboardType="email-address"
              onBlur={checkPrincipalEmail}
              onChangeText={setInputPrincipalEmail}
              value={inputPrincipalEmail}
            />
          </CustomTooltip>
          {accountType === "Joint" ? null : (
            <TextSpaceArea
              spaceToTop={sh8}
              style={{ ...fs12RegBlack2, ...px(sw16), letterSpacing: sw02 }}
              text={EMAIL_VERIFICATION.NOTE_VERIFICATION_LINK}
            />
          )}
          {accountType === "Joint" ? (
            <Fragment>
              <CustomSpacer space={sh32} />
              <Text style={fs12BoldBlack2}>{jointLabel}</Text>
              <CustomTextInput
                autoCapitalize="none"
                error={jointError}
                keyboardType="email-address"
                onBlur={checkJointEmail}
                onChangeText={setInputJointEmail}
                spaceToBottom={sh8}
                value={inputJointEmail}
              />
              <Text style={{ ...fs12RegBlack2, ...px(sw16) }}> {EMAIL_VERIFICATION.NOTE_LINK}</Text>
            </Fragment>
          ) : null}
          <View style={flexRow}>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <TextSpaceArea
              spaceToBottom={jointEmailCheck === true ? sh32 : 0}
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
