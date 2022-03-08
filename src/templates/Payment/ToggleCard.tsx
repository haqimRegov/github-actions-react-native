import React, { FunctionComponent } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

import { CustomSpacer } from "../../components";
import { IcoMoon } from "../../icons";
import {
  border,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlue,
  colorGray,
  colorRed,
  colorWhite,
  flexRow,
  fs10RegBlack2,
  fs10RegGray4,
  fs14BoldBlack2,
  px,
  py,
  sh13,
  sh80,
  sw1,
  sw12,
  sw184,
  sw24,
  sw8,
} from "../../styles";

export interface ToggleCardProps {
  description1?: string;
  description2?: string;
  onPress?: () => void;
  selected?: boolean;
  title: string;
  type: string;
}

export const ToggleCard: FunctionComponent<ToggleCardProps> = ({
  description1,
  description2,
  onPress,
  selected,
  title,
  type,
}: ToggleCardProps) => {
  const borderColor = selected === true ? colorBlue._1 : colorGray._2;
  const cardStyle: ViewStyle = {
    ...border(borderColor, sw1, sw8),
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...py(sh13),
    height: sh80,
    minWidth: sw184,
  };

  const iconColor = selected === true ? colorWhite._1 : colorBlue._1;
  const circleStyle: ViewStyle =
    selected === true ? circleBorder(sw24, sw1, colorRed._1, colorRed._1) : circleBorder(sw24, sw1, colorBlue._1);

  return (
    <Pressable onPress={onPress} style={cardStyle}>
      <View style={{ ...centerHV, ...circleStyle }}>
        <IcoMoon name="success" size={sw12} color={iconColor} />
      </View>
      <CustomSpacer isHorizontal={true} space={sw8} />
      <View>
        <Text style={fs10RegBlack2}>{type}</Text>
        <Text style={fs14BoldBlack2}>{title}</Text>
        <Text style={fs10RegGray4}>{description1}</Text>
        <Text style={fs10RegGray4}>{description2}</Text>
      </View>
    </Pressable>
  );
};
