import React from "react";
import { Text, View } from "react-native";

import { colorGray, sh120 } from "../../../styles";

export interface ProductGraphProps {
  item: ITableData;
}

export const ProductGraph = ({ item }: ProductGraphProps) => {
  return (
    <View style={{ height: sh120, backgroundColor: colorGray._2 }}>
      <Text>{item.graph}</Text>
    </View>
  );
};
