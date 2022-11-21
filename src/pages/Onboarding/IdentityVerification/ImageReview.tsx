import React, { Fragment, FunctionComponent } from "react";
import { Image, View, ViewStyle } from "react-native";

import { ConfirmationModal, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import {
  centerHV,
  fs16RegGray6,
  fs24BoldBlue1,
  fsAlignCenter,
  imageContain,
  px,
  py,
  sh16,
  sh24,
  sh240,
  sh56,
  sh8,
  sw218,
  sw24,
  sw320,
} from "../../../styles";

const { IDENTITY_CONFIRMATION } = Language.PAGE;

interface ImageReviewProps {
  handleReupload: () => void;
  handleProceed: () => void;
  image: FileBase64 | undefined;
  visible: boolean;
}

export const ImageReview: FunctionComponent<ImageReviewProps> = ({ handleReupload, handleProceed, image, visible }: ImageReviewProps) => {
  const imageStyle: ViewStyle = {
    ...centerHV,
    ...px(sw24),
    ...py(sh24),
  };

  return (
    <ConfirmationModal
      continueButtonStyle={{ width: sw218 }}
      handleCancel={handleReupload}
      handleContinue={handleProceed}
      labelCancel={IDENTITY_CONFIRMATION.BUTTON_REUPLOAD}
      labelContinue={IDENTITY_CONFIRMATION.BUTTON_PROCEED}
      spaceToButton={sh56}
      spaceToContent={sh56}
      visible={visible}>
      <Fragment>
        <View style={imageStyle}>
          <Image source={{ uri: image?.path }} style={{ ...imageContain, height: sh240, width: sw320 }} />
        </View>
        <TextSpaceArea spaceToTop={sh8} style={{ ...fs24BoldBlue1, ...fsAlignCenter }} text={IDENTITY_CONFIRMATION.LABEL_CHECK} />
        <TextSpaceArea style={{ ...fs16RegGray6, ...fsAlignCenter }} spaceToTop={sh16} text={IDENTITY_CONFIRMATION.LABEL_UNABLE} />
      </Fragment>
    </ConfirmationModal>
  );
};
