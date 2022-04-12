import React, { Fragment, FunctionComponent, ReactElement, ReactNode, useState } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold, NunitoRegular } from "../../constants";
import {
  centerVertical,
  circle,
  circleBorder,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  disabledOpacity6,
  flexRow,
  fs16BoldBlack2,
  sh7,
  sw1,
  sw10,
  sw12,
  sw16,
  sw18,
  sw240,
  sw4,
  sw48,
} from "../../styles";
import { CustomTooltip } from "../Tooltip";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

interface RadioButtonProps {
  disabled?: boolean;
  disabledTooltip?: boolean;
  label: string;
  labelStyle?: TextStyle;
  onCloseTooltip?: () => void;
  radioStyle?: ViewStyle;
  right?: ReactNode;
  selected: boolean;
  selectedColor?: string;
  setSelected: () => void;
  setShowTooltip?: () => void;
  showTooltip?: boolean;
  tooltipContent?: ReactElement;
}

export const RadioButton: FunctionComponent<RadioButtonProps> = ({
  disabled,
  disabledTooltip,
  label,
  labelStyle,
  setShowTooltip,
  radioStyle,
  right,
  selected,
  selectedColor,
  setSelected,
  showTooltip,
  tooltipContent,
}: RadioButtonProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const tooltipVisible = showTooltip !== undefined ? showTooltip : visible;
  const color = selectedColor !== undefined ? selectedColor : colorRed._1;
  const borderColor = selected ? color : colorBlue._1;
  const borderWidth = selected ? sw4 : sw1;
  const circleSize = selected ? sw10 : sw16;
  const disabledColor: TextStyle = disabled === true && selected === false ? { backgroundColor: colorGray._4 } : {};
  const disabledStyle: ViewStyle = disabled === true ? { ...disabledOpacity6 } : {};
  const fontFamily = selected ? NunitoBold : NunitoRegular;
  const checkTooltip: TextStyle = disabled === true && disabledTooltip === true ? { width: "auto", minWidth: 0 } : {};

  const handlePress = () => {
    if (!disabled) {
      setSelected();
    } else if (disabled === true && disabledTooltip === true) {
      if (setShowTooltip !== undefined) {
        setShowTooltip();
      } else {
        setVisible(!visible);
      }
    }
  };

  const content = (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ ...centerVertical, ...flexRow, ...disabledStyle }}>
        <View style={{ ...radioStyle }}>
          <View style={circleBorder(sw18, borderWidth, borderColor, colorWhite._1)}>
            <View style={{ ...circle(circleSize), ...disabledColor }} />
          </View>
        </View>
        <CustomSpacer space={sw12} isHorizontal={true} />
        <Text style={{ ...fs16BoldBlack2, fontFamily: fontFamily, minWidth: sw48, ...labelStyle, ...checkTooltip }}>{label}</Text>
        {disabled === true && disabledTooltip === true ? <CustomFlexSpacer /> : null}
        {right}
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <Fragment>
      {disabled === true && disabledTooltip === true ? (
        <CustomTooltip
          arrowSize={{ height: sh7, width: sw12 }}
          content={tooltipContent}
          contentStyle={{ width: sw240 }}
          isVisible={tooltipVisible}
          onClose={handlePress}
          onPress={handlePress}>
          {content}
        </CustomTooltip>
      ) : (
        content
      )}
    </Fragment>
  );
};
