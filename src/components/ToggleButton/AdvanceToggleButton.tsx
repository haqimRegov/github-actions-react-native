import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

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
  fs12BoldBlack2,
  fs12RegGray8,
  sh16,
  sw1,
  sw16,
  sw24,
  sw326,
  sw40,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../Views/Spacer";

interface AdvanceToggleButtonProps {
  direction?: "column" | "row";
  disabledIndex?: number[];
  labels: ICheckBoxWithSubLabel[];
  onSelect: (index: TypeAdvanceToggleButtonValue) => void;
  sideElement?: ReactNode;
  space?: number;
  textContainer?: ViewStyle;
  value: TypeAdvanceToggleButtonValue;
}

export const AdvanceToggleButton: FunctionComponent<AdvanceToggleButtonProps> = ({
  direction,
  disabledIndex,
  labels,
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
            const newIndex = index;
            onSelect(value !== newIndex ? newIndex : -1);
          };

          const iconColor = value === index ? colorWhite._1 : colorBlue._2;
          const circleStyle: ViewStyle =
            value === index ? circleBorder(sw24, sw1, colorRed._1, colorRed._1) : circleBorder(sw24, sw1, colorBlue._2);

          const disabledBackground: ViewStyle = disabled === true && selected === false ? { backgroundColor: colorGray._9 } : {};
          const disabledStyle: ViewStyle = disabled ? { opacity: 0.6 } : {};
          const fontFamily = selected ? NunitoBold : NunitoRegular;

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction !== "column"} space={radioSpace} />}
              <TouchableWithoutFeedback onPress={handlePress}>
                <View style={{ ...centerVertical, ...flexRow, ...disabledStyle }}>
                  <View style={alignSelfStart}>
                    <View style={{ ...centerHV, ...circleStyle, ...disabledBackground }}>
                      <IcoMoon name="success" size={sw16} color={iconColor} />
                    </View>
                  </View>
                  <CustomSpacer space={sw8} isHorizontal />
                  <View style={{ ...alignSelfStart, ...textContainer }}>
                    <View style={flexRow}>
                      <Text style={{ ...fs12BoldBlack2, fontFamily: fontFamily, maxWidth: sw326, ...labelStyle }}>{label}</Text>
                      {sideElement !== undefined ? (
                        <Fragment>
                          <CustomSpacer isHorizontal space={sw8} />
                          {sideElement}
                        </Fragment>
                      ) : null}
                    </View>
                    {subLabel !== undefined ? <Text style={{ ...fs12RegGray8, maxWidth: sw326, ...subLabelStyle }}>{subLabel}</Text> : null}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
