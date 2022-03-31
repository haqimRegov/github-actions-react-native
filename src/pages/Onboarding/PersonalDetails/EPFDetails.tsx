import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, CustomTextInput, NewDropdown, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_EPF_TYPE_CONVENTIONAL, DICTIONARY_EPF_TYPE_SHARIAH } from "../../../data/dictionary";
import { borderBottomGray2, fs24BoldGray6, px, sh32, sw24 } from "../../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface EPFDetailsProps {
  inputEpfNumber: string;
  inputEpfType: string;
  epfNumberError: string | undefined;
  epfShariah: boolean;
  onBlurEpfNumber: () => void;
  setInputEpfNumber: (input: string) => void;
  setInputEpfType: (input: string) => void;
}

export const EPFDetails: FunctionComponent<EPFDetailsProps> = ({
  inputEpfNumber,
  inputEpfType,
  epfNumberError,
  epfShariah,
  onBlurEpfNumber,
  setInputEpfNumber,
  setInputEpfType,
}: EPFDetailsProps) => {
  const epfTypeOptions = [DICTIONARY_EPF_TYPE_CONVENTIONAL];

  if (epfShariah === true) {
    epfTypeOptions.push(DICTIONARY_EPF_TYPE_SHARIAH);
  }

  return (
    <Fragment>
      <CustomSpacer space={sh32} />
      <View style={borderBottomGray2} />
      <View style={px(sw24)}>
        <CustomSpacer space={sh32} />
        <TextSpaceArea spaceToBottom={sh32} style={fs24BoldGray6} text={PERSONAL_DETAILS.LABEL_EPF_DETAILS} />
        <CustomTextInput
          error={epfNumberError}
          keyboardType="numeric"
          label={PERSONAL_DETAILS.LABEL_EPF_NUMBER}
          onBlur={onBlurEpfNumber}
          onChangeText={setInputEpfNumber}
          value={inputEpfNumber}
        />
        <NewDropdown
          handleChange={setInputEpfType}
          items={epfTypeOptions}
          label={PERSONAL_DETAILS.LABEL_EPF_TYPE}
          spaceToTop={sh32}
          value={inputEpfType}
        />
      </View>
      <CustomSpacer space={sh32} />
    </Fragment>
  );
};
