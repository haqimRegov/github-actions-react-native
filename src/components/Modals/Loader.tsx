import React from "react";
import { ActivityIndicator, View } from "react-native";

import { centerHV, colorWhite, fullHeight } from "../../styles";
import { BasicModal } from "./Basic";

interface LoaderProps {
  visible: boolean;
}

export const Loader = ({ visible }: LoaderProps) => {
  return (
    <BasicModal animationIn="fadeIn" animationOut="fadeOut" visible={visible}>
      <View style={{ ...fullHeight, ...centerHV }}>
        <ActivityIndicator color={colorWhite._1} size="small" />
      </View>
    </BasicModal>
  );
};
