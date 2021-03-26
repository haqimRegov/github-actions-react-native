import React, { Fragment, FunctionComponent } from "react";
import { ViewStyle } from "react-native";

import { circleBorder, colorBlue, colorGray, colorWhite, sh48, sw1, sw16, sw24 } from "../../styles";
import { IconButton } from "../Touchables/Icon";
import { CustomSpacer } from "../Views/Spacer";

interface UploadButtonProps {
  color?: string;
  icon: string;
  onPress: () => void;
  size?: number;
  withDebounce?: boolean;
}

export const UploadButton: FunctionComponent<UploadButtonProps> = ({ icon, onPress }: UploadButtonProps) => {
  const iconButtonStyle: ViewStyle = circleBorder(sh48, sw1, colorGray._3, colorWhite._1);
  return (
    <Fragment>
      <IconButton color={colorBlue._2} name={icon} onPress={onPress} size={sw24} style={iconButtonStyle} withDebounce={true} />
      <CustomSpacer isHorizontal={true} space={sw16} />
    </Fragment>
  );
};
