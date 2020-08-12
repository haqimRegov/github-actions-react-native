import React, { Fragment, ReactNode } from "react";
import { View } from "react-native";

import { LabeledTitle } from "../../components/Views/LabeledTitle";
import { flexRow, fs10BoldBlack2, fs16SemiBoldBlack2, sh16, sw608 } from "../../styles";
import { RadioButtonGroup } from "../RadioButton/RadioButtonGroup";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface QuestionContentProps {
  options?: string[];
  selected: number;
  setSelected: (name: number) => void;
}
export interface QuestionProps extends QuestionContentProps {
  label: string;
  RenderContent?: (props: QuestionContentProps) => JSX.Element;
  right?: ReactNode;
  spaceToContent?: number;
  title: string;
}

export const Question = ({ label, options, RenderContent, right, selected, setSelected, spaceToContent, title }: QuestionProps) => {
  const handleSelect = (answer: string) => {
    if (options !== undefined) {
      setSelected(options?.indexOf(answer));
    }
  };

  return (
    <Fragment>
      <LabeledTitle label={label} labelStyle={fs10BoldBlack2} title={title} titleStyle={{ ...fs16SemiBoldBlack2, maxWidth: sw608 }} />
      <CustomSpacer space={spaceToContent === undefined ? sh16 : spaceToContent} />
      {RenderContent !== undefined ? (
        <RenderContent options={options} selected={selected} setSelected={setSelected} />
      ) : (
        <View style={flexRow}>
          {options !== undefined ? (
            <RadioButtonGroup direction="column" labels={options} selected={options[selected]} setSelected={handleSelect} />
          ) : null}
          <CustomFlexSpacer />
          {right !== undefined ? right : null}
        </View>
      )}
    </Fragment>
  );
};
