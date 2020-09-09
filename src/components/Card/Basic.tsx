import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { flexRow, fs10BoldBlack2, fs16BoldBlack2, fsCapitalize, sh6, sw144, sw16 } from "../../styles";
import { LabeledTitle, LabeledTitleProps } from "../Views/LabeledTitle";
import { CustomSpacer } from "../Views/Spacer";

export interface BasicCardProps {
  data: LabeledTitleProps[];
  itemStyle?: ViewStyle;
  labelStyle?: TextStyle;
  spaceBetween?: number;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}
export const BasicCard: FunctionComponent<BasicCardProps> = ({
  data,
  itemStyle,
  labelStyle,
  spaceBetween,
  style,
  titleStyle,
}: BasicCardProps) => {
  const defaultSpace = spaceBetween !== undefined ? spaceBetween : sw16;

  return (
    <View style={{ ...flexRow, ...style }}>
      {data.map((item: LabeledTitleProps, index: number) => (
        <Fragment key={index}>
          {index === 0 ? null : <CustomSpacer isHorizontal={true} space={defaultSpace} />}
          <LabeledTitle
            {...item}
            labelStyle={{ ...fs10BoldBlack2, ...labelStyle, ...item.labelStyle }}
            onPress={item.onPress}
            spaceToLabel={sh6}
            style={{ minWidth: sw144, ...itemStyle, ...item.style }}
            titleStyle={{ ...fs16BoldBlack2, ...fsCapitalize, ...titleStyle, ...item.titleStyle }}
          />
        </Fragment>
      ))}
    </View>
  );
};
