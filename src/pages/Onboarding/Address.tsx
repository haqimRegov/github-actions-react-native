import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { CheckBox, ContentPage, CustomTextInput, TextInputArea, TextSpaceArea } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { SAMPLE_CLIENT } from "../../mocks";
import { fs12BoldBlack2, fs16RegBlack2, px, sh20, sh24, sh40, sh8, sw16, sw24 } from "../../styles";
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
    handleNextStep(ONBOARDING_ROUTES.PersonalDetails);
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
    <ContentPage
      handleCancel={handleButtonPress}
      handleContinue={handleSubmit}
      heading={GREETINGS}
      noBounce={true}
      subheading={PROOF_OF_ADDRESS.SUBHEADING}
      subtitle={PROOF_OF_ADDRESS.TITLE}
      subtitleStyle={fs16RegBlack2}>
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh20} spaceToTop={sh40} style={fs16RegBlack2} text={PROOF_OF_ADDRESS.LABEL_PERMANENT_ADDRESS} />
        <CheckBox label={PROOF_OF_ADDRESS.LABEL_CHECKBOX} onPress={handleAddressToggle} style={fs12BoldBlack2} toggle={sameAddressToggle} />
        <TextSpaceArea spaceToTop={sh24} spaceToBottom={sh8} style={px(sw16)} text={PROOF_OF_ADDRESS.LABEL_MAILING_ADDRESS} />
        <TextInputArea onChangeText={setInputMailingAddress} value={inputMailingAddress} />
        <CustomTextInput label={PROOF_OF_ADDRESS.LABEL_POST_CODE} onChangeText={setInputPinCode} spaceToTop={sh24} value={inputPinCode} />
      </View>
    </ContentPage>
  );
};
