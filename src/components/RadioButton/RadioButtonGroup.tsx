import React, { Fragment } from "react";
import { TextStyle, View } from "react-native";

import { flexCol, flexRow, fs16RegBlack2, sh16, sw16 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { TextSpaceArea } from "../Views/TextSpaceArea";
import { RadioButton } from "./RadioButton";

export interface RadioButtonGroupProps {
  direction?: "row" | "column";
  label?: string;
  labelStyle?: TextStyle;
  options: string[];
  optionStyle?: TextStyle;
  selected: string;
  setSelected: (selected: string) => void;
  space?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
}

export const RadioButtonGroup = ({
  direction,
  label,
  labelStyle,
  options,
  optionStyle,
  selected,
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
              <RadioButton label={option} labelStyle={optionStyle} selected={option === selected} setSelected={handleSelect} />
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
