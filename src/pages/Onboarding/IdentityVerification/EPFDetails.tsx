import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { ColorCard, CustomSpacer, CustomTextInput, RadioButtonGroup } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_EPF_TYPE_CONVENTIONAL, DICTIONARY_EPF_TYPE_SHARIAH } from "../../../data/dictionary";
import { borderBottomGray2, fs12BoldGray6, px, sh16, sw136, sw24 } from "../../../styles";

const { ID_VERIFICATION } = Language.PAGE;

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
    <View style={px(sw24)}>
      <ColorCard
        header={{ label: ID_VERIFICATION.LABEL_EPF_DETAILS }}
        content={
          <Fragment>
            <CustomTextInput
              error={epfNumberError}
              keyboardType="numeric"
              label={ID_VERIFICATION.LABEL_EPF_NUMBER}
              onBlur={onBlurEpfNumber}
              onChangeText={setInputEpfNumber}
              value={inputEpfNumber}
            />
            <CustomSpacer space={sh16} />
            <View style={borderBottomGray2} />
            <CustomSpacer space={sh16} />
            <RadioButtonGroup
              direction="row"
              label={ID_VERIFICATION.LABEL_EPF_TYPE}
              labelStyle={fs12BoldGray6}
              options={epfTypeOptions.map((eachOption: TypeLabelValue) => eachOption.label)}
              optionStyle={{ width: sw136 }}
              space={sw24}
              selected={inputEpfType}
              setSelected={setInputEpfType}
            />
          </Fragment>
        }
      />
    </View>
  );
};
