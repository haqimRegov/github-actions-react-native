import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { ColorCard, ContentPage, CustomSpacer, CustomTextInput, NewMobileInput } from "../../../components";
import { Language } from "../../../constants";
import { ERROR } from "../../../data/dictionary";
import { fs16RegGray5, fs18BoldGray6, fs24BoldGray6, fsTransformNone, px, sh24, sh4, sh40, sh48, sw24 } from "../../../styles";
import { isEmail, isNumber } from "../../../utils";

const { INVESTOR_INFORMATION } = Language.PAGE;

interface ContactUpdate {
  contactNumber: IContactNumber[];
  handleCancel?: () => void;
  handleContinue: () => void;
  inputEmail: string;
  inputEmailError: string | undefined;
  isOtpNeeded: boolean;
  name: string;
  setContactNumber: (value: IContactNumber[]) => void;
  setInputEmail: (value: string) => void;
  setInputEmailError: (value: string | undefined) => void;
}

export const ContactUpdate: FunctionComponent<ContactUpdate> = ({
  contactNumber,
  handleCancel,
  handleContinue,
  inputEmail,
  inputEmailError,
  isOtpNeeded,
  name,
  setContactNumber,
  setInputEmail,
  setInputEmailError,
}: ContactUpdate) => {
  const inputMobile = contactNumber[0];

  const setInputMobile = (data: IContactNumber) => {
    const updatedNumber: IContactNumberState[] = [...contactNumber];
    updatedNumber[0] = data as IContactNumberState;
    updatedNumber[0].error = data.value === "" ? undefined : data.error;
    setContactNumber(updatedNumber);
  };
  const validateEmail = (value: string) => {
    if (isEmail(value) === false) {
      return ERROR.INVESTMENT_INVALID_EMAIL;
    }
    return undefined;
  };

  const validateMobile = () => {
    const updatedNumber: IContactNumber = { ...inputMobile };
    if (isNumber(updatedNumber.value) === true || updatedNumber.value === "") {
      const errorCheck = updatedNumber.value === "" ? ERROR.INVALID_NUMBER : undefined;
      updatedNumber.error = errorCheck;
    }
    setInputMobile(updatedNumber);
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
      heading={`${INVESTOR_INFORMATION.HEADING_HELLO} ${name},`}
      labelContinue={isOtpNeeded === true ? INVESTOR_INFORMATION.BUTTON_GET_OTP : INVESTOR_INFORMATION.BUTTON_SAVE}
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
