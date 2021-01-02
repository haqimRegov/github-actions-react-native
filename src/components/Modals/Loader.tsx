import React, { FunctionComponent } from "react";
import { ActivityIndicator, View } from "react-native";

import { centerHV, colorWhite, fullHW } from "../../styles";
import { RNModal } from "./RNModal";

interface LoaderProps {
  visible: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({ visible }: LoaderProps) => {
  return (
    <RNModal animationType="fade" visible={visible}>
      <View style={{ ...fullHW, ...centerHV }}>
        <ActivityIndicator color={colorWhite._1} size="small" />
      </View>
    </RNModal>
  );
};
