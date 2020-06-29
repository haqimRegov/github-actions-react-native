import React, { useEffect, useState } from "react";
import { Alert, Text, View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { CheckBox, CustomFlexSpacer, CustomSpacer, CustomTextInput, RoundedButton, SafeAreaPage } from "../../components";
import { TextArea } from "../../components/Input/TextArea";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { SAMPLE_CLIENT } from "../../mocks";
import {
  colorGray,
  flexChild,
  flexRow,
  fs15SemiBoldBlack2,
  fs15SemiBoldWhite,
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

const { PROOF_OF_ADDRESS } = Language.PAGE;
const HEADING: string = "Edgar";

interface AddressProps {
  handleNextStep: (route: string) => void;
}

export const Address = ({ handleNextStep }: AddressProps) => {
  const [sameAddressToggle, setSameAddressToggle] = useState<boolean>(true);
  const container: ViewStyle = { ...fullHW, ...px(sw94), backgroundColor: colorGray._2 };
  const [inputMailingAddress, setInputMailingAddress] = useState<string>("");
  const [inputPinCode, setInputPinCode] = useState<string>("");
  const handleAddressToggle = () => {
    setSameAddressToggle(!sameAddressToggle);
  };
  useEffect(() => {
    if (sameAddressToggle === true) {
      setInputMailingAddress(SAMPLE_CLIENT.address);
      setInputPinCode(SAMPLE_CLIENT.pinCode);
    } else {
      setInputMailingAddress("");
      setInputPinCode("");
    }
  }, [sameAddressToggle]);
  const handleButtonPress = () => {
    Alert.alert("test");
  };
  const handleSubmit = () => {
    handleNextStep(ONBOARDING_ROUTES.ContactDetails);
  };

  return (
    <SafeAreaPage bottomBackgroundColor={colorGray._2} topBackgroundColor={colorGray._2}>
      <ScrollView style={flexChild} contentContainerStyle={container}>
        <CustomSpacer space={sh32} />
        <Text style={fs36SemiBoldBlack2}>{`${HEADING}.`}</Text>
        <Text style={fs24RegBlack2}>{PROOF_OF_ADDRESS.SUBHEADING}</Text>
        <CustomSpacer space={sh8} />
        <Text style={fs16RegBlack2}>{PROOF_OF_ADDRESS.TITLE}</Text>
        <CustomSpacer space={sh24} />
        <Text style={fs16SemiBoldBlack2}>{PROOF_OF_ADDRESS.LABEL_PERMANENT_ADDRESS}</Text>
        <CustomSpacer space={sh19} />
        <CheckBox label={PROOF_OF_ADDRESS.LABEL_CHECKBOX} toggle={sameAddressToggle} style={fs16RegBlack2} onPress={handleAddressToggle} />
        <CustomSpacer space={sh32} />
        <Text style={fs16RegBlack2}>{PROOF_OF_ADDRESS.LABEL_MAILING_ADDRESS}</Text>
        <CustomSpacer space={sh7} />
        <TextArea onChangeText={setInputMailingAddress} value={inputMailingAddress} editable={!sameAddressToggle} />
        <CustomSpacer space={sh24} />
        <Text style={fs16RegBlack2}>{PROOF_OF_ADDRESS.LABEL_PIN_CODE}</Text>
        <CustomSpacer space={sh7} />
        <CustomTextInput onChangeText={setInputPinCode} value={inputPinCode} editable={!sameAddressToggle} />
        <CustomFlexSpacer />
        <View style={flexRow}>
          <RoundedButton
            onPress={handleButtonPress}
            text={PROOF_OF_ADDRESS.BUTTON_CANCEL}
            secondary={true}
            textStyle={fs15SemiBoldBlack2}
          />
          <CustomSpacer space={sw16} isHorizontal={true} />
          <RoundedButton onPress={handleSubmit} text={PROOF_OF_ADDRESS.BUTTON_CONTINUE} textStyle={fs15SemiBoldWhite} />
        </View>
        <CustomSpacer space={sh28} />
      </ScrollView>
    </SafeAreaPage>
  );
};
