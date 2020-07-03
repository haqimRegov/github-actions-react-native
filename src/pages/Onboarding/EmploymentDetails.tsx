import React, { useState } from "react";
import { Alert, ScrollView, View, ViewStyle } from "react-native";

import {
  CustomFlexSpacer,
  CustomSpacer,
  CustomTextInput,
  RoundedButton,
  SafeAreaPage,
  TextInputArea,
  TextSpaceArea,
} from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import {
  border,
  colorBlack,
  colorWhite,
  flexGrow,
  flexRow,
  fs16RegBlack2,
  fs16SemiBoldBlack2,
  fs24RegBlack2,
  fullHW,
  px,
  sh24,
  sh28,
  sh32,
  sh40,
  sh7,
  sh8,
  sw16,
  sw350,
  sw94,
} from "../../styles";
import { AlertDialog } from "../../utils";

const { EMPLOYMENT_DETAILS } = Language.PAGE;
interface EmploymentDetailsProps {
  handleNextStep: (route: string) => void;
}

export const EmploymentDetails = ({ handleNextStep }: EmploymentDetailsProps) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputEmployerName, setInputEmployerName] = useState<string>("");
  const [inputPostCode, setInputPostCode] = useState<string>("");

  const handleButtonPress = () => {
    Alert.alert("test");
  };

  const handleNavigate = () => {
    handleNextStep(ONBOARDING_ROUTES.ContactDetails);
  };

  const handleSubmit = () => {
    const details = `${inputAddress} ${inputEmployerName} ${inputPostCode}`;
    AlertDialog(details, handleNavigate);
  };

  const mockPicker: ViewStyle = { ...border(colorBlack._2, 1, 20), ...flexRow, backgroundColor: colorWhite._1, height: sh40, width: sw350 };

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={{ ...flexGrow }} keyboardShouldPersistTaps="handled">
        <View style={{ ...fullHW, ...px(sw94) }}>
          <TextSpaceArea spaceToTop={sh32} style={fs24RegBlack2} text={EMPLOYMENT_DETAILS.HEADING} />
          <TextSpaceArea spaceToTop={sh8} style={fs16RegBlack2} text={EMPLOYMENT_DETAILS.SUBHEADING} />
          <TextSpaceArea spaceToBottom={sh7} spaceToTop={sh24} style={fs16SemiBoldBlack2} text={EMPLOYMENT_DETAILS.LABEL_OCCUPATION} />
          <View style={mockPicker} />
          <TextSpaceArea spaceToBottom={sh7} spaceToTop={sh24} style={fs16SemiBoldBlack2} text={EMPLOYMENT_DETAILS.LABEL_NATURE_BUSINESS} />
          <View style={mockPicker} />
          <TextSpaceArea spaceToBottom={sh7} spaceToTop={sh24} style={fs16SemiBoldBlack2} text={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_NAME} />
          <CustomTextInput onChangeText={setInputEmployerName} value={inputEmployerName} />
          <TextSpaceArea text={EMPLOYMENT_DETAILS.LABEL_EMPLOYER_ADDRESS} spaceToTop={sh24} style={fs16SemiBoldBlack2} />
          <CustomSpacer space={sh7} />
          <TextInputArea onChangeText={setInputAddress} value={inputAddress} />
          <TextSpaceArea spaceToBottom={sh7} spaceToTop={sh24} style={fs16SemiBoldBlack2} text={EMPLOYMENT_DETAILS.LABEL_POST_CODE} />
          <CustomTextInput onChangeText={setInputPostCode} value={inputPostCode} />
          <CustomFlexSpacer />
          <CustomSpacer space={sh24} />
          <View style={flexRow}>
            <RoundedButton onPress={handleButtonPress} secondary={true} text={EMPLOYMENT_DETAILS.BUTTON_CANCEL} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <RoundedButton onPress={handleSubmit} text={EMPLOYMENT_DETAILS.BUTTON_CONTINUE} />
          </View>
          <CustomSpacer space={sh28} />
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
};
