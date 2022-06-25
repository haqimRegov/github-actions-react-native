import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold, NunitoRegular } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  alignSelfStart,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  disabledOpacity6,
  flexCol,
  flexRow,
  fs12BoldGray6,
  fs12RegGray5,
  sh16,
  sw1,
  sw12,
  sw16,
  sw326,
  sw40,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

export interface AdvanceToggleButtonProps {
  buttonContainerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  contentToRadioSpace?: number;
  CustomContent?: (props: IToggleButtonCustomContent) => JSX.Element;
  direction?: "column" | "row";
  disabledIndex?: number[];
  iconSize?: number;
  labels: ICheckBoxWithSubLabel[];
  labelStyle?: TextStyle;
  onSelect: (index: TypeAdvanceToggleButtonValue) => void;
  sideElement?: ReactNode;
  space?: number;
  subLabelStyle?: TextStyle;
  textContainer?: ViewStyle;
  value: TypeAdvanceToggleButtonValue;
}

export const AdvanceToggleButton: FunctionComponent<AdvanceToggleButtonProps> = ({
  buttonContainerStyle,
  buttonStyle,
  contentToRadioSpace,
  CustomContent,
  direction,
  disabledIndex,
  iconSize,
  labels,
  labelStyle: mainLabelStyle,
  onSelect,
  sideElement,
  space,
  subLabelStyle: mainSubLabelStyle,
  textContainer,
  value,
}: AdvanceToggleButtonProps) => {
  const defaultSpace = direction === "column" ? sh16 : sw40;
  const radioSpace = space !== undefined ? space : defaultSpace;
  const radioToContentSpace = contentToRadioSpace !== undefined ? contentToRadioSpace : sw8;

  return (
    <View style={flexRow}>
      <View style={direction === "column" ? flexCol : flexRow}>
        {labels.map((content: ICheckBoxWithSubLabel, index: number) => {
          const { label, labelStyle, subLabel, subLabelStyle } = content;
          const selected = value === index;
          const disabled = disabledIndex !== undefined && disabledIndex.includes(index);

          const handlePress = () => {
            if (!disabled) {
              const newIndex = index;
              onSelect(value !== newIndex ? newIndex : -1);
            }
          };

          const iconColor = value === index ? colorWhite._1 : colorBlue._1;
          const circleStyle: ViewStyle =
            value === index ? circleBorder(sw16, sw1, colorRed._1, colorRed._1) : circleBorder(sw16, sw1, colorBlue._1);

          const disabledBackground: ViewStyle = disabled === true && selected === false ? { backgroundColor: colorGray._4 } : {};
          const disabledStyle: ViewStyle = disabled ? { ...disabledOpacity6 } : {};
          const fontFamily = selected === true ? NunitoBold : NunitoRegular;
          const customContentProps: IToggleButtonCustomContent = {
            disabledStyle,
            buttonStyle,
            circleStyle,
            disabledBackground,
            textContainer,
            mainLabelStyle,
            labelStyle,
            label,
            selected: value === index,
          };

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction !== "column"} space={radioSpace} />}
              <TouchableWithoutFeedback onPress={handlePress}>
                {CustomContent !== undefined ? (
                  <CustomContent {...customContentProps} />
                ) : (
                  <View style={{ ...centerVertical, ...flexRow, ...disabledStyle }}>
                    <View style={{ ...alignSelfStart, ...buttonContainerStyle }}>
                      <View style={{ ...centerHV, ...circleStyle, ...disabledBackground, ...buttonStyle }}>
                        <IcoMoon name="success" size={iconSize || sw12} color={iconColor} />
                      </View>
                    </View>
                    <CustomSpacer space={radioToContentSpace} isHorizontal />
                    <View style={{ ...alignSelfStart, ...textContainer }}>
                      <View style={flexRow}>
                        <Text
                          style={{
                            ...fs12BoldGray6,
                            maxWidth: sw326,
                            ...mainLabelStyle,
                            fontFamily: fontFamily,
                            ...labelStyle,
                          }}>
                          {label}
                        </Text>
                        {sideElement !== undefined ? (
                          <Fragment>
                            <CustomSpacer isHorizontal space={sw8} />
                            {sideElement}
                          </Fragment>
                        ) : null}
                      </View>
                      {subLabel !== undefined ? (
                        <Text style={{ ...fs12RegGray5, maxWidth: sw326, ...mainSubLabelStyle, ...subLabelStyle }}>{subLabel}</Text>
                      ) : null}
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
