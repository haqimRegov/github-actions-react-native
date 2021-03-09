import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { fs12BoldBlack2, fs16BoldBlack1, fsCapitalize, sh16, sh8, sw144, sw16, sw240, sw32 } from "../../styles";
import { LabeledTitle, LabeledTitleProps } from "../Views/LabeledTitle";
import { CustomCard } from "./Custom";

export interface TextCardProps {
  data: LabeledTitleProps[];
  itemStyle?: ViewStyle;
  labelStyle?: TextStyle;
  spaceToLabel?: number;
  titleStyle?: TextStyle;

  direction?: "row" | "column";
  itemsPerGroup?: number;
  spaceBetweenGroup?: number;
  spaceBetweenItem?: number;
  noLastIndexSpace?: boolean;
}
export const TextCard: FunctionComponent<TextCardProps> = ({
  data,
  itemStyle,
  labelStyle,
  spaceToLabel,
  titleStyle,
  ...customCardProps
}: TextCardProps) => {
  // TODO this component is created for personal information summary
  // TODO spacing in between items is constant
  const defaultSpaceToLabel = spaceToLabel !== undefined ? spaceToLabel : sh8;
  const items = data.map((item: LabeledTitleProps, index: number) => {
    const itemDefaultStyle: ViewStyle = { width: sw240, ...itemStyle, ...item.style };
    return (
      <View key={index} style={itemDefaultStyle}>
        <LabeledTitle
          {...item}
          iconSize={item.iconSize !== undefined ? item.iconSize : sw16}
          labelStyle={{ ...fs12BoldBlack2, lineHeight: sh16, ...labelStyle, ...item.labelStyle }}
          onPress={item.onPress}
          spaceToLabel={defaultSpaceToLabel}
          style={{ minWidth: sw144, ...item.style }}
          titleStyle={{ ...fs16BoldBlack1, ...fsCapitalize, ...titleStyle, ...item.titleStyle }}
        />
      </View>
    );
  });

  return <CustomCard spaceBetweenGroup={sh16} spaceBetweenItem={sw32} {...customCardProps} items={items} />;
};
