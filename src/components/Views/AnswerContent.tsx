import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

interface AnswerContentProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}
export const AnswerContent = ({ children, containerStyle }: AnswerContentProps) => {
  return <View style={containerStyle}>{children}</View>;
};
