import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { flexCol, flexRow, fs12BoldGray6, sh4, sh8, sw136, sw24 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { TextSpaceArea } from "../Views/TextSpaceArea";
import { RadioButton, RadioButtonTooltipProps } from "./RadioButton";

export interface RadioButtonGroupProps extends RadioButtonTooltipProps {
  direction?: "row" | "column";
  disabledIndex?: number[];
  label?: string;
  labelStyle?: TextStyle;
  options: string[];
  optionStyle?: TextStyle;
  radioStyle?: ViewStyle;
  selected: string;
  selectedColor?: string;
  setSelected: (selected: string) => void;
  space?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
}

export const RadioButtonGroup: FunctionComponent<RadioButtonGroupProps> = ({
  direction,
  disabledIndex,
  label,
  labelStyle,
  options,
  optionStyle,
  radioStyle,
  selected,
  selectedColor,
  setSelected,
  space,
  spaceToLabel,
  spaceToTop,
  ...radioButtonProps
}: RadioButtonGroupProps) => {
  const defaultSpace = direction === "row" ? sw24 : sh8;
  const radioSpace = space !== undefined ? space : defaultSpace;
  const defaultOptionStyle: ViewStyle = direction === "row" ? { minWidth: sw136 } : {};
  const flexDirection = direction === "row" ? { ...flexRow } : { ...flexCol };

  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label !== undefined ? (
        <TextSpaceArea spaceToBottom={spaceToLabel || sh4} style={{ ...fs12BoldGray6, ...labelStyle }} text={label} />
      ) : null}
      <View style={direction === "row" ? flexRow : flexCol}>
        {options.map((option: string, index: number) => {
          const handleSelect = () => {
            setSelected(option);
          };
          return (
            <View key={index} style={flexDirection}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />}
              <RadioButton
                disabled={disabledIndex !== undefined && disabledIndex.includes(index)}
                label={option}
                labelStyle={{ ...defaultOptionStyle, ...optionStyle }}
                radioStyle={radioStyle}
                selected={option === selected}
                selectedColor={selectedColor}
                setSelected={handleSelect}
                {...radioButtonProps}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
