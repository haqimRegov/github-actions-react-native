import React, { FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import {
  circleBorder,
  colorBlack,
  colorGray,
  colorWhite,
  flexColCC,
  flexRow,
  fs16BoldBlack2,
  px,
  sh24,
  sh368,
  sw1,
  sw14,
  sw24,
  sw8,
  sw832,
} from "../../styles";
import { CustomSignatureV2 } from "../Signature";
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
            <Text style={{ ...fs16BoldBlack2, ...titleStyle }}>{title}</Text>
            <CustomFlexSpacer />
            <IconButton
              color={colorBlack._1}
              name="close"
              onPress={handleClose}
              size={sw14}
              style={circleBorder(sw24, sw1, colorGray._3)}
            />
          </View>
          <CustomSpacer space={sh24} />
          <CustomSignatureV2 handleConfirm={handleConfirm} setSignature={handleSignature} signature={signature} />
        </View>
      </View>
    </BasicModal>
  );
};
