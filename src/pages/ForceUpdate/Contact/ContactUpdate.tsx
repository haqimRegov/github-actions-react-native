import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { ColorCard, ContentPage, CustomSpacer, CustomTextInput, NewMobileInput } from "../../../components";
import { Language } from "../../../constants";
import { ERROR } from "../../../data/dictionary";
import { fs16RegGray5, fs18BoldGray6, fs24BoldGray6, fsTransformNone, px, sh24, sh4, sh40, sh48, sw24 } from "../../../styles";
import { isEmail, isNumber } from "../../../utils";

const { INVESTOR_INFORMATION } = Language.PAGE;

interface ContactUpdate {
  addPersonalInfo: (state: IPersonalInfoState) => void;
  handleCancel?: () => void;
  handleContinue: () => void;
  inputEmailError: string | undefined;
  personalInfo: IPersonalInfoState;
  setInputEmailError: (value: string | undefined) => void;
}

export const ContactUpdate: FunctionComponent<ContactUpdate> = ({
  addPersonalInfo,
  handleCancel,
  handleContinue,
  inputEmailError,
  personalInfo,
  setInputEmailError,
}: ContactUpdate) => {
  const { principal } = personalInfo;
  const contactNumber = principal!.contactDetails!.contactNumber!;
  const inputEmail = principal!.contactDetails!.emailAddress!;
  const inputMobile = contactNumber[0];

  const setContactNumber = (value: IContactNumber[]) => {
    addPersonalInfo({
      ...personalInfo,
      principal: { ...principal, contactDetails: { ...principal!.contactDetails, contactNumber: value } },
    });
  };

  const setInputMobile = (data: IContactNumber) => {
    const updatedNumber: IContactNumberState[] = [...contactNumber];
    updatedNumber[0] = data as IContactNumberState;
    updatedNumber[0].error = data.value === "" ? undefined : data.error;
    setContactNumber(updatedNumber);
  };

  const setInputEmail = (value: string) =>
    addPersonalInfo({
      ...personalInfo,
      principal: { ...principal, contactDetails: { ...principal?.contactDetails, emailAddress: value } },
    });

  const validateEmail = (value: string) => {
    if (isEmail(value) === false) {
      return ERROR.INVESTMENT_INVALID_EMAIL;
    }
    return undefined;
  };

  const validateMobile = () => {
    const updatedNumber: IContactNumberState[] = [...contactNumber];
    if (isNumber(updatedNumber[0].value) === true || updatedNumber[0].value === "") {
      const errorCheck = updatedNumber[0].value === "" ? ERROR.INVALID_NUMBER : undefined;
      updatedNumber[0].error = errorCheck;
    }
    setContactNumber(updatedNumber);
  };

  const checkEmail = () => {
    setInputEmailError(validateEmail(inputEmail));
  };

  const disabled =
    inputEmail === "" ||
    inputEmailError !== undefined ||
    validateEmail(inputEmail) !== undefined ||
    inputMobile.value === "" ||
    inputMobile.error !== undefined;

  const defaultContentProps = {
    headingStyle: fs24BoldGray6,
    spaceToBottom: sh48,
    spaceToHeading: sh24,
    spaceToTitle: sh4,
    subheadingStyle: fs18BoldGray6,
    subtitleStyle: fs16RegGray5,
    spaceToTop: sh40,
  };

  return (
    <ContentPage
      continueDisabled={disabled}
      continueTextStyle={fsTransformNone}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      heading={`${INVESTOR_INFORMATION.HEADING_HELLO} ${personalInfo.principal!.personalDetails!.name},`}
      labelContinue={INVESTOR_INFORMATION.BUTTON_GET_OTP}
      noBounce={true}
      subheading={INVESTOR_INFORMATION.SUBHEADING_EMAIL}
      subtitle={INVESTOR_INFORMATION.SUBTITLE_EMAIL_UPDATE}
      {...defaultContentProps}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <ColorCard
          header={{ label: INVESTOR_INFORMATION.CARD_LABEL_EMAIL, title: INVESTOR_INFORMATION.CARD_TITLE_EMAIL }}
          content={
            <CustomTextInput
              autoCapitalize="none"
              error={inputEmailError}
              keyboardType="email-address"
              label={INVESTOR_INFORMATION.LABEL_EMAIL}
              onBlur={checkEmail}
              onChangeText={setInputEmail}
              value={inputEmail}
            />
          }
        />
        <CustomSpacer space={sh24} />
        <ColorCard
          header={{ label: INVESTOR_INFORMATION.CARD_LABEL_MOBILE }}
          content={
            <NewMobileInput
              data={inputMobile}
              handleContactNumber={setInputMobile}
              keyboardType="numeric"
              maxLength={15}
              onBlur={validateMobile}
              placeholder="12 3456 7890"
            />
          }
        />
      </View>
    </ContentPage>
  );
};
