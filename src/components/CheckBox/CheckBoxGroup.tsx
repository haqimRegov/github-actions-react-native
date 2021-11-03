import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { disabledOpacity5, flexCol, flexRow, flexWrap, fs12BoldGray6, sh16, sh4, sw12, sw16 } from "../../styles";
import { CustomSpacer, TextSpaceArea } from "../Views";
import { CheckBox } from "./CheckBox";

export interface CheckBoxGroupProps {
  checkBoxStyle?: ViewStyle;
  checkboxLabelStyle?: TextStyle;
  direction?: "column" | "row";
  columntCount?: number;
  disabled?: boolean;
  disabledIndex?: number[];
  label?: string;
  labels: ICheckBoxWithSubLabel[];
  labelStyle?: TextStyle;
  selected: string[];
  setSelected: (selected: string) => void;
  space?: number;
  spaceToLabel?: number;
  style?: ViewStyle;
}

export const CheckBoxGroup: FunctionComponent<CheckBoxGroupProps> = ({
  checkBoxStyle,
  checkboxLabelStyle,
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

  const labelDisabled = disabled === true ? disabledOpacity5 : {};

  return (
    <View>
      {label !== undefined ? (
        <TextSpaceArea spaceToBottom={spaceToLabel || sh4} style={{ ...fs12BoldGray6, ...labelDisabled, ...labelStyle }} text={label} />
      ) : null}
      <View style={{ ...flexDirection, ...flexWrap, ...style }}>
        {labels.map((option: ICheckBoxWithSubLabel, index: number) => {
          const handleSelect = () => {
            setSelected(option.value!);
          };

          const disabledOption = disabledIndex !== undefined ? disabledIndex.includes(index) : false;
          const { label: optionLabel, value } = option;

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />}
              <CheckBox
                disabled={disabled === true ? true : disabledOption}
                key={index}
                label={optionLabel}
                labelStyle={checkboxLabelStyle}
                onPress={handleSelect}
                spaceToLabel={sw12}
                style={checkBoxStyle}
                toggle={selected.includes(value!)}
              />
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
