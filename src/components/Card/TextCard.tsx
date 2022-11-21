import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import { fs12BoldGray5, fsCapitalize, sh16, sh2, sw144, sw16, sw240, sw32 } from "../../styles";
import { isNotEmpty } from "../../utils";
import { LabeledTitle } from "../Views/LabeledTitle";
import { CustomCard } from "./Custom";

export interface TextCardProps {
  data: LabeledTitleProps[];
  itemStyle?: ViewStyle;
  labelStyle?: TextStyle;
  spaceToLabel?: number;
  titleStyle?: TextStyle;
  showEmptyDash?: boolean;

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
  showEmptyDash,
  spaceToLabel,
  titleStyle,
  ...customCardProps
}: TextCardProps) => {
  const defaultSpaceToLabel = spaceToLabel !== undefined ? spaceToLabel : sh2;
  const items = data.map((item: LabeledTitleProps, index: number) => {
    const itemDefaultStyle: ViewStyle = { width: sw240, ...itemStyle, ...item.style };
    const itemSpaceToLabel = item.spaceToLabel !== undefined ? item.spaceToLabel : defaultSpaceToLabel;
    const title = showEmptyDash === true && isNotEmpty(item.title) === false ? "-" : item.title;

    return (
      <View key={index} style={itemDefaultStyle}>
        <LabeledTitle
          {...item}
          title={title}
          iconSize={item.iconSize !== undefined ? item.iconSize : sw16}
          labelStyle={{ ...fs12BoldGray5, ...labelStyle, ...item.labelStyle }}
          onPress={item.onPress}
          spaceToLabel={itemSpaceToLabel}
          style={{ minWidth: sw144, ...item.style }}
          titleStyle={{ ...fsCapitalize, ...titleStyle, ...item.titleStyle }}
        />
      </View>
    );
  });

  return <CustomCard spaceBetweenGroup={sh16} spaceBetweenItem={sw32} {...customCardProps} items={items} />;
};
