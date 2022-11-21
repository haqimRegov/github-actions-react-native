import React, { Fragment, FunctionComponent, useState } from "react";
import { Image, ImageSourcePropType, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  colorBlack,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  disabledOpacity6,
  flexChild,
  flexRow,
  fs12BoldWhite1,
  fullHW,
  fullWidth,
  imageContain,
  px,
  rowCenterVertical,
  sh24,
  sh30,
  sh32,
  sh40,
  sh500,
  sh96,
  shadow50Black115,
  sw16,
  sw18,
  sw24,
  sw40,
  sw750,
  sw96,
} from "../../styles";
import { StatusBadge } from "../Badge/Status";
import { BasicModal } from "../Modals";
import { CustomFlexSpacer, CustomSpacer, LabeledTitle } from "../Views";
import { UploadButton } from "./UploadButton";
import { BYTE_TO_KILOBYTE, BYTE_TO_MEGABYTE, UploadDocument } from "./UploadDocument";

interface SignatureUploadWithModalProps extends PdfEditCardProps {
  buttonContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  resourceType?: "url" | "file" | "base64";
}

export const SignatureUploadWithModal: FunctionComponent<SignatureUploadWithModalProps> = ({
  buttonContainerStyle,
  containerStyle,
  onPress,
  resourceType,
  value,
  ...uploadProps
}: SignatureUploadWithModalProps) => {
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
  const headerStyle: ViewStyle = { ...fullWidth, ...headerBGColor, position: "absolute", zIndex: 1, ...shadow50Black115 };
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

  const handleRemove = () => {
    if (uploadProps.onPressRemove) {
      uploadProps.onPressRemove();
    }
    uploadProps.setValue(undefined);
  };

  const handleEdit = () => {
    if (uploadProps.onPressEdit && uploadProps.disabled === false) {
      uploadProps.onPressEdit();
    }
  };

  const iconData = uploadProps.completed === true ? { icon: "trash", function: handleRemove } : { icon: "sign", function: handleEdit };
  const tooltipStyle: ImageStyle = { height: sh32, width: sw96, position: "absolute", zIndex: 1, bottom: sh30 };
  const container: ViewStyle = uploadProps.completed === true ? { ...disabledOpacity6 } : { paddingRight: sw18 };

  return (
    <Fragment>
      <UploadDocument
        badgeOffset={{ right: 0.5 }}
        containerStyle={{ ...container, ...containerStyle }}
        customFeature={
          <Fragment>
            {uploadProps.completed === true ? (
              <View style={{ ...rowCenterVertical, ...buttonContainerStyle }}>
                <StatusBadge color="complete" text={uploadProps.completedText!} />
                <CustomSpacer isHorizontal={true} space={sw16} />
                <UploadButton color={colorBlue._1} icon={iconData.icon} onPress={iconData.function} size={sw24} />
              </View>
            ) : (
              <View style={{ width: sw96, ...buttonContainerStyle }}>
                {uploadProps.tooltip === true ? <Image source={LocalAssets.tooltip.proceed} style={tooltipStyle} /> : null}
                <View style={centerVertical}>
                  <UploadButton color={colorBlue._1} icon={iconData.icon} onPress={iconData.function} size={sw24} />
                </View>
              </View>
            )}
          </Fragment>
        }
        features={["custom"]}
        icon={{ active: "order", inactive: "order" }}
        onPress={handleViewFile}
        value={value}
        {...uploadProps}
      />
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
                        resource={pdfValue}
                        resourceType={resourceType || "base64"}
                        style={{ ...fullHW, ...flexChild }}
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
};
