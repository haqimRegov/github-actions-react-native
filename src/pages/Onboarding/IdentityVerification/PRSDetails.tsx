import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, CustomTextInput, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_EDUCATION, DICTIONARY_MARITAL_STATUS } from "../../../data/dictionary";
import { sh16 } from "../../../styles";

const { PRS } = Language.PAGE;

interface PRSDetailsProps {
  inputEducation: string;
  inputMaritalStatus: string;
  inputMotherName: string;
  inputOtherEducation: string;
  mothersNameError?: string;
  onBlurMothersName: () => void;
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
  mothersNameError,
  onBlurMothersName,
  setInputEducation,
  setInputMaritalStatus,
  setInputMotherName,
  setInputOtherEducation,
}: PRSDetailsProps) => {
  return (
    <View>
      <CustomSpacer space={sh16} />
      <CustomTextInput
        autoCapitalize="words"
        error={mothersNameError}
        label={PRS.LABEL_MOTHER_NAME}
        onBlur={onBlurMothersName}
        onChangeText={setInputMotherName}
        spaceToBottom={sh16}
        value={inputMotherName}
      />
      <NewDropdown
        handleChange={setInputMaritalStatus}
        items={DICTIONARY_MARITAL_STATUS}
        label={PRS.LABEL_MARITAL}
        value={inputMaritalStatus}
      />
      <CustomSpacer space={sh16} />
      <NewDropdown handleChange={setInputEducation} items={DICTIONARY_EDUCATION} label={PRS.LABEL_EDUCATION} value={inputEducation} />
      {inputEducation === "Others" ? (
        <CustomTextInput label={PRS.LABEL_OTHERS} onChangeText={setInputOtherEducation} spaceToTop={sh16} value={inputOtherEducation} />
      ) : null}
    </View>
  );
};
