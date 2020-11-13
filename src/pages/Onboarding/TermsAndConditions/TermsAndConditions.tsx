import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, View, ViewStyle } from "react-native";

import {
  BasicAccordion,
  CheckBox,
  ContentPage,
  CustomFlexSpacer,
  CustomPopup,
  CustomSpacer,
  LinkText,
  RadioButtonGroup,
} from "../../../components";
import { Language } from "../../../constants/language";
import { IcoMoon } from "../../../icons";
import { CRS, FATCA, FEA, PRS, UTAndAMP } from "../../../mocks";
import {
  alignItemsStart,
  alignSelfCenter,
  borderBottomBlack21,
  centerVertical,
  flexRow,
  fs12BoldBlack2,
  fs12SemiBoldBlue1,
  fs16SemiBoldBlack2,
  px,
  sh16,
  sh24,
  sh32,
  sh40,
  sh5,
  sh8,
  sw12,
  sw24,
  sw800,
} from "../../../styles";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

const RADIO_CONSENT = [TERMS_AND_CONDITIONS.LABEL_CONSENT_OPTION_YES, TERMS_AND_CONDITIONS.LABEL_CONSENT_OPTION_NO];

interface TermsAndConditionsProps {
  orders: IOrderSummary[];
  setPage: (page: number) => void;
}

export const TermsAndConditions: FunctionComponent<TermsAndConditionsProps> = ({ orders, setPage }: TermsAndConditionsProps) => {
  const [agree1, setAgree1] = useState<boolean>(false);
  const [agree2, setAgree2] = useState<boolean>(false);
  const [agree3, setAgree3] = useState<boolean>(false);
  const [agree4, setAgree4] = useState<boolean>(false);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [fundTypeList, setFundTypeList] = useState<string[]>();
  const [inputConsent, setInputConsent] = useState<number>(0);

  const handleCancel = () => {
    Alert.alert("Cancel");
  };

  const handleAgree1 = () => {
    setAgree1(!agree1);
  };

  const handleAgree2 = () => {
    setAgree2(!agree2);
  };

  const handleAgree3 = () => {
    setAgree3(!agree3);
  };

  const handleAgree4 = () => {
    setAgree4(!agree4);
  };

  const handleContinue = () => {
    setPage(1);
  };

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  const handleInputConsent = (selected: string) => {
    setInputConsent(RADIO_CONSENT.indexOf(selected));
  };

  useEffect(() => {
    const fundTypeArray = orders
      .map((order: IOrderSummary) => order.funds.map((fundOrder: IFundOrderSummary) => fundOrder.fundType))
      .reduce((accumulator, currentValue) => accumulator.concat(currentValue));
    setFundTypeList(fundTypeArray);
  }, [orders]);

  // TODO FEA to be removed
  const TERMS_AND_CONDITION_LIST = [FATCA, CRS, FEA];
  if (fundTypeList?.includes("PRS")) {
    TERMS_AND_CONDITION_LIST.push(PRS);
  }
  if (fundTypeList?.includes("UT" || "AMP")) {
    TERMS_AND_CONDITION_LIST.push(UTAndAMP);
  }

  const termsHeader: ViewStyle = { ...flexRow, ...alignSelfCenter, zIndex: 2 };
  const disabled = !(agree1 === true && agree2 === true && agree3 === true && agree4 === true);

  return (
    <ContentPage
      continueDisabled={disabled}
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      labelContinue={TERMS_AND_CONDITIONS.BUTTON_AGREE}
      subheading={TERMS_AND_CONDITIONS.HEADING}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh8} />
        <View style={termsHeader}>
          <Text style={fs16SemiBoldBlack2}>{TERMS_AND_CONDITIONS.SUBHEADING}</Text>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <CustomPopup popupText={TERMS_AND_CONDITIONS.POPUP_TERMS}>
            <IcoMoon name="info" size={sw24} />
          </CustomPopup>
          <CustomFlexSpacer />
          <LinkText onPress={handleExpandAll} style={fs12SemiBoldBlue1} text={TERMS_AND_CONDITIONS.LABEL_EXPAND_ALL} />
        </View>
        <CustomSpacer space={sh24} />
        <BasicAccordion expandAll={expandAll} expandMultiple={true} sections={TERMS_AND_CONDITION_LIST} />
        <CustomSpacer space={sh32} />
      </View>
      <View style={borderBottomBlack21} />
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <CheckBox label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_1} labelStyle={fs12BoldBlack2} onPress={handleAgree1} toggle={agree1} />
        <CustomSpacer space={sh16} />
        <CheckBox
          checkboxStyle={{ paddingTop: sh5 }}
          label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_2}
          labelStyle={fs12BoldBlack2}
          style={{ ...fs12BoldBlack2, ...alignItemsStart }}
          onPress={handleAgree2}
          toggle={agree2}
        />
        <CustomSpacer space={sh16} />
        <CheckBox
          checkboxStyle={{ paddingTop: sh5 }}
          label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_3}
          labelStyle={fs12BoldBlack2}
          style={{ ...fs12BoldBlack2, ...alignItemsStart, width: sw800 }}
          onPress={handleAgree3}
          toggle={agree3}
        />
        <CustomSpacer space={sh16} />
        <CheckBox label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_4} labelStyle={fs12BoldBlack2} onPress={handleAgree4} toggle={agree4} />
        <CustomSpacer space={sh16} />
        <View style={{ ...centerVertical, ...flexRow }}>
          <Text style={fs16SemiBoldBlack2}>{TERMS_AND_CONDITIONS.LABEL_CONSENT}</Text>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <CustomPopup popupText={TERMS_AND_CONDITIONS.POPUP_CONSENT}>
            <IcoMoon name="info" size={sw24} />
          </CustomPopup>
        </View>
        <CustomSpacer space={sh16} />
        <RadioButtonGroup
          direction="row"
          options={RADIO_CONSENT}
          selected={RADIO_CONSENT[inputConsent]}
          setSelected={handleInputConsent}
          space={sh40}
        />
      </View>
    </ContentPage>
  );
};
