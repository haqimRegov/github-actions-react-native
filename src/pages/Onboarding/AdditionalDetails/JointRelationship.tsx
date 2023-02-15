import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomTextInput, NewDropdown } from "../../../components";
import { Language } from "../../../constants";
import { DICTIONARY_RELATIONSHIP } from "../../../data/dictionary";
import { sh32 } from "../../../styles";

const { ADDITIONAL_DETAILS } = Language.PAGE;

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
    <View>
      <NewDropdown
        handleChange={handleRelationship}
        items={DICTIONARY_RELATIONSHIP}
        label={ADDITIONAL_DETAILS.LABEL_RELATIONSHIP}
        value={inputRelationship}
      />
      {personalDetails.relationship! === "Others" ? (
        <CustomTextInput
          label={ADDITIONAL_DETAILS.LABEL_RELATIONSHIP_OTHER}
          onChangeText={setInputOtherRelationship}
          spaceToTop={sh32}
          value={inputOtherRelationship}
        />
      ) : null}
    </View>
  );
};
