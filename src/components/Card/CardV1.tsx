import React, { Fragment, FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { flexRow, flexWrap, fs10BoldBlack2, fs16BoldBlack1, fsCapitalize, sh16, sh8, sw144, sw24, sw240, sw32, sw8 } from "../../styles";
import { LabeledTitle, LabeledTitleProps } from "../Views/LabeledTitle";
import { CustomSpacer } from "../Views/Spacer";

export interface CardV1Props {
  data: LabeledTitleProps[];
  itemStyle?: ViewStyle;
  style?: ViewStyle;
}
export const CardV1: FunctionComponent<CardV1Props> = ({ data, itemStyle, style }: CardV1Props) => {
  // TODO this component is created for personal information summary
  // TODO spacing in between items is constant

  return (
    <View style={{ ...flexRow, ...flexWrap, ...style }}>
      {data.map((item: LabeledTitleProps, index: number) => {
        const itemDefaultStyle: ViewStyle = { marginBottom: sh16, width: sw240, ...itemStyle, ...item.style };
        return (
          <Fragment key={index}>
            {index === 0 ? <CustomSpacer isHorizontal={true} space={sw32} /> : <CustomSpacer isHorizontal={true} space={sw8} />}
            <View style={itemDefaultStyle}>
              <LabeledTitle
                {...item}
                labelStyle={{ ...fs10BoldBlack2, ...item.labelStyle }}
                onPress={item.onPress}
                spaceToLabel={sh8}
                style={{ minWidth: sw144, ...item.style }}
                titleStyle={{ ...fs16BoldBlack1, ...fsCapitalize, ...item.titleStyle }}
              />
            </View>
            {index === data.length - 1 ? null : <CustomSpacer isHorizontal={true} space={sw24} />}
          </Fragment>
        );
      })}
    </View>
  );
};
