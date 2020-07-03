import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import {
  CheckBox,
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  RoundedButton,
  SafeAreaPage,
  TextInputArea,
  TextSpaceArea,
} from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { SAMPLE_CLIENT } from "../../mocks";
import {
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
const SAMPLE_NAME: string = "Edgar";
const GREETINGS: string = `${SAMPLE_NAME}.`;

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
      setInputMailingAddress("");
      setInputPinCode("");
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
    const details = `${inputMailingAddress} ${inputPinCode}`;
    AlertDialog(details, handleNavigate);
  };

  useEffect(() => {
    const sameAddress = inputMailingAddress === SAMPLE_CLIENT.address && inputPinCode === SAMPLE_CLIENT.pinCode;
    setSameAddressToggle(sameAddress);
  }, [inputMailingAddress, inputPinCode]);

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
        <View style={{ ...fullHW, ...px(sw94) }}>
          <TextSpaceArea spaceToTop={sh32} style={fs36SemiBoldBlack2} text={GREETINGS} />
          <TextSpaceArea spaceToBottom={sh8} style={fs24RegBlack2} text={PROOF_OF_ADDRESS.SUBHEADING} />
          <TextSpaceArea spaceToBottom={sh24} style={fs16RegBlack2} text={PROOF_OF_ADDRESS.TITLE} />
          <TextSpaceArea spaceToBottom={sh19} style={fs16SemiBoldBlack2} text={PROOF_OF_ADDRESS.LABEL_PERMANENT_ADDRESS} />
          <CheckBox
            label={PROOF_OF_ADDRESS.LABEL_CHECKBOX}
            onPress={handleAddressToggle}
            style={fs16RegBlack2}
            toggle={sameAddressToggle}
          />
          <TextSpaceArea spaceToBottom={sh7} spaceToTop={sh32} style={fs16RegBlack2} text={PROOF_OF_ADDRESS.LABEL_MAILING_ADDRESS} />
          <TextInputArea onChangeText={setInputMailingAddress} value={inputMailingAddress} />
          <TextSpaceArea spaceToBottom={sh7} spaceToTop={sh24} style={fs16RegBlack2} text={PROOF_OF_ADDRESS.LABEL_POST_CODE} />
          <CustomTextInput onChangeText={setInputPinCode} value={inputPinCode} />
          <CustomFlexSpacer />
          <CustomSpacer space={sh24} />
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
