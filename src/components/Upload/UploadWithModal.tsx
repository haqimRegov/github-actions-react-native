import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";

import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  colorBlack,
  colorTransparent,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldWhite1,
  fullHW,
  fullWidth,
  px,
  sh24,
  sh32,
  sh40,
  sh500,
  sh96,
  shadow5,
  sw40,
  sw750,
} from "../../styles";
import { BasicModal } from "../Modals";
import { CustomFlexSpacer, CustomSpacer, LabeledTitle } from "../Views";
import { BYTE_TO_MEGABYTE, UploadDocument } from "./Upload";

interface UploadWithModalProps extends UploadProps {}

export const UploadWithModal: FunctionComponent<UploadWithModalProps> = ({ onPress, value, ...uploadProps }: UploadWithModalProps) => {
  const [viewFile, setViewFile] = useState<boolean>(false);

  const handleViewFile = () => {
    if (onPress) {
      onPress();
    }
    if (value !== undefined) {
      setViewFile(true);
    }
  };

  const handleCloseFile = () => {
    setViewFile(false);
  };

  const fileSize = value !== undefined ? `${(value.size / BYTE_TO_MEGABYTE).toFixed(2).toString()}MB` : "";

  const viewImageHeader: ViewStyle = {
    ...flexRow,
    ...centerVertical,
    ...fullWidth,
    ...px(sw40),
    height: sh32,
  };

  const headerBGColor = value !== undefined && value.type === "application/pdf" ? { backgroundColor: colorWhite._1 } : {};
  const headerTextColor = value !== undefined && value.type === "application/pdf" ? colorBlack._2 : colorWhite._1;
  const headerTextStyle: TextStyle = { ...fs12BoldWhite1, color: headerTextColor };
  const headerStyle: ViewStyle = { ...fullWidth, ...headerBGColor, position: "absolute", zIndex: 1, ...shadow5 };
  const imageStyle: ImageStyle = { height: sh500, resizeMode: "contain", width: sw750 };

  const modalAnimationInTiming = value !== undefined && value.type === "application/pdf" ? 0 : 450;

  return (
    <Fragment>
      <UploadDocument onPress={handleViewFile} value={value} {...uploadProps} />
      <BasicModal animationInTiming={modalAnimationInTiming} hasBackdrop={false} visible={viewFile}>
        <Fragment>
          {value !== undefined ? (
            <View style={{ ...fullHW, backgroundColor: colorTransparent }}>
              <View style={headerStyle}>
                <CustomSpacer space={sh40} />
                <View style={viewImageHeader}>
                  <LabeledTitle label={value.name} labelStyle={headerTextStyle} title={fileSize} titleStyle={headerTextStyle} />
                  <CustomFlexSpacer />
                  <IcoMoon color={headerTextColor} name="close" onPress={handleCloseFile} size={sh24} />
                </View>
                <CustomSpacer space={sh24} />
              </View>
              {value.type === "application/pdf" ? (
                <View style={flexChild}>
                  <CustomSpacer space={sh96} />
                  <PDFView fadeInDuration={350} style={{ ...fullHW, ...flexChild }} resource={value.base64} resourceType="base64" />
                </View>
              ) : (
                <View style={{ ...centerHV, ...fullHW, backgroundColor: colorBlack._1_85 }}>
                  <Image source={{ uri: value.path }} style={imageStyle} />
                </View>
              )}
            </View>
          ) : (
            <View />
          )}
        </Fragment>
      </BasicModal>
    </Fragment>
  );
};
