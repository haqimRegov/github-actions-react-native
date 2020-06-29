import React, { useEffect, useState } from "react";
import { Alert, Text, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { CheckBox, CustomFlexSpacer, CustomSpacer, CustomTextInput, RoundedButton, SafeAreaPage } from "../../components";
import { TextArea } from "../../components/Input/TextArea";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { SAMPLE_CLIENT } from "../../mocks";
import {
  colorGray,
  flexGrow,
  flexRow,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24RegBlack2,
  fs36SemiBoldBlack2,
  fullHW,
  px,
  sh19,
  sh24,
  sh28,
  sh32,
  sh7,
  sh8,
  sw16,
  sw94,
} from "../../styles";
import { AlertDialog } from "../../utils";

const { PROOF_OF_ADDRESS } = Language.PAGE;
const HEADING: string = "Edgar";

interface AddressProps {
  handleNextStep: (route: string) => void;
}

export const Address = ({ handleNextStep }: AddressProps) => {
  const [sameAddressToggle, setSameAddressToggle] = useState<boolean>(true);
  const [inputMailingAddress, setInputMailingAddress] = useState<string>(SAMPLE_CLIENT.address);
  const [inputPinCode, setInputPinCode] = useState<string>(SAMPLE_CLIENT.pinCode);

  const handleAddressToggle = () => {
    if (sameAddressToggle) {
      setSameAddressToggle(false);
    } else {
      setSameAddressToggle(true);
      setInputMailingAddress(SAMPLE_CLIENT.address);
      setInputPinCode(SAMPLE_CLIENT.pinCode);
    }
  };

  const handleButtonPress = () => {
    Alert.alert("test");
  };

  const handleNavigate = () => {
    handleNextStep(ONBOARDING_ROUTES.ContactDetails);
  };

  const handleSubmit = () => {
    AlertDialog(inputMailingAddress, handleNavigate);
  };

  const container: ViewStyle = { ...fullHW, ...px(sw94), backgroundColor: colorGray._2 };

  useEffect(() => {
    const sameAddress = inputMailingAddress === SAMPLE_CLIENT.address && inputPinCode === SAMPLE_CLIENT.pinCode;
    setSameAddressToggle(sameAddress);
  }, [inputMailingAddress, inputPinCode]);

  return (
    <SafeAreaPage bottomBackgroundColor={colorGray._2} topBackgroundColor={colorGray._2}>
      <ScrollView contentContainerStyle={flexGrow}>
        <View style={container}>
          <CustomSpacer space={sh32} />
          <Text style={fs36SemiBoldBlack2}>{`${HEADING}.`}</Text>
          <Text style={fs24RegBlack2}>{PROOF_OF_ADDRESS.SUBHEADING}</Text>
          <CustomSpacer space={sh8} />
          <Text style={fs16RegBlack2}>{PROOF_OF_ADDRESS.TITLE}</Text>
          <CustomSpacer space={sh24} />
          <Text style={fs16SemiBoldBlack2}>{PROOF_OF_ADDRESS.LABEL_PERMANENT_ADDRESS}</Text>
          <CustomSpacer space={sh19} />
          <CheckBox
            label={PROOF_OF_ADDRESS.LABEL_CHECKBOX}
            onPress={handleAddressToggle}
            style={fs16RegBlack2}
            toggle={sameAddressToggle}
          />
          <CustomSpacer space={sh32} />
          <Text style={fs16RegBlack2}>{PROOF_OF_ADDRESS.LABEL_MAILING_ADDRESS}</Text>
          <CustomSpacer space={sh7} />
          <TextArea onChangeText={setInputMailingAddress} value={inputMailingAddress} />
          <CustomSpacer space={sh24} />
          <Text style={fs16RegBlack2}>{PROOF_OF_ADDRESS.LABEL_PIN_CODE}</Text>
          <CustomSpacer space={sh7} />
          <CustomTextInput onChangeText={setInputPinCode} value={inputPinCode} />
          <CustomFlexSpacer />
          <View style={flexRow}>
            <RoundedButton onPress={handleButtonPress} secondary={true} text={PROOF_OF_ADDRESS.BUTTON_CANCEL} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <RoundedButton onPress={handleSubmit} text={PROOF_OF_ADDRESS.BUTTON_CONTINUE} />
          </View>
          <CustomSpacer space={sh28} />
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
};
