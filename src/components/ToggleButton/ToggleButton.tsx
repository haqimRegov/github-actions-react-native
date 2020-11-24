import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { colorBlue, colorRed, flexRow, fs12SemiBoldBlue2, fs12SemiBoldWhite1, sw40 } from "../../styles";
import { OutlineButton } from "../Touchables/OutlineButton";
import { CustomSpacer } from "../Views";

const { TOGGLE } = Language.PAGE;

interface ToggleButtonProps {
  labelNo?: string;
  labelYes?: string;
  onSelect: (index: TypeToggleButtonValue) => void;
  value: TypeToggleButtonValue;
}

export const ToggleButton: FunctionComponent<ToggleButtonProps> = ({ labelNo, labelYes, onSelect, value }: ToggleButtonProps) => {
  const activeStyle: ViewStyle = { borderColor: colorRed._1, backgroundColor: colorRed._1 };
  const deactiveStyle: ViewStyle = { borderColor: colorBlue._2 };

  const handleYes = () => {
    onSelect(value !== 0 ? 0 : -1);
  };

  const handleNo = () => {
    onSelect(value !== 1 ? 1 : -1);
  };

  return (
    <View style={flexRow}>
      <View style={flexRow}>
        <OutlineButton
          buttonStyle={value === 0 ? activeStyle : deactiveStyle}
          color="white"
          icon={value === 0 ? "check" : undefined}
          onPress={handleYes}
          text={labelYes !== undefined ? labelYes : TOGGLE.LABEL_YES}
          textStyle={value === 0 ? fs12SemiBoldWhite1 : fs12SemiBoldBlue2}
        />
        <CustomSpacer isHorizontal={true} space={sw40} />
        <OutlineButton
          buttonStyle={value === 1 ? activeStyle : deactiveStyle}
          color="white"
          icon={value === 1 ? "check" : undefined}
          onPress={handleNo}
          text={labelNo !== undefined ? labelNo : TOGGLE.LABEL_NO}
          textStyle={value === 1 ? fs12SemiBoldWhite1 : fs12SemiBoldBlue2}
        />
      </View>
    </View>
  );
};
