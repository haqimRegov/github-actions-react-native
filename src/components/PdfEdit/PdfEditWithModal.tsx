import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, ImageSourcePropType, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
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
  imageContain,
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
import { BYTE_TO_KILOBYTE, BYTE_TO_MEGABYTE, PdfEditCard } from "./PdfEditCard";

interface PdfEditWithModalProps extends PdfEditCardProps {
  resourceType?: "url" | "file" | "base64";
}

export const PdfEditWithModal: FunctionComponent<PdfEditWithModalProps> = ({
  onPress,
  resourceType,
  value,
  ...uploadProps
}: PdfEditWithModalProps) => {
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

  const valueSize = value !== undefined && value.size !== undefined ? value.size : -1;
  const fileSizeUnit = valueSize >= 100000 ? "MB" : "KB";
  const fileSize = valueSize >= 100000 ? valueSize / BYTE_TO_MEGABYTE : valueSize / BYTE_TO_KILOBYTE;
  const fileSizeLabel = valueSize !== -1 ? `${fileSize.toFixed(2)}${fileSizeUnit}` : "";
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
  const imageStyle: ImageStyle = { ...imageContain, height: sh500, width: sw750 };

  const modalAnimationInTiming = value !== undefined && value.type === "application/pdf" ? 0 : 450;

  let pdfValue = "";
  let isFileValid = false;
  let imageValue: ImageSourcePropType = [];

  if (resourceType === "base64" && value !== undefined && value.base64 !== undefined) {
    pdfValue = value.base64;
    isFileValid = true;
    const base64String = `data:${value.type};base64,${value.base64}`;
    imageValue = { uri: base64String };
  }

  if (resourceType === undefined && value !== undefined && value.url !== undefined) {
    pdfValue = value.url;
    isFileValid = true;
    imageValue = { uri: value.url };
  }

  return (
    <Fragment>
      <PdfEditCard onPress={handleViewFile} value={value} {...uploadProps} />
      <BasicModal animationInTiming={modalAnimationInTiming} hasBackdrop={false} visible={viewFile}>
        <Fragment>
          {value !== undefined ? (
            <View style={{ ...fullHW, backgroundColor: colorTransparent }}>
              <View style={headerStyle}>
                <CustomSpacer space={sh40} />
                <View style={viewImageHeader}>
                  <LabeledTitle label={value.name} labelStyle={headerTextStyle} title={fileSizeLabel} titleStyle={headerTextStyle} />
                  <CustomFlexSpacer />
                  <IcoMoon color={headerTextColor} name="close" onPress={handleCloseFile} size={sh24} />
                </View>
                <CustomSpacer space={sh24} />
              </View>
              {isFileValid === false ? null : (
                <Fragment>
                  {value.type === "application/pdf" ? (
                    <View style={flexChild}>
                      <CustomSpacer space={sh96} />
                      <PDFView
                        fadeInDuration={350}
                        resource={pdfValue}
                        resourceType={resourceType || "base64"}
                        style={{ ...fullHW, ...flexChild }}
                      />
                    </View>
                  ) : (
                    <View style={{ ...centerHV, ...fullHW, backgroundColor: colorBlack._1_85 }}>
                      <Image source={imageValue} style={imageStyle} />
                    </View>
                  )}
                </Fragment>
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
