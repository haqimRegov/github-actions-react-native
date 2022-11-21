import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { TextStyle, View } from "react-native";

import { AdvanceToggleButton, CustomFlexSpacer } from "../../components";
import { centerHV, flexRow, fs16RegBlack2, sw12, sw20, sw24 } from "../../styles";

interface QuestionContentContentProps {
  options?: ICheckBoxWithSubLabel[];
  selected: number;
  setSelected: (name: number) => void;
}

interface QuestionContentProps extends QuestionContentContentProps {
  contentToRadioSpace?: number;
  disabledIndex?: number[];
  labelStyle?: TextStyle;
  RenderContent?: (props: QuestionContentContentProps) => JSX.Element;
  right?: ReactNode;
  spaceToContent?: number;
}

export const QuestionContent: FunctionComponent<QuestionContentProps> = ({
  contentToRadioSpace,
  disabledIndex,
  labelStyle,
  options,
  RenderContent,
  right,
  selected,
  setSelected,
}: QuestionContentProps) => {
  const handleSelect = (index: TypeAdvanceToggleButtonValue) => {
    if (options !== undefined) {
      setSelected(index);
    }
  };

  return (
    <Fragment>
      {RenderContent !== undefined ? (
        <RenderContent options={options} selected={selected} setSelected={setSelected} />
      ) : (
        <View style={flexRow}>
          {options !== undefined ? (
            <AdvanceToggleButton
              buttonContainerStyle={{ ...centerHV, height: sw24, width: sw24 }}
              buttonStyle={{ borderRadius: sw12, height: sw20, width: sw20 }}
              contentToRadioSpace={contentToRadioSpace}
              direction="column"
              disabledIndex={disabledIndex}
              iconSize={sw12}
              labels={options}
              labelStyle={{ ...fs16RegBlack2, ...labelStyle }}
              onSelect={handleSelect}
              value={selected}
            />
          ) : null}
          <CustomFlexSpacer />
          {right !== undefined ? right : null}
        </View>
      )}
    </Fragment>
  );
};
