import React, { Fragment, ReactNode } from "react";
import { View } from "react-native";

import { LabeledTitle } from "../../components/Views/LabeledTitle";
import { flexRow, fs10BoldBlack2, fs16SemiBoldBlack2, sh16, sw608 } from "../../styles";
import { RadioButtonGroup } from "../RadioButton/RadioButtonGroup";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface QuestionContentProps {
  options?: string[];
  selected: string;
  setSelected: (name: string) => void;
}
export interface QuestionProps extends QuestionContentProps {
  label: string;
  RenderContent?: (props: QuestionContentProps) => JSX.Element;
  right?: ReactNode;
  spaceToContent?: number;
  title: string;
}

export const Question = ({ label, options, RenderContent, right, selected, setSelected, spaceToContent, title }: QuestionProps) => {
  return (
    <Fragment>
      <LabeledTitle label={label} labelStyle={fs10BoldBlack2} title={title} titleStyle={{ ...fs16SemiBoldBlack2, maxWidth: sw608 }} />
      <CustomSpacer space={spaceToContent === undefined ? sh16 : spaceToContent} />
      {RenderContent !== undefined ? (
        <RenderContent options={options} selected={selected} setSelected={setSelected} />
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
