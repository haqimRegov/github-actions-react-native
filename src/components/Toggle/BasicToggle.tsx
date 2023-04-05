import React, { FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  alignFlexStart,
  border,
  centerHV,
  colorBlue,
  colorRed,
  flexRow,
  fs10BoldBlue1,
  fs10BoldWhite1,
  fullHeight,
  px,
  sh24,
  sw1,
  sw24,
} from "../../styles";

declare interface IToggle {
  labels: string[];
  selected: string;
  setSelected: (text: string) => void;
}

export const Toggle: FunctionComponent<IToggle> = ({ labels, selected, setSelected }: IToggle) => {
  const containerStyle: ViewStyle = {
    ...border(colorRed._1, sw1, sw24),
    ...flexRow,
    height: sh24,
  };
  const contentStyle: ViewStyle = {
    ...centerHV,
    ...flexRow,
    ...fullHeight,
    ...px(sw24),
  };
  return (
    <View style={alignFlexStart}>
      <View style={containerStyle}>
        {labels.map((label: string, index: number) => {
          const selectedText = label === selected ? fs10BoldWhite1 : fs10BoldBlue1;
          const selectedBackground = label === selected ? colorRed._1 : colorBlue._2;
          const borderLast: ViewStyle = index === labels.length - 1 ? { borderTopRightRadius: sw24, borderBottomRightRadius: sw24 } : {};
          const borderContent: ViewStyle = index === 0 ? { borderTopLeftRadius: sw24, borderBottomLeftRadius: sw24 } : borderLast;

          const handleToggle = () => {
            setSelected(labels[index]);
          };
          return (
            <TouchableWithoutFeedback key={index} onPress={handleToggle}>
              <View key={index} style={{ ...contentStyle, ...borderContent, backgroundColor: selectedBackground }}>
                <Text style={selectedText}>{label}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};
