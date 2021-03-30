import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  alignSelfStart,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorRed,
  colorWhite,
  flexCol,
  flexRow,
  fs12BoldBlack2,
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
  labels: string[];
  labelStyle?: TextStyle;
  onSelect: (index: TypeAdvanceToggleButtonValue) => void;
  space?: number;
  value: TypeAdvanceToggleButtonValue;
}

export const AdvanceToggleButton: FunctionComponent<AdvanceToggleButtonProps> = ({
  direction,
  labels,
  labelStyle,
  onSelect,
  space,
  value,
}: AdvanceToggleButtonProps) => {
  const defaultSpace = direction === "column" ? sh16 : sw40;
  const radioSpace = space !== undefined ? space : defaultSpace;

  return (
    <View style={flexRow}>
      <View style={direction === "column" ? flexCol : flexRow}>
        {labels.map((label: string, index: number) => {
          const handlePress = () => {
            const newIndex = index;
            onSelect(value !== newIndex ? newIndex : -1);
          };

          const iconColor = value === index ? colorWhite._1 : colorBlue._2;
          const circleStyle: ViewStyle =
            value === index ? circleBorder(sw24, sw1, colorRed._1, colorRed._1) : circleBorder(sw24, sw1, colorBlue._2);

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer isHorizontal={direction !== "column"} space={radioSpace} />}
              <TouchableWithoutFeedback onPress={handlePress}>
                <View style={{ ...centerVertical, ...flexRow }}>
                  <View style={alignSelfStart}>
                    <View style={{ ...centerHV, ...circleStyle }}>
                      <IcoMoon name="check" size={sw16} color={iconColor} />
                    </View>
                  </View>
                  <CustomSpacer space={sw8} isHorizontal />
                  <Text style={{ ...fs12BoldBlack2, maxWidth: sw326, ...labelStyle }}>{label}</Text>
                </View>
              </TouchableWithoutFeedback>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
