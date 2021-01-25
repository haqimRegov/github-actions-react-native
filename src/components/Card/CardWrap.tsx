import React, { Fragment, FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import {
  flexCol,
  flexRow,
  flexWrap,
  fs10BoldBlack2,
  fs16BoldBlack1,
  fsCapitalize,
  sh16,
  sh8,
  sw144,
  sw16,
  sw24,
  sw240,
  sw32,
  sw8,
} from "../../styles";
import { LabeledTitle, LabeledTitleProps } from "../Views/LabeledTitle";
import { CustomSpacer } from "../Views/Spacer";

export interface CardWrapProps {
  data: LabeledTitleProps[];
  direction?: "row" | "column";
  itemStyle?: ViewStyle;
  labelStyle?: TextStyle;
  style?: ViewStyle;
  spaceBetween?: number;
  spaceToLabel?: number;
  noInitialSpace?: boolean;
  titleStyle?: TextStyle;
}
export const CardWrap: FunctionComponent<CardWrapProps> = ({
  data,
  direction,
  itemStyle,
  labelStyle,
  noInitialSpace,
  spaceBetween,
  spaceToLabel,
  style,
  titleStyle,
}: CardWrapProps) => {
  // TODO this component is created for personal information summary
  // TODO spacing in between items is constant

  const defaultDirection = direction === "column" ? flexCol : flexRow;
  return (
    <View style={{ ...defaultDirection, ...flexWrap, ...style }}>
      {data.map((item: LabeledTitleProps, index: number) => {
        const itemDefaultStyle: ViewStyle = { marginBottom: sh16, width: sw240, ...itemStyle, ...item.style };
        const initialSpace = index === 0 ? sw32 : sw8;
        const defaultSpaceToLabel = spaceToLabel !== undefined ? spaceToLabel : sh8;

        return (
          <Fragment key={index}>
            {noInitialSpace === true ? null : <CustomSpacer isHorizontal={true} space={initialSpace} />}
            <View style={itemDefaultStyle}>
              <LabeledTitle
                {...item}
                iconSize={item.iconSize !== undefined ? item.iconSize : sw16}
                labelStyle={{ ...fs10BoldBlack2, ...labelStyle, ...item.labelStyle }}
                onPress={item.onPress}
                spaceToLabel={defaultSpaceToLabel}
                style={{ minWidth: sw144, ...item.style }}
                titleStyle={{ ...fs16BoldBlack1, ...fsCapitalize, ...titleStyle, ...item.titleStyle }}
              />
            </View>
            {index === data.length - 1 ? null : <CustomSpacer isHorizontal={true} space={spaceBetween || sw24} />}
          </Fragment>
        );
      })}
    </View>
  );
};
