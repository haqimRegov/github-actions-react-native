import React, { Fragment, ReactNode } from "react";
import { TextStyle, View } from "react-native";

import { LabeledTitle } from "../../components/Views/LabeledTitle";
import { flexRow, sh16 } from "../../styles";
import { RadioButtonGroup } from "../RadioButton/RadioButtonGroup";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface QuestionContentProps {
  contentOptions?: string[];
  selected: string;
  setSelectedOption: (name: string) => void;
}
export interface QuestionProps {
  label: string;
  options?: string[];
  RenderContent?: (props: QuestionContentProps) => JSX.Element;
  right?: ReactNode;
  selected: string;
  setSelected: (name: string) => void;
  spaceToContent?: number;
  title: string;
  titleStyle?: TextStyle;
}

export const Question = ({
  label,
  options,
  RenderContent,
  right,
  selected,
  setSelected,
  spaceToContent,
  title,
  titleStyle,
}: QuestionProps) => {
  return (
    <Fragment>
      <LabeledTitle label={label} title={title} titleStyle={titleStyle} />
      <CustomSpacer space={spaceToContent === undefined ? sh16 : spaceToContent} />
      {RenderContent !== undefined ? (
        <RenderContent contentOptions={options} selected={selected} setSelectedOption={setSelected} />
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
