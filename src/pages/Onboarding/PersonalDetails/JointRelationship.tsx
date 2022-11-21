import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, CustomTextInput, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_RELATIONSHIP } from "../../../data/dictionary";
import { px, sh32, sw24 } from "../../../styles";

const { PERSONAL_DETAILS } = Language.PAGE;

interface JointRelationshipProps {
  personalDetails: IPersonalDetailsState;
  setPersonalDetails: (value: IPersonalDetailsState) => void;
}

export const JointRelationship: FunctionComponent<JointRelationshipProps> = ({
  personalDetails,
  setPersonalDetails,
}: JointRelationshipProps) => {
  const setInputRelationship = (value: string) => setPersonalDetails({ relationship: value });
  const setInputOtherRelationship = (value: string) => setPersonalDetails({ otherRelationship: value });

  const inputRelationship = personalDetails.relationship!;
  const inputOtherRelationship = personalDetails.otherRelationship!;

  const handleRelationship = (input: string) => {
    if (input !== "Others") {
      setInputOtherRelationship("");
    }
    setInputRelationship(input);
  };

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh32} />
      <NewDropdown
        handleChange={handleRelationship}
        items={DICTIONARY_RELATIONSHIP}
        label={PERSONAL_DETAILS.LABEL_RELATIONSHIP}
        value={inputRelationship}
      />
      {personalDetails.relationship! === "Others" ? (
        <CustomTextInput
          label={PERSONAL_DETAILS.LABEL_RELATIONSHIP_OTHER}
          onChangeText={setInputOtherRelationship}
          spaceToTop={sh32}
          value={inputOtherRelationship}
        />
      ) : null}
    </View>
  );
};
