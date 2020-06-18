import React, { Fragment } from "react";
import { View } from "react-native";

import { RadioButton } from "../../components";
import { flexCol, flexRow, sh12, sw12 } from "../../styles";
import { CustomSpacer } from "../Views";

interface RadioButtonGroupProps {
  direction?: "row" | "column";
  labels: string[];
  selected: string;
  setSelection: (selected: string) => void;
  space?: number;
}

export const RadioButtonGroup = ({ labels, direction, selected, setSelection, space }: RadioButtonGroupProps) => {
  const defaultSpace = direction === "row" ? sw12 : sh12;
  const radioSpace = space !== undefined ? space : defaultSpace;

  return (
    <View style={direction === "row" ? flexRow : flexCol}>
      {labels.map((label, index) => {
        const handleSelect = () => {
          setSelection(label);
        };
        return (
          <Fragment key={index}>
            <RadioButton label={label} selected={label === selected} setSelection={handleSelect} />
            <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />
          </Fragment>
        );
      })}
    </View>
  );
};
