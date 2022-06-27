import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

import { centerHV, flexChild } from "../../styles";

interface SampleProps extends Object {
  title: string;
}

export const Sample: FunctionComponent<SampleProps> = ({ title }: SampleProps) => {
  return (
    <View style={{ ...centerHV, ...flexChild }}>
      <Text>{title}</Text>
    </View>
  );
};
