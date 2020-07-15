import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

import { centerVertical, circleBorder, colorBlue, colorRed, colorWhite, flexRow, fs12BoldBlack2, sw1, sw12, sw24, sw6 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  setSelected: () => void;
}

export const RadioButton = ({ label, selected, setSelected }: RadioButtonProps) => {
  const borderColor = selected ? colorRed._1 : colorBlue._3;
  const borderWidth = selected ? sw6 : sw1;

  return (
    <TouchableWithoutFeedback onPress={setSelected}>
      <View style={{ ...centerVertical, ...flexRow }}>
        <View style={circleBorder(sw24, borderWidth, borderColor, colorWhite._1)} />
        <CustomSpacer space={sw12} isHorizontal={true} />
        <Text style={fs12BoldBlack2}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
