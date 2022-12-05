import React, { forwardRef, Fragment, useState } from "react";
import { Image, ImageSourcePropType, ImageStyle, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";

import { IcoMoon } from "../../icons";
import {
  border,
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
  py,
  sh16,
  sh236,
  sh24,
  sh32,
  sh40,
  sh500,
  sh96,
  shadow12Blue108,
  shadow4Blue116,
  sw1,
  sw10,
  sw40,
  sw750,
  sw8,
} from "../../styles";
import { BasicModal } from "../Modals";
import { CustomFlexSpacer, CustomSpacer, LabeledTitle } from "../Views";
import { BYTE_TO_KILOBYTE, BYTE_TO_MEGABYTE, UploadDocument } from "./UploadDocument";

type ResourceType = "url" | "file" | "base64";

interface UploadWithModalProps extends UploadProps {
  resourceType?: ResourceType;
  withPreview?: boolean;
}

export const UploadWithModal = forwardRef<IUploadDocumentRef | undefined, UploadWithModalProps>((props, ref) => {
  const { onPress, resourceType, value, withPreview, ...uploadProps }: UploadWithModalProps = props;
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
  const headerTextColor = value !== undefined && value.type === "application/pdf" ? colorGray._6 : colorWhite._1;
  const headerTextStyle: TextStyle = { ...fs12BoldWhite1, color: headerTextColor };
  const headerStyle: ViewStyle = { ...fullWidth, ...headerBGColor, position: "absolute", zIndex: 1, ...shadow12Blue108 };
  const imageStyle: ImageStyle = { ...imageContain, height: sh500, width: sw750 };

  const modalAnimationInTiming = value !== undefined && value.type === "application/pdf" ? 0 : 450;

  let pdfValue = "";
  let isFileValid = false;
  let imageValue: ImageSourcePropType = [];
  let pdfResourceType: ResourceType = "base64";

  if (resourceType === "file" && value !== undefined && value.path !== undefined) {
    pdfValue = value.path;
    isFileValid = true;
    imageValue = { uri: value.path };
    pdfResourceType = "file";
  }

  if (resourceType === "base64" && value !== undefined && value.base64 !== undefined) {
    pdfValue = value.base64;
    isFileValid = true;
    const base64String = `data:${value.type};base64,${value.base64}`;
    imageValue = { uri: base64String };
    pdfResourceType = "base64";
  }

  if (resourceType === undefined && value !== undefined && value.path !== undefined) {
    pdfValue = value.base64 !== undefined ? value.base64 : "";
    isFileValid = true;
    imageValue = { uri: value.path };
    pdfResourceType = "base64";
  }

  if (resourceType === undefined && value !== undefined && value.url !== undefined) {
    pdfValue = value.url;
    isFileValid = true;
    imageValue = { uri: value.url };
    pdfResourceType = "url";
  }
  const imageContainerStyle: ViewStyle = {
    ...flexChild,
    ...px(sw40),
    ...py(sh16),
  };

  return (
    <Fragment>
      {value !== undefined && value.type !== "application/pdf" && withPreview === true ? (
        <View style={{ backgroundColor: colorWhite._1, ...border(colorGray._2, sw1, sw8), ...shadow4Blue116 }}>
          <UploadDocument onPress={handleViewFile} ref={ref} value={value} {...uploadProps} />
          <View style={{ height: sh236 }}>
            {isFileValid === false ? null : (
              <TouchableWithoutFeedback onPress={handleViewFile}>
                <View style={imageContainerStyle}>
                  <View style={border(colorGray._2, sw1)}>
                    <Image source={imageValue} style={{ ...imageContain, ...fullHW }} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      ) : (
        <View style={{ backgroundColor: colorWhite._1, borderRadius: sw10 }}>
          <UploadDocument onPress={handleViewFile} ref={ref} value={value} {...uploadProps} />
        </View>
      )}
      <BasicModal animationInTiming={modalAnimationInTiming} hasBackdrop={false} visible={viewFile}>
        <Fragment>
          {value !== undefined ? (
            <View style={{ ...fullHW, backgroundColor: colorTransparent }}>
              <View style={headerStyle}>
                <CustomSpacer space={sh40} />
                <View style={viewImageHeader}>
                  <LabeledTitle label={value.name} labelStyle={headerTextStyle} title={fileSizeLabel} titleStyle={headerTextStyle} />
                  <CustomFlexSpacer />
                  <IcoMoon color={headerTextColor} name="close" onPress={handleCloseFile} size={sh24} suppressHighlighting={true} />
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
                        style={{ ...fullHW, ...flexChild }}
                        resource={pdfValue}
                        resourceType={pdfResourceType}
                      />
                    </View>
                  ) : (
                    <View style={{ ...centerHV, ...fullHW, backgroundColor: colorBlack._1_7 }}>
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
});
