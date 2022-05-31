import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorBlue,
  colorGray,
  colorRed,
  disabledOpacity6,
  flexCol,
  flexRow,
  fs12BoldBlack2,
  px,
  sh16,
  sh32,
  sw1,
  sw14,
  sw16,
  sw24,
  sw326,
  sw40,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface MultiSelectChipsProps {
  buttonStyle?: ViewStyle;
  CustomContent?: (props: IToggleButtonCustomContent) => JSX.Element;
  direction?: "column" | "row";
  disabledIndex?: number[];
  iconSize?: number;
  labels: ICheckBoxWithSubLabel[];
  labelStyle?: TextStyle;
  onSelect: (index: string[]) => void;
  space?: number;
  textContainer?: ViewStyle;
  values: string[];
}

export const MultiSelectChips: FunctionComponent<MultiSelectChipsProps> = ({
  buttonStyle,
  CustomContent,
  direction,
  disabledIndex,
  iconSize,
  labels,
  labelStyle: mainLabelStyle,
  onSelect,
  space,
  textContainer,
  values,
}: MultiSelectChipsProps) => {
  const defaultSpace = direction === "column" ? sh16 : sw40;
  const eachSpace = space !== undefined ? space : defaultSpace;

  return (
    <View style={flexRow}>
      <View style={direction === "column" ? flexCol : flexRow}>
        {labels.map((content: ICheckBoxWithSubLabel, index: number) => {
          const { label, labelStyle } = content;
          const selected = values.findIndex((eachValue: string) => eachValue === label);
          const disabled = disabledIndex !== undefined && disabledIndex.includes(index);

          const handlePress = () => {
            if (!disabled) {
              const updatedValues = [...values];
              if (selected === -1) {
                updatedValues.push(label);
              } else {
                updatedValues.splice(selected, 1);
              }
              onSelect(updatedValues);
            }
          };

          const circleStyle: ViewStyle =
            selected !== -1 ? circleBorder(sw16, sw1, colorRed._1, colorRed._1) : circleBorder(sw16, sw1, colorBlue._1);

          const disabledBackground: ViewStyle = disabled === true && selected === -1 ? { backgroundColor: colorGray._4 } : {};
          const disabledStyle: ViewStyle = disabled ? { ...disabledOpacity6 } : {};
          const customContentProps: IToggleButtonCustomContent = {
            disabledStyle,
            buttonStyle,
            circleStyle,
            disabledBackground,
            textContainer,
            mainLabelStyle,
            labelStyle,
            label,
            selected: selected !== -1,
          };

          const selectedStyle: ViewStyle =
            selected !== -1 ? { borderColor: colorRed._1, backgroundColor: colorRed._1_2 } : { borderColor: colorBlue._1 };
          const containerStyle: ViewStyle = {
            ...centerHV,
            ...px(sw16),
            borderRadius: sw24,
            borderWidth: sw1,
            height: sh32,
            ...selectedStyle,
          };

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction !== "column"} space={eachSpace} />}
              <TouchableWithoutFeedback onPress={handlePress}>
                {CustomContent !== undefined ? (
                  <CustomContent {...customContentProps} />
                ) : (
                  <View style={{ ...centerVertical, ...disabledStyle }}>
                    <View style={{ ...flexRow, ...containerStyle }}>
                      {selected !== -1 ? (
                        <Fragment>
                          <View style={{ ...centerHV, ...disabledBackground, ...buttonStyle }}>
                            <IcoMoon name="success" size={iconSize || sw14} color={colorBlack._2} />
                          </View>
                        </Fragment>
                      ) : null}
                      <Text
                        style={{
                          ...fs12BoldBlack2,
                          fontFamily: NunitoBold,
                          maxWidth: sw326,
                          ...mainLabelStyle,
                          ...labelStyle,
                        }}>
                        {label}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableWithoutFeedback>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
