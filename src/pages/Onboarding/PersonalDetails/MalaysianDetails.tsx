import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { NewDropdown, RadioButtonGroup, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_MALAYSIA_RACE } from "../../../data/dictionary";
import { px, sh32, sh8, sw24, sw44 } from "../../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface MalaysianDetailsProps {
  inputBumiputera: string;
  inputRace: string;
  setInputBumiputera: (input: string) => void;
  setInputRace: (input: string) => void;
}

export const MalaysianDetails: FunctionComponent<MalaysianDetailsProps> = ({
  inputBumiputera,
  inputRace,
  setInputBumiputera,
  setInputRace,
}: MalaysianDetailsProps) => {
  return (
    <View style={px(sw24)}>
      <NewDropdown
        items={DICTIONARY_MALAYSIA_RACE}
        handleChange={setInputRace}
        label={PERSONAL_DETAILS.LABEL_RACE}
        value={inputRace}
        spaceToTop={sh32}
      />
      <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} text={PERSONAL_DETAILS.LABEL_BUMIPUTERA} />
      <RadioButtonGroup
        direction="row"
        options={[PERSONAL_DETAILS.OPTION_BUMIPUTERA_YES, PERSONAL_DETAILS.OPTION_BUMIPUTERA_NO]}
        selected={inputBumiputera}
        setSelected={setInputBumiputera}
        space={sw44}
      />
    </View>
  );
};
