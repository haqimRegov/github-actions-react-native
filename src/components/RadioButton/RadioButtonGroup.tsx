import React, { Fragment } from "react";
import { TextStyle, View } from "react-native";

import { RadioButton } from "../../components/RadioButton/RadioButton";
import { flexCol, flexRow, sh16, sw16 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface RadioButtonGroupProps {
  direction?: "row" | "column";
  labels: string[];
  labelStyle?: TextStyle;
  selected: string;
  setSelected: (selected: string) => void;
  space?: number;
}

export const RadioButtonGroup = ({ direction, labels, labelStyle, selected, setSelected, space }: RadioButtonGroupProps) => {
  const defaultSpace = direction === "row" ? sw16 : sh16;
  const radioSpace = space !== undefined ? space : defaultSpace;

  return (
    <View style={direction === "row" ? flexRow : flexCol}>
      {labels.map((label: string, index: number) => {
        const handleSelect = () => {
          setSelected(label);
        };
        return (
          <Fragment key={index}>
            {index === 0 ? null : <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />}
            <RadioButton label={label} labelStyle={labelStyle} selected={label === selected} setSelected={handleSelect} />
          </Fragment>
        );
      })}
    </View>
  );
};
