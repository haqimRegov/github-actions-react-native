import React from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { circleBorder, colorBlue, colorGray, colorWhite, flexRow, fs13RegBlack2, sw1, sw12, sw20, sw5 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  setSelected: () => void;
}

export const RadioButton = ({ label, selected, setSelected }: RadioButtonProps) => {
  const borderColor = selected ? colorBlue._4 : colorGray._5;
  const borderWidth = selected ? sw5 : sw1;
  const radioStyle: ViewStyle = { ...circleBorder(sw20, borderWidth, borderColor, colorWhite._1) };

  return (
    <TouchableWithoutFeedback onPress={setSelected}>
      <View style={{ ...flexRow }}>
        <View style={radioStyle} />
        <CustomSpacer space={sw12} isHorizontal={true} />
        <Text style={fs13RegBlack2}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
