import React, { Fragment, ReactNode } from "react";
import { View } from "react-native";

import { CustomSpacer, LabeledTitle, RadioButtonGroup } from "../../components";
import { sh16, flexRow } from "../../styles";
import { CustomFlexSpacer } from "./Spacer";

export interface QuestionProps {
  children?: ReactNode;
  options?: string[];
  right?: ReactNode;
  selected: string;
  setSelected: (name: string) => void;
  title: string;
  label: string;
}

export const Question = ({ children, label, options, right, selected, setSelected, title }: QuestionProps) => {
  return (
    <Fragment>
      <LabeledTitle label={label} title={title} />
      <CustomSpacer space={sh16} />
      {children !== undefined ? (
        children
      ) : (
        <Fragment>
          <View style={flexRow}>
            {options !== undefined ? (
              <RadioButtonGroup labels={options} selected={selected} setSelected={setSelected} direction="column" />
            ) : null}
            <CustomFlexSpacer />
            {right !== undefined ? right : null}
          </View>
        </Fragment>
      )}
    </Fragment>
  );
};
