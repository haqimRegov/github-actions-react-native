import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { Avatar, CustomSpacer } from "../../components";
import { colorWhite, fs10RegBlack2, fs16BoldBlack2, noShadow, rowCenterVertical, sh32, shadow16Blue112, sw16, sw32 } from "../../styles";

interface QuestionHeaderProps {
  avatarText: string;
  label: string;
}

export const QuestionHeader: FunctionComponent<QuestionHeaderProps> = ({ avatarText, label }: QuestionHeaderProps) => {
  return (
    <View style={rowCenterVertical}>
      <View style={{ height: sh32, width: sw32, ...shadow16Blue112 }}>
        <Avatar containerStyle={noShadow} size={sw32} text={avatarText} textStyle={fs10RegBlack2} type="custom" color={colorWhite._1} />
      </View>
      <CustomSpacer isHorizontal={true} space={sw16} />
      <Text style={fs16BoldBlack2}>{label}</Text>
    </View>
  );
};
