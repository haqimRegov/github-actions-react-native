import React, { Fragment } from "react";
import { View } from "react-native";

import { RadioButton } from "../../components/RadioButton/RadioButton";
import { flexCol, flexRow, sh12, sw12 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface RadioButtonGroupProps {
  direction?: "row" | "column";
  labels: string[];
  selected: string;
  setSelected: (selected: string) => void;
  space?: number;
}

export const RadioButtonGroup = ({ direction, labels, selected, setSelected, space }: RadioButtonGroupProps) => {
  const defaultSpace = direction === "row" ? sw12 : sh12;
  const radioSpace = space !== undefined ? space : defaultSpace;

  return (
    <View style={direction === "row" ? flexRow : flexCol}>
      {labels.map((label: string, index: number) => {
        const handleSelect = () => {
          setSelected(label);
        };
        return (
          <Fragment key={index}>
            <RadioButton label={label} selected={label === selected} setSelected={handleSelect} />
            <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />
          </Fragment>
        );
      })}
    </View>
  );
};
