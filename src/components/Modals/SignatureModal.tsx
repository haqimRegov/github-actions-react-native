import React, { FunctionComponent } from "react";
import { TextStyle, View, ViewStyle } from "react-native";

import {
  circleBorder,
  colorBlack,
  colorBlue,
  colorWhite,
  flexColCC,
  flexRow,
  fs18BoldBlue1,
  px,
  sh16,
  sh24,
  sh368,
  sw1,
  sw24,
  sw40,
  sw8,
  sw832,
} from "../../styles";
import { CustomSignature } from "../Signature";
import { IconText } from "../Touchables";
import { IconButton } from "../Touchables/Icon";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";
import { BasicModal } from "./Basic";

interface SignatureModalProps {
  handleClose: () => void;
  handleConfirm: () => void;
  handleSignature: (value: string) => void;
  signature: string;
  title: string;
  titleStyle?: TextStyle;
  visible: boolean;
}

export const SignatureModal: FunctionComponent<SignatureModalProps> = ({
  handleClose,
  handleConfirm,
  handleSignature,
  signature,
  title,
  titleStyle,
  visible,
}: SignatureModalProps) => {
  const modalContainer: ViewStyle = { backgroundColor: colorWhite._1, borderRadius: sw8, height: sh368, width: sw832 };
  return (
    <BasicModal animationInTiming={500} animationOutTiming={500} visible={visible}>
      <View style={flexColCC}>
        <View style={modalContainer}>
          <CustomSpacer space={sh24} />
          <View style={{ ...flexRow, ...px(sw24) }}>
            <IconText iconSize={sw24} name="sign" text={title} textStyle={{ ...fs18BoldBlue1, ...titleStyle }} />
            <CustomFlexSpacer />
            <IconButton
              color={colorBlack._1}
              name="close"
              onPress={handleClose}
              size={sw24}
              style={circleBorder(sw40, sw1, colorBlue._4)}
            />
          </View>
          <CustomSpacer space={sh16} />
          <CustomSignature handleConfirm={handleConfirm} setSignature={handleSignature} signature={signature} />
        </View>
      </View>
    </BasicModal>
  );
};
