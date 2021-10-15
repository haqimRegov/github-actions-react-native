import React, { FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { circleBorder, colorBlue, colorGray, colorWhite, sw1, sw24, sw40 } from "../../styles";
import { IconButton } from "../Touchables/Icon";

interface UploadButtonProps {
  color?: string;
  icon: string;
  onPress: () => void;
  size?: number;
  withDebounce?: boolean;
}

export const UploadButton: FunctionComponent<UploadButtonProps> = ({ icon, onPress }: UploadButtonProps) => {
  const iconButtonStyle: ViewStyle = circleBorder(sw40, sw1, colorGray._3, colorWhite._1);
  return <IconButton color={colorBlue._2} name={icon} onPress={onPress} size={sw24} style={iconButtonStyle} withDebounce={true} />;
};
