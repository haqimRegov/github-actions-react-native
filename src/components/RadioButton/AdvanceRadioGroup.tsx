import React, { Fragment, ReactNode } from "react";
import { TextStyle, View } from "react-native";

import { flexCol, flexRow, fs16RegBlack2, sh16, sw16 } from "../../styles";
import { CustomSpacer } from "../Views/Spacer";
import { TextSpaceArea } from "../Views/TextSpaceArea";
import { RadioButton } from "./RadioButton";

export interface IAdvanceRadio {
  label: string;
  right?: ReactNode;
  value: string;
}

export interface AdvanceRadioGroupProps {
  direction?: "row" | "column";
  label?: string;
  labelStyle?: TextStyle;
  options: IAdvanceRadio[];
  optionStyle?: TextStyle;
  selected: string;
  setSelected: (selected: string) => void;
  space?: number;
  spaceToLabel?: number;
  spaceToTop?: number;
}

export const AdvanceRadioGroup = ({
  direction,
  label,
  labelStyle,
  options,
  optionStyle,
  selected,
  setSelected,
  space,
  spaceToLabel,
  spaceToTop,
}: AdvanceRadioGroupProps) => {
  const defaultSpace = direction === "row" ? sw16 : sh16;
  const radioSpace = space !== undefined ? space : defaultSpace;

  return (
    <View>
      {spaceToTop !== undefined ? <CustomSpacer space={spaceToTop} /> : null}
      {label !== undefined ? (
        <TextSpaceArea spaceToBottom={spaceToLabel || sh16} style={{ ...fs16RegBlack2, ...labelStyle }} text={label} />
      ) : null}
      <View style={direction === "row" ? flexRow : flexCol}>
        {options.map((option: IAdvanceRadio, index: number) => {
          const handleSelect = () => {
            setSelected(option.value);
          };

          const zIndex = option.right !== undefined ? 2 : 1;

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction === "row"} space={radioSpace} />}
              <View style={{ zIndex: zIndex }}>
                <RadioButton
                  label={option.label}
                  labelStyle={optionStyle}
                  right={option.right}
                  selected={option.value === selected}
                  setSelected={handleSelect}
                />
              </View>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
