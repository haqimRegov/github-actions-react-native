import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { NewDropdown, RadioButtonGroup } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_MALAYSIA_RACE } from "../../../data/dictionary";
import { sh16 } from "../../../styles";

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
    <View>
      <NewDropdown
        items={DICTIONARY_MALAYSIA_RACE}
        handleChange={setInputRace}
        label={PERSONAL_DETAILS.LABEL_RACE}
        value={inputRace}
        spaceToTop={sh16}
      />
      <RadioButtonGroup
        direction="row"
        label={PERSONAL_DETAILS.LABEL_BUMIPUTERA}
        options={[PERSONAL_DETAILS.OPTION_BUMIPUTERA_YES, PERSONAL_DETAILS.OPTION_BUMIPUTERA_NO]}
        selected={inputBumiputera}
        setSelected={setInputBumiputera}
        spaceToTop={sh16}
      />
    </View>
  );
};
