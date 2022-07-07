import React, { Fragment, FunctionComponent } from "react";

import { CustomTextInput, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_EPF_TYPE_CONVENTIONAL, DICTIONARY_EPF_TYPE_SHARIAH } from "../../../data/dictionary";
import { sh16 } from "../../../styles";

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
      <CustomTextInput
        error={epfNumberError}
        keyboardType="numeric"
        label={PERSONAL_DETAILS.LABEL_EPF_MEMBER_NUMBER}
        onBlur={onBlurEpfNumber}
        onChangeText={setInputEpfNumber}
        value={inputEpfNumber}
      />
      <NewDropdown
        handleChange={setInputEpfType}
        items={epfTypeOptions}
        label={PERSONAL_DETAILS.LABEL_EPF_TYPE}
        spaceToTop={sh16}
        value={inputEpfType}
      />
    </Fragment>
  );
};
