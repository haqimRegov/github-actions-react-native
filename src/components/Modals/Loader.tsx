import React, { FunctionComponent } from "react";

import { colorBlack, colorWhite, fullHeight } from "../../styles";
import { Loading } from "../Views/Loading";
import { RNModal } from "./RNModal";

interface LoaderProps {
  visible: boolean;
}

export const Loader: FunctionComponent<LoaderProps> = ({ visible }: LoaderProps) => {
  return (
    <RNModal animationType="fade" style={{ backgroundColor: colorBlack._1_4 }} visible={visible}>
      <Loading color={colorWhite._1} style={fullHeight} />
    </RNModal>
  );
};
