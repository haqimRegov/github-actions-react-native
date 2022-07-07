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
  fs12BoldGray6,
  px,
  sh16,
  sh32,
  sh4,
  sw1,
  sw14,
  sw16,
  sw24,
  sw326,
  sw4,
  sw40,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface MultiSelectPillsProps {
  buttonStyle?: ViewStyle;
  CustomContent?: (props: IToggleButtonCustomContent) => JSX.Element;
  direction?: "column" | "row";
  disabledValues?: string[];
  header?: string;
  headerStyle?: TextStyle;
  iconSize?: number;
  labels: ICheckBoxWithSubLabel[];
  labelStyle?: TextStyle;
  onSelect: (index: string[]) => void;
  space?: number;
  spaceToHeader?: number;
  spaceToLabel?: number;
  textContainer?: ViewStyle;
  values: string[];
}

export const MultiSelectPills: FunctionComponent<MultiSelectPillsProps> = ({
  buttonStyle,
  CustomContent,
  direction,
  disabledValues,
  header,
  headerStyle,
  iconSize,
  labels,
  labelStyle: mainLabelStyle,
  onSelect,
  space,
  spaceToHeader,
  spaceToLabel,
  textContainer,
  values,
}: MultiSelectPillsProps) => {
  const defaultSpace = direction === "column" ? sh16 : sw40;
  const defaultSpaceToHeader = spaceToHeader !== undefined ? spaceToHeader : sh4;
  const eachSpace = space !== undefined ? space : defaultSpace;

  return (
    <View>
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
            const selected = values.findIndex((eachValue: string) => eachValue === label);
            const disabled = disabledValues !== undefined && disabledValues.includes(content.label);

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
                        {selected !== -1 ? (
                          <Fragment>
                            <View style={{ ...centerHV, ...disabledBackground, ...buttonStyle }}>
                              <IcoMoon name="success" size={iconSize || sw14} color={colorBlack._2} />
                            </View>
                          </Fragment>
                        ) : null}
                        <CustomSpacer isHorizontal={true} space={defaultSpaceToLabel} />
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
    </View>
  );
};
