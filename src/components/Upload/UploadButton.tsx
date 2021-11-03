import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { circleBorder, colorBlue, colorWhite, sw1, sw24, sw40 } from "../../styles";
import { IconButton } from "../Touchables/Icon";

interface UploadButtonProps {
  color?: string;
  icon: string;
  onPress: () => void;
  size?: number;
  withDebounce?: boolean;
}

export const UploadButton: FunctionComponent<UploadButtonProps> = ({ icon, onPress }: UploadButtonProps) => {
  const iconButtonStyle: ViewStyle = circleBorder(sw40, sw1, colorBlue._4, colorWhite._1);
  return <IconButton color={colorBlue._1} name={icon} onPress={onPress} size={sw24} style={iconButtonStyle} withDebounce={true} />;
};
