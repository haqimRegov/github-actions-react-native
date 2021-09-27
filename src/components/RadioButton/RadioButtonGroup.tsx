import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { flexCol, flexRow, fs16RegBlack2, sh16, sw16 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { TextSpaceArea } from "../Views/TextSpaceArea";
import { RadioButton } from "./RadioButton";

export interface RadioButtonGroupProps {
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
}: RadioButtonGroupProps) => {
  const defaultSpace = direction === "row" ? sw16 : sh16;
  const radioSpace = space !== undefined ? space : defaultSpace;

  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label !== undefined ? (
        <TextSpaceArea spaceToBottom={spaceToLabel || sh16} style={{ ...fs16RegBlack2, ...labelStyle }} text={label} />
      ) : null}
      <View style={direction === "row" ? flexRow : flexCol}>
        {options.map((option: string, index: number) => {
          const handleSelect = () => {
            setSelected(option);
          };
          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />}
              <RadioButton
                disabled={disabledIndex !== undefined && disabledIndex.includes(index)}
                label={option}
                labelStyle={optionStyle}
                radioStyle={radioStyle}
                selected={option === selected}
                selectedColor={selectedColor}
                setSelected={handleSelect}
              />
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
