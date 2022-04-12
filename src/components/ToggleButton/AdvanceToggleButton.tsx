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

interface AdvanceToggleButtonProps {
  buttonStyle?: ViewStyle;
  CustomContent?: (props: IToggleButtonCustomContent) => JSX.Element;
  direction?: "column" | "row";
  disabledIndex?: number[];
  iconSize?: number;
  labels: ICheckBoxWithSubLabel[];
  labelStyle?: TextStyle;
  onSelect: (index: TypeAdvanceToggleButtonValue) => void;
  sideElement?: ReactNode;
  space?: number;
  textContainer?: ViewStyle;
  value: TypeAdvanceToggleButtonValue;
}

export const AdvanceToggleButton: FunctionComponent<AdvanceToggleButtonProps> = ({
  buttonStyle,
  CustomContent,
  direction,
  disabledIndex,
  iconSize,
  labels,
  labelStyle: mainLabelStyle,
  onSelect,
  sideElement,
  space,
  textContainer,
  value,
}: AdvanceToggleButtonProps) => {
  const defaultSpace = direction === "column" ? sh16 : sw40;
  const radioSpace = space !== undefined ? space : defaultSpace;

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
          const disabledStyle: ViewStyle = disabled ? { opacity: 0.6 } : {};
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
                    <View style={alignSelfStart}>
                      <View style={{ ...centerHV, ...circleStyle, ...disabledBackground, ...buttonStyle }}>
                        <IcoMoon name="success" size={iconSize || sw12} color={iconColor} />
                      </View>
                    </View>
                    <CustomSpacer space={sw8} isHorizontal />
                    <View style={{ ...alignSelfStart, ...textContainer }}>
                      <View style={flexRow}>
                        <Text
                          style={{
                            ...fs12BoldGray6,
                            fontFamily: fontFamily,
                            maxWidth: sw326,
                            ...mainLabelStyle,
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
                        <Text style={{ ...fs12RegGray5, maxWidth: sw326, ...subLabelStyle }}>{subLabel}</Text>
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
