import React, { useState, useEffect } from "react";
import { Text, View, ViewStyle, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ONBOARDING_ROUTES, Language } from "../../constants";
import { SafeAreaPage, CustomSpacer, CustomFlexSpacer, CheckBox, RoundedButton, CustomTextInput } from "../../components";
import {
  colorGray,
  fullHW,
  sh8,
  sh24,
  sh19,
  sh32,
  sw94,
  px,
  flexRow,
  sw16,
  sw240,
  fs36SemiBoldBlack2,
  fs24RegBlack2,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs15SemiBoldBlack2,
  fs15SemiBoldWhite,
  sh7,
  flexChild,
  sh28,
} from "../../styles";
import { SAMPLE_CLIENT_ADDRESS } from "../../mocks";
import { TextArea } from "../../components/Input/TextArea";

const {
  BUTTON_CANCEL,
  BUTTON_CONTINUE,
  LABEL_CHECKBOX,
  LABEL_MAILING_ADDRESS,
  LABEL_PERMANENT_ADDRESS,
  LABEL_PIN_CODE,
  QUESTION,
  TITLE,
} = Language.PAGE.PROOF_OF_ADDRESS;
const USER_NAME: string = "Edgar";

interface AddressProps {
  handleNextStep: (route: string) => void;
}

export const Address = ({ handleNextStep }: AddressProps) => {
  const [permanentAddressToggle, setPermanentAddressToggle] = useState<boolean>(true);
  const pageContainer: ViewStyle = { backgroundColor: colorGray._2, ...fullHW, ...px(sw94) };
  const [inputMailingAddress, setInputMailingAddress] = useState<string>(SAMPLE_CLIENT_ADDRESS.address);
  const [inputPinCode, setInputPinCode] = useState<string>(SAMPLE_CLIENT_ADDRESS.pinCode);
  const handleAddressToggle = () => {
    if (permanentAddressToggle !== true) {
      setInputMailingAddress(SAMPLE_CLIENT_ADDRESS.address);
      setInputPinCode(SAMPLE_CLIENT_ADDRESS.pinCode);
    } else {
      setInputMailingAddress("");
      setInputPinCode("");
    }
    setPermanentAddressToggle(!permanentAddressToggle);
  };
  useEffect(() => {
    if (permanentAddressToggle === true) {
      setInputMailingAddress(SAMPLE_CLIENT_ADDRESS.address);
      setInputPinCode(SAMPLE_CLIENT_ADDRESS.pinCode);
    } else {
      setInputMailingAddress("");
      setInputPinCode("");
    }
  }, []);
  const handleButtonPress = () => {
    Alert.alert("test");
  };
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.ContactDetails);
  };

  return (
    <SafeAreaPage>
      <ScrollView style={flexChild} contentContainerStyle={pageContainer}>
        <CustomSpacer space={sh32} />
        <Text style={fs36SemiBoldBlack2}>{`${USER_NAME}.`}</Text>
        <Text style={fs24RegBlack2}>{TITLE}</Text>
        <CustomSpacer space={sh8} />
        <Text style={fs16RegBlack2}>{QUESTION}</Text>
        <CustomSpacer space={sh24} />
        <Text style={fs16SemiBoldBlack2}>{LABEL_PERMANENT_ADDRESS}</Text>
        <CustomSpacer space={sh19} />
        <CheckBox label={LABEL_CHECKBOX} toggle={permanentAddressToggle} style={fs16RegBlack2} onPress={handleAddressToggle} />
        <CustomSpacer space={sh32} />
        <Text style={fs16RegBlack2}>{LABEL_MAILING_ADDRESS}</Text>
        <CustomSpacer space={sh7} />
        <TextArea onChangeText={setInputMailingAddress} value={inputMailingAddress} editable={!permanentAddressToggle} />
        <CustomSpacer space={sh24} />
        <Text style={fs16RegBlack2}>{LABEL_PIN_CODE}</Text>
        <CustomSpacer space={sh7} />
        <CustomTextInput onChangeText={setInputPinCode} value={inputPinCode} editable={!permanentAddressToggle} />
        <CustomFlexSpacer />
        <View style={flexRow}>
          <RoundedButton
            onPress={handleButtonPress}
            text={BUTTON_CANCEL}
            secondary={true}
            buttonStyle={{ width: sw240 }}
            textStyle={fs15SemiBoldBlack2}
          />
          <CustomSpacer space={sw16} isHorizontal={true} />
          <RoundedButton onPress={handleSubmit} text={BUTTON_CONTINUE} buttonStyle={{ width: sw240 }} textStyle={fs15SemiBoldWhite} />
        </View>
        <CustomSpacer space={sh28} />
      </ScrollView>
    </SafeAreaPage>
  );
};
