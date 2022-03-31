import React, { Fragment, FunctionComponent } from "react";
import { Image, ImageSourcePropType, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";

import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  colorBlack,
  colorGray,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldWhite1,
  fullHW,
  fullWidth,
  imageContain,
  px,
  sh24,
  sh32,
  sh40,
  sh500,
  sh96,
  shadow50Black115,
  sw40,
  sw750,
} from "../../styles";
import { BYTE_TO_MEGABYTE } from "../Upload/UploadDocument";
import { LabeledTitle } from "../Views/LabeledTitle";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";
import { BasicModal } from "./Basic";

interface FileViewerModalProps {
  handleClose: () => void;
  resourceType?: "url" | "base64" | "file";
  value: FileBase64;
  visible: boolean;
}

export const FileViewer: FunctionComponent<FileViewerModalProps> = ({
  handleClose,
  resourceType,
  value,
  visible,
}: FileViewerModalProps) => {
  const fileSize = value.size !== undefined ? `${(value.size / BYTE_TO_MEGABYTE).toFixed(2).toString()}MB` : "";

  const viewImageHeader: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    ...fullWidth,
    ...px(sw40),
    height: sh32,
  };

  const headerBGColor = value.type === "application/pdf" ? { backgroundColor: colorWhite._1 } : {};
  const headerTextColor = value.type === "application/pdf" ? colorGray._6 : colorWhite._1;
  const headerTextStyle: TextStyle = { ...fs12BoldWhite1, color: headerTextColor };
  const headerStyle: ViewStyle = { ...fullWidth, ...headerBGColor, position: "absolute", zIndex: 1, ...shadow50Black115 };
  const imageStyle: ImageStyle = { ...imageContain, height: sh500, width: sw750 };

  const modalAnimationInTiming = value.type === "application/pdf" ? 0 : 450;

  const checkBase64 = resourceType === "base64" ? { uri: `data:${value.type};base64,${value.base64}` } : { uri: "" };
  const imageLink: ImageSourcePropType = value.url !== undefined ? { uri: value.url } : checkBase64;
  const imagePath: ImageSourcePropType | undefined =
    resourceType !== undefined && resourceType === "file" && value.path !== undefined ? { uri: value.path } : undefined;

  let pdfSourceLink = value.url !== undefined ? value.url : "";

  if (resourceType !== undefined) {
    switch (resourceType) {
      case "url":
        pdfSourceLink = value.url !== undefined ? value.url : "";
        break;
      case "base64":
        pdfSourceLink = value.base64 !== undefined ? value.base64 : "";
        break;
      case "file":
        pdfSourceLink = value.path !== undefined ? value.path : "";
        break;
      default:
        pdfSourceLink = value.url !== undefined ? value.url : "";
        break;
    }
  }

  return (
    <BasicModal animationInTiming={modalAnimationInTiming} hasBackdrop={false} visible={visible}>
      <Fragment>
        {value !== undefined ? (
          <View style={{ ...fullHW, backgroundColor: colorTransparent }}>
            <View style={headerStyle}>
              <CustomSpacer space={sh40} />
              <View style={viewImageHeader}>
                <LabeledTitle label={value.name} labelStyle={headerTextStyle} title={fileSize} titleStyle={headerTextStyle} />
                <CustomFlexSpacer />
                <IcoMoon color={headerTextColor} name="close" onPress={handleClose} size={sh24} suppressHighlighting={true} />
              </View>
              <CustomSpacer space={sh24} />
            </View>
            {value.type === "application/pdf" ? (
              <View style={flexChild}>
                <CustomSpacer space={sh96} />
                <PDFView
                  fadeInDuration={350}
                  style={{ ...fullHW, ...flexChild }}
                  resource={pdfSourceLink}
                  resourceType={resourceType || "url"}
                />
              </View>
            ) : (
              <View style={{ ...centerHV, ...fullHW, backgroundColor: colorBlack._1_7 }}>
                <Image source={imagePath || imageLink} style={imageStyle} />
              </View>
            )}
          </View>
        ) : (
          <View />
        )}
      </Fragment>
    </BasicModal>
  );
};
