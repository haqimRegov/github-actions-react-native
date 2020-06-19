import React, { Fragment, ReactNode } from "react";
import { View } from "react-native";

import { LabeledTitle } from "../../components/Views/LabeledTitle";
import { RadioButtonGroup } from "../RadioButton/RadioButtonGroup";
import { sh16, flexRow } from "../../styles";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface QuestionProps {
  children?: ReactNode;
  label: string;
  options?: string[];
  right?: ReactNode;
  selected: string;
  setSelected: (name: string) => void;
  spaceToContent?: number;
  title: string;
}

export const Question = ({ children, label, options, right, selected, setSelected, spaceToContent, title }: QuestionProps) => {
  return (
    <Fragment>
      <LabeledTitle label={label} title={title} />
      <CustomSpacer space={spaceToContent === undefined ? sh16 : spaceToContent} />
      {children !== undefined ? (
        children
      ) : (
        <View style={flexRow}>
          {options !== undefined ? (
            <RadioButtonGroup direction="column" labels={options} selected={selected} setSelected={setSelected} />
          ) : null}
          <CustomFlexSpacer />
          {right !== undefined ? right : null}
        </View>
      )}
    </Fragment>
  );
};
