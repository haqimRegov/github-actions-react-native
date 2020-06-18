import React from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { centerVertical, circleBorder, colorBlue, colorGray, colorWhite, flexRow, fs13RegBlack3, sw1, sw12, sw20, sw5 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  setSelection: () => void;
}

export const RadioButton = ({ label, selected, setSelection }: RadioButtonProps) => {
  const borderColor = selected ? colorBlue._4 : colorGray._5;
  const borderWidth = selected ? sw5 : sw1;
  const radioStyle: ViewStyle = { ...circleBorder(sw20, borderWidth, borderColor, colorWhite._1) };

  return (
    <TouchableWithoutFeedback onPress={setSelection}>
      <View style={{ ...flexRow, ...centerVertical }}>
        <View style={radioStyle} />
        <CustomSpacer space={sw12} isHorizontal={true} />
        <Text style={fs13RegBlack3}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
