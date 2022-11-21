import React, { Fragment, FunctionComponent, ReactElement } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { flexCol, flexRow, fs16RegGray6, sh16, sh8, sw16 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { TextSpaceArea } from "../Views/TextSpaceArea";
import { RadioButton } from "./RadioButton";

export interface RadioButtonGroupProps {
  direction?: "row" | "column";
  disabledIndex?: number[];
  disabledTooltip?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  onCloseTooltip?: () => void;
  options: string[];
  optionStyle?: TextStyle;
  radioStyle?: ViewStyle;
  selected: string;
  selectedColor?: string;
  setSelected: (selected: string) => void;
  space?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
  tooltipContent?: ReactElement;
  showTooltip?: boolean;
  setShowTooltip?: () => void;
}

export const RadioButtonGroup: FunctionComponent<RadioButtonGroupProps> = ({
  direction,
  disabledIndex,
  label,
  labelStyle,
  options,
  optionStyle,
  radioStyle,
  selected,
  selectedColor,
  setSelected,
  space,
  spaceToLabel,
  spaceToTop,
  ...radioButtonProps
}: RadioButtonGroupProps) => {
  const defaultSpace = direction === "row" ? sw16 : sh16;
  const radioSpace = space !== undefined ? space : defaultSpace;

  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label !== undefined ? (
        <TextSpaceArea spaceToBottom={spaceToLabel || sh8} style={{ ...fs16RegGray6, ...labelStyle }} text={label} />
      ) : null}
      <View style={direction === "row" ? flexRow : flexCol}>
        {options.map((option: string, index: number) => {
          const handleSelect = () => {
            setSelected(option);
          };
          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />}
              <RadioButton
                disabled={disabledIndex !== undefined && disabledIndex.includes(index)}
                label={option}
                labelStyle={optionStyle}
                radioStyle={radioStyle}
                selected={option === selected}
                selectedColor={selectedColor}
                setSelected={handleSelect}
                {...radioButtonProps}
              />
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
