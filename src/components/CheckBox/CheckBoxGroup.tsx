import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { flexCol, flexRow, flexWrap, fs12BoldBlack2, fs14RegBlack2, sh16, sh8, sw12, sw16 } from "../../styles";
import { CustomSpacer, TextSpaceArea } from "../Views";
import { CheckBox } from "./CheckBox";

export interface CheckBoxGroupProps {
  checkBoxStyle?: ViewStyle;
  direction?: "column" | "row";
  columntCount?: number;
  disabled?: boolean;
  disabledIndex?: number[];
  label?: string;
  labels: string[];
  labelStyle?: TextStyle;
  selected: string[];
  setSelected: (selected: string) => void;
  space?: number;
  spaceToLabel?: number;
  style?: ViewStyle;
}

export const CheckBoxGroup: FunctionComponent<CheckBoxGroupProps> = ({
  checkBoxStyle,
  direction,
  disabled,
  disabledIndex,
  label,
  labels,
  labelStyle,
  selected,
  setSelected,
  space,
  spaceToLabel,
  style,
}: CheckBoxGroupProps) => {
  const defaultSpace = direction === "row" ? sw16 : sh16;
  const radioSpace = space !== undefined ? space : defaultSpace;
  const flexDirection = direction === "row" ? flexRow : flexCol;

  const labelDisabled = disabled === true ? { opacity: 0.5 } : {};

  return (
    <View>
      {label !== undefined ? (
        <TextSpaceArea spaceToBottom={spaceToLabel || sh8} style={{ ...fs12BoldBlack2, ...labelDisabled, ...labelStyle }} text={label} />
      ) : null}

      <View style={{ ...flexDirection, ...flexWrap, ...style }}>
        {labels.map((option: string, index: number) => {
          const handleSelect = () => {
            setSelected(option);
          };

          const disabledOption = disabledIndex !== undefined ? disabledIndex.includes(index) : false;

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />}
              <CheckBox
                disabled={disabled === true ? true : disabledOption}
                key={index}
                label={option}
                labelStyle={fs14RegBlack2}
                onPress={handleSelect}
                spaceToLabel={sw12}
                style={checkBoxStyle}
                toggle={selected.includes(option)}
              />
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};