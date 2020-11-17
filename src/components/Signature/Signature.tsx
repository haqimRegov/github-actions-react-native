import React, { FunctionComponent, useState } from "react";
import { Image, View, ViewStyle } from "react-native";
import SignatureCapture, { SaveEventParams, SignatureCaptureProps } from "react-native-signature-capture";

import { Language } from "../../constants";
import { centerHV, colorGray, colorWhite, flexRowCC, fullHW, px, sh16, sh20, sh200, sw1, sw10, sw16, sw205, sw24 } from "../../styles";
import { RoundedButton } from "../Touchables";
import { CustomSpacer } from "../Views/Spacer";

const { SIGNATURE } = Language.PAGE;

interface CustomSignatureProps {
  handleCancel?: () => void;
  handleConfirm?: () => void;
  height?: number;
  primaryText?: string;
  secondaryText?: string;
  setSignature: (res: string) => void;
  signature: string;
  signatureContainerStyle?: ViewStyle;
  spaceToBottom?: number;
  spaceToButtons?: number;
}

export const CustomSignature: FunctionComponent<CustomSignatureProps> = ({
  handleCancel,
  handleConfirm,
  height,
  primaryText,
  secondaryText,
  setSignature,
  signature,
  signatureContainerStyle,
  spaceToBottom,
  spaceToButtons,
}: CustomSignatureProps) => {
  const [signRef, setSignRef] = useState<SignatureCapture | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handlePressCancel = () => {
    if (handleCancel !== undefined) {
      handleCancel();
    }
    setSignature("");
    if (signRef !== null) {
      signRef.resetImage();
    }
  };

  const handlePressConfirm = () => {
    if (handleConfirm !== undefined) {
      handleConfirm();
    }
    if (signRef !== null) {
      signRef.saveImage();
    }
  };

  const saveEvent = (result: SaveEventParams) => {
    if (result.encoded !== "") {
      setDisabled(false);
      const base64String = `data:image/png;base64,${result.encoded}`;
      setSignature(base64String);
    }
  };

  const handleDisabled = () => {
    setDisabled(false);
  };

  const defaultHeight = height !== undefined ? height : sh200;
  const signatureStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorWhite._1,
    borderColor: colorGray._5,
    borderWidth: sw1,
    height: defaultHeight,
  };
  const container: ViewStyle = {
    ...px(sw24),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    ...signatureContainerStyle,
  };
  const defaultProps: SignatureCaptureProps = {
    showBorder: false,
    showTitleLabel: false,
    showNativeButtons: false,
    viewMode: "landscape",
  };
  const defaultSpaceToBottom = spaceToBottom === undefined ? sh20 : spaceToBottom;
  const defaultSpaceToButtons = spaceToButtons === undefined ? sh16 : spaceToButtons;
  const cancelText = secondaryText !== undefined ? secondaryText : SIGNATURE.BUTTON_CANCEL;
  const confirmText = primaryText !== undefined ? primaryText : SIGNATURE.BUTTON_CONFIRM;
  const confirmDisabled = disabled;

  return (
    <View style={container}>
      <View style={signatureStyle}>
        {signature === "" ? (
          <SignatureCapture onDragEvent={handleDisabled} onSaveEvent={saveEvent} ref={setSignRef} style={fullHW} {...defaultProps} />
        ) : (
          <Image source={{ uri: signature }} style={fullHW} />
        )}
      </View>
      <CustomSpacer space={defaultSpaceToButtons} />
      <View style={flexRowCC}>
        <RoundedButton buttonStyle={{ width: sw205 }} onPress={handlePressCancel} secondary={true} text={cancelText} />
        <CustomSpacer isHorizontal={true} space={sw16} />
        <RoundedButton buttonStyle={{ width: sw205 }} disabled={confirmDisabled} onPress={handlePressConfirm} text={confirmText} />
      </View>
      <CustomSpacer space={defaultSpaceToBottom} />
    </View>
  );
};
