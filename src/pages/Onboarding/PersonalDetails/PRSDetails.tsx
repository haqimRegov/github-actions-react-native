import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { AdvancedDropdown, CustomSpacer, CustomTextInput } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_EDUCATION, DICTIONARY_MARITAL_STATUS } from "../../../data/dictionary";
import { px, sh32, sw24 } from "../../../styles";

const { PRS } = Language.PAGE;

interface PRSDetailsProps {
  inputEducation: string;
  inputMaritalStatus: string;
  inputMotherName: string;
  inputOtherEducation: string;
  setInputEducation: (input: string) => void;
  setInputMaritalStatus: (input: string) => void;
  setInputMotherName: (input: string) => void;
  setInputOtherEducation: (input: string) => void;
}

export const PRSDetails: FunctionComponent<PRSDetailsProps> = ({
  inputEducation,
  inputMaritalStatus,
  inputMotherName,
  inputOtherEducation,
  setInputEducation,
  setInputMaritalStatus,
  setInputMotherName,
  setInputOtherEducation,
}: PRSDetailsProps) => {
  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh32} />
      <CustomTextInput
        autoCapitalize="words"
        label={PRS.LABEL_MOTHER_NAME}
        onChangeText={setInputMotherName}
        spaceToBottom={sh32}
        value={inputMotherName}
      />
      <AdvancedDropdown
        handleChange={setInputMaritalStatus}
        items={DICTIONARY_MARITAL_STATUS}
        label={PRS.LABEL_MARITAL}
        value={inputMaritalStatus}
      />
      <CustomSpacer space={sh32} />
      <AdvancedDropdown handleChange={setInputEducation} items={DICTIONARY_EDUCATION} label={PRS.LABEL_EDUCATION} value={inputEducation} />
      {inputEducation === "Others" ? (
        <CustomTextInput label={PRS.LABEL_OTHERS} onChangeText={setInputOtherEducation} spaceToTop={sh32} value={inputOtherEducation} />
      ) : null}
      <CustomSpacer space={sh32} />
    </View>
  );
};
