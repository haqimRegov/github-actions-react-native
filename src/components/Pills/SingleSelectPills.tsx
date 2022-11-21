import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { NunitoBold } from "../../constants";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorRed,
  disabledOpacity6,
  flexCol,
  flexRow,
  fs12BoldBlack2,
  fs12BoldBlue1,
  fs12BoldGray6,
  fs12BoldWhite1,
  px,
  sh16,
  sh32,
  sh4,
  sw1,
  sw16,
  sw24,
  sw326,
  sw4,
  sw40,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface SingleSelectPillsProps {
  buttonStyle?: ViewStyle;
  CustomContent?: (props: IToggleButtonCustomContent) => JSX.Element;
  direction?: "column" | "row";
  disabled?: boolean;
  disabledValues?: string[];
  header?: string;
  headerStyle?: TextStyle;
  iconSize?: number;
  labels: ICheckBoxWithSubLabel[];
  labelStyle?: TextStyle;
  onSelect: (index: string) => void;
  space?: number;
  spaceToHeader?: number;
  spaceToLabel?: number;
  textContainer?: ViewStyle;
  value: string;
}

export const SingleSelectPills: FunctionComponent<SingleSelectPillsProps> = ({
  buttonStyle,
  CustomContent,
  direction,
  disabled,
  disabledValues,
  header,
  headerStyle,
  labels,
  labelStyle: mainLabelStyle,
  onSelect,
  space,
  spaceToHeader,
  spaceToLabel,
  textContainer,
  value,
}: SingleSelectPillsProps) => {
  const defaultSpace = direction === "column" ? sh16 : sw40;
  const defaultSpaceToHeader = spaceToHeader !== undefined ? spaceToHeader : sh4;
  const eachSpace = space !== undefined ? space : defaultSpace;
  const checkDisabled = disabled === true ? "none" : "auto";
  const disabledViewStyle: ViewStyle = disabled === true ? disabledOpacity6 : {};

  return (
    <View pointerEvents={checkDisabled} style={disabledViewStyle}>
      {header !== undefined ? (
        <Fragment>
          <Text style={{ ...fs12BoldGray6, ...headerStyle }}>{header}</Text>
          <CustomSpacer space={defaultSpaceToHeader} />
        </Fragment>
      ) : null}
      <View style={flexRow}>
        <View style={direction === "column" ? flexCol : flexRow}>
          {labels.map((content: ICheckBoxWithSubLabel, index: number) => {
            const { label, labelStyle } = content;
            const disabledContent = disabledValues !== undefined && disabledValues.includes(content.label);

            const handlePress = () => {
              if (!disabledContent) {
                onSelect(label);
              }
            };

            const circleStyle: ViewStyle =
              value === label ? circleBorder(sw16, sw1, colorRed._1, colorRed._1) : circleBorder(sw16, sw1, colorBlue._1);

            const disabledBackground: ViewStyle = disabledContent === true && value === "" ? { backgroundColor: colorGray._4 } : {};
            const disabledStyle: ViewStyle = disabledContent ? { ...disabledOpacity6 } : {};
            const customContentProps: IToggleButtonCustomContent = {
              buttonStyle,
              circleStyle,
              disabledBackground,
              disabledStyle,
              label,
              labelStyle,
              mainLabelStyle,
              selected: value === label,
              textContainer,
            };

            const selectedStyle: ViewStyle = value === label ? { backgroundColor: colorBlue._1 } : { backgroundColor: colorBlue._2 };
            const containerStyle: ViewStyle = {
              ...centerHV,
              ...px(sw16),
              borderRadius: sw24,
              height: sh32,
              ...selectedStyle,
            };
            const textStyle: TextStyle = value === label ? fs12BoldWhite1 : fs12BoldBlue1;
            const defaultSpaceToLabel = spaceToLabel !== undefined ? spaceToLabel : sw4;

            return (
              <Fragment key={index}>
                {index === 0 ? null : <CustomSpacer isHorizontal={direction !== "column"} space={eachSpace} />}
                <TouchableWithoutFeedback onPress={handlePress}>
                  {CustomContent !== undefined ? (
                    <CustomContent {...customContentProps} />
                  ) : (
                    <View style={{ ...centerVertical, ...disabledStyle }}>
                      <View style={{ ...flexRow, ...containerStyle }}>
                        <CustomSpacer isHorizontal={true} space={defaultSpaceToLabel} />
                        <Text
                          style={{
                            ...fs12BoldBlack2,
                            fontFamily: NunitoBold,
                            maxWidth: sw326,
                            ...textStyle,
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
    </View>
  );
};
