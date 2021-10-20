import React, { Fragment, ReactNode } from "react";
import { View } from "react-native";

import { LabeledTitle } from "../../components/Views/LabeledTitle";
import { flexRow, fs10BoldBlack2, fs16BoldBlack2, sh16, sh8, sw600 } from "../../styles";
import { AdvanceToggleButton } from "../ToggleButton/AdvanceToggleButton";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface QuestionContentProps {
  options?: ICheckBoxWithSubLabel[];
  selected: number;
  setSelected: (name: number) => void;
}
export interface QuestionProps extends QuestionContentProps {
  disabledIndex?: number[];
  label: string;
  RenderContent?: (props: QuestionContentProps) => JSX.Element;
  right?: ReactNode;
  spaceToContent?: number;
  title: string;
}

export const Question = ({
  disabledIndex,
  label,
  options,
  RenderContent,
  right,
  selected,
  setSelected,
  spaceToContent,
  title,
}: QuestionProps) => {
  const handleSelect = (index: TypeAdvanceToggleButtonValue) => {
    if (options !== undefined) {
      setSelected(index);
    }
  };

  return (
    <Fragment>
      <LabeledTitle
        label={label}
        labelStyle={fs10BoldBlack2}
        spaceToLabel={sh8}
        title={title}
        titleStyle={{ ...fs16BoldBlack2, maxWidth: sw600 }}
      />
      <CustomSpacer space={spaceToContent === undefined ? sh16 : spaceToContent} />
      {RenderContent !== undefined ? (
        <RenderContent options={options} selected={selected} setSelected={setSelected} />
      ) : (
        <View style={flexRow}>
          {options !== undefined ? (
            <AdvanceToggleButton
              direction="column"
              disabledIndex={disabledIndex}
              labels={options}
              value={selected}
              onSelect={handleSelect}
            />
          ) : null}
          <CustomFlexSpacer />
          {right !== undefined ? right : null}
        </View>
      )}
    </Fragment>
  );
};
