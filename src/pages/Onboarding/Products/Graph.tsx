import React from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomSpacer } from "../../../components";
import { border, colorGray, flexChild, flexRow, sh120, sw1, sw12, sw23, sw56 } from "../../../styles";

export interface ProductGraphProps {
  item: IProduct;
}

export const ProductGraph = ({ item }: ProductGraphProps) => {
  const container: ViewStyle = {
    height: sh120,
    ...flexChild,
    ...border(colorGray._2, sw1, sw12),
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  };

  return (
    <View style={flexRow}>
      <CustomSpacer isHorizontal={true} space={sw56} />
      <View style={container}>
        <Text>{item.graph}</Text>
      </View>
      <CustomSpacer isHorizontal={true} space={sw23} />
    </View>
  );
};
