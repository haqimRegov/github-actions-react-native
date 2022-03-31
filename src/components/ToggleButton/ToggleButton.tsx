import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { colorBlue, colorRed, flexRow, fs12BoldWhite1, fs12RegBlue1, sw4, sw40 } from "../../styles";
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
  const inactiveStyle: ViewStyle = { borderColor: colorBlue._1 };

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
          buttonStyle={value === 0 ? activeStyle : inactiveStyle}
          color="white"
          icon={value === 0 ? "success" : undefined}
          onPress={handleYes}
          spaceToIcon={sw4}
          text={labelYes !== undefined ? labelYes : TOGGLE.LABEL_YES}
          textStyle={value === 0 ? fs12BoldWhite1 : fs12RegBlue1}
        />
        <CustomSpacer isHorizontal={true} space={sw40} />
        <OutlineButton
          buttonStyle={value === 1 ? activeStyle : inactiveStyle}
          color="white"
          icon={value === 1 ? "success" : undefined}
          onPress={handleNo}
          spaceToIcon={sw4}
          text={labelNo !== undefined ? labelNo : TOGGLE.LABEL_NO}
          textStyle={value === 1 ? fs12BoldWhite1 : fs12RegBlue1}
        />
      </View>
    </View>
  );
};
