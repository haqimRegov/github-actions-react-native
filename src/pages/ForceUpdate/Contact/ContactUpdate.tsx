import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { ColorCard, ContentPage, CustomSpacer, CustomTextInput, NewMobileInput, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { ERROR } from "../../../data/dictionary";
import { borderBottomGray2, flexRow, fs12BoldGray5, fs12RegGray5, fsTransformNone, px, sh16, sh24, sh4, sw24, sw4 } from "../../../styles";
import { isEmail, isNumber } from "../../../utils";

const { INVESTOR_INFORMATION, EMAIL_VERIFICATION } = Language.PAGE;

interface ContactUpdate {
  contactNumber: IContactNumber[];
  handleCancel?: () => void;
  handleContinue: () => void;
  inputEmail: string;
  inputEmailError: string | undefined;
  resendTimer: number;
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
  resendTimer,
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
    inputMobile.error !== undefined ||
    resendTimer !== 0;

  const otpLabel = resendTimer === 0 ? EMAIL_VERIFICATION.NOTE_LINK : EMAIL_VERIFICATION.LABEL_OTP_REQUEST;
  const resendMinutes = Math.floor(resendTimer / 60);
  const resendSeconds = resendTimer % 60 === 0 ? 0 : resendTimer % 60;
  const formattedResendSeconds = resendSeconds < 10 ? `0${resendSeconds}` : resendSeconds;

  return (
    <ContentPage
      continueDisabled={disabled}
      continueTextStyle={fsTransformNone}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      heading={`${INVESTOR_INFORMATION.HEADING_HELLO}.`}
      labelContinue={INVESTOR_INFORMATION.BUTTON_GET_OTP}
      noBounce={true}
      spaceToHeading={sh24}
      subheading={INVESTOR_INFORMATION.SUBHEADING_EMAIL}
      subtitle={INVESTOR_INFORMATION.SUBTITLE_EMAIL_UPDATE}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <ColorCard
          header={{ label: INVESTOR_INFORMATION.CARD_LABEL_EMAIL, title: INVESTOR_INFORMATION.CARD_TITLE_EMAIL }}
          content={
            <Fragment>
              <CustomTextInput
                autoCapitalize="none"
                error={inputEmailError}
                keyboardType="email-address"
                label={INVESTOR_INFORMATION.LABEL_EMAIL}
                onBlur={checkEmail}
                onChangeText={setInputEmail}
                value={inputEmail}
              />
              <TextSpaceArea spaceToTop={sh4} style={fs12RegGray5} text={otpLabel} />
              {resendTimer !== 0 ? (
                <Fragment>
                  <CustomSpacer space={sh16} />
                  <View style={borderBottomGray2} />
                  <CustomSpacer space={sh16} />
                  <View style={flexRow}>
                    <Text style={fs12RegGray5}>{EMAIL_VERIFICATION.LABEL_PLEASE_TRY_AGAIN}</Text>
                    <CustomSpacer space={sw4} isHorizontal />
                    <Text style={fs12BoldGray5}>
                      {resendMinutes}:{formattedResendSeconds}
                    </Text>
                  </View>
                </Fragment>
              ) : null}
            </Fragment>
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
