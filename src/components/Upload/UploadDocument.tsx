import moment from "moment";
import React, { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Platform, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { DocumentPickerResponse } from "react-native-document-picker";
import { Image } from "react-native-image-crop-picker";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { documentPicker, imageOpenCamera, imageOpenPicker, ReactFileSystem } from "../../integrations";
import {
  centerHV,
  centerVertical,
  circle,
  colorBlue,
  colorGreen,
  colorRed,
  colorWhite,
  flexRow,
  fs12RegGray8,
  fs16BoldBlue2,
  px,
  sh16,
  sh32,
  sh40,
  sh72,
  sh8,
  shadowBlue5,
  sw10,
  sw16,
  sw2,
  sw24,
  sw4,
  sw40,
} from "../../styles";
import { shortenString } from "../../utils";
import { Badge } from "../Badge";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";
import { UploadButton } from "./UploadButton";

const { UPLOAD } = Language.PAGE;

export const BYTE_TO_MEGABYTE = 1048576;
export const BYTE_TO_KILOBYTE = 1024;

const DEFAULT_MAX_SIZE_MB = BYTE_TO_MEGABYTE * 5;

export const UploadDocument = forwardRef<IUploadDocumentRef, UploadProps>((props, ref) => {
  const {
    badgeOffset,
    containerStyle,
    customFeature,
    errorMessage,
    features,
    icon,
    label,
    labelStyle,
    maxFileSizeMB,
    onError,
    onPress,
    onPressCamera,
    onPressRemove,
    onPressPicker,
    onSuccess,
    setValue,
    title,
    titleStyle,
    value,
    withCropping,
  } = props;
  const [error, setError] = useState<string>("");

  const MAX_SIZE_BYTE = maxFileSizeMB || DEFAULT_MAX_SIZE_MB;

  let uploadLabel = UPLOAD.LABEL_NO_FILE;

  if (value !== undefined) {
    const fileNameArray = value.name.split(".");
    const selectedName = fileNameArray.splice(fileNameArray.length - 2, 1).join("");
    const [selectedExtension] = fileNameArray.slice(-1);

    const shortFileName = shortenString(selectedName, 20, 20);
    const valueSize = value.size !== undefined ? value.size : -1;
    const fileSizeUnit = valueSize >= 100000 ? "MB" : "KB";
    const fileSize = valueSize >= 100000 ? valueSize / BYTE_TO_MEGABYTE : valueSize / BYTE_TO_KILOBYTE;
    const fileSizeLabel = valueSize !== -1 ? `- ${fileSize.toFixed(2)}${fileSizeUnit}` : "";

    uploadLabel = `${shortFileName}.${selectedExtension} ${fileSizeLabel}`;
  }

  const defaultError = errorMessage !== undefined ? errorMessage : error;
  const defaultLabel = defaultError !== "" ? defaultError : uploadLabel;

  const handleDocumentResult = async (results: DocumentPickerResponse) => {
    if (!Array.isArray(results)) {
      const { uri, name, size, type } = results;
      const realURI = Platform.select({
        android: uri,
        ios: decodeURI(uri),
      });
      let base64 = "";
      let newName = "";
      if (realURI !== undefined) {
        base64 = await ReactFileSystem.readFile(realURI);
        newName = name === null ? realURI.substring(realURI.lastIndexOf("/") + 1) : name;
      }

      const selectedFile: FileBase64 = { base64: base64 || "", name: newName, size, type, date: `${moment().valueOf()}`, path: realURI };
      if (size > MAX_SIZE_BYTE) {
        if (onError) {
          return onError(selectedFile);
        }
        return setError(UPLOAD.LABEL_FILE_SIZE_EXCEEDED);
      }
      setError("");
      return onSuccess(selectedFile);
    }
    return false;
  };

  const handleImageResult = (results: Image | Image[]) => {
    if (!Array.isArray(results)) {
      const { data, filename, size, mime, path } = results;
      const newName = filename === null || filename === undefined ? path.substring(path.lastIndexOf("/") + 1) : filename;
      const selectedImage: FileBase64 = { base64: data || "", name: newName, size, type: mime, date: `${moment().valueOf()}`, path };
      if (size > MAX_SIZE_BYTE) {
        if (onError) {
          return onError(selectedImage);
        }
        return setError(UPLOAD.LABEL_FILE_SIZE_EXCEEDED);
      }
      setError("");
      return onSuccess(selectedImage);
    }
    return false;
  };

  const handleRemove = () => {
    if (onPressRemove) {
      onPressRemove();
    }
    setValue(undefined);
  };

  const handleOpenCamera = () => {
    if (onPressCamera) {
      onPressCamera();
    }
    imageOpenCamera(handleImageResult, { cropping: withCropping === true });
  };

  const handleOpenDocument = () => {
    if (onPressCamera) {
      onPressCamera();
    }
    documentPicker(handleDocumentResult);
  };

  const handleOpenPicker = () => {
    if (onPressPicker) {
      onPressPicker();
    }
    imageOpenPicker(handleImageResult, { cropping: withCropping === true });
  };

  useImperativeHandle(ref, () => ({ handleOpenCamera, handleOpenPicker, handleOpenDocument }));

  const container: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw40),
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderRadius: sw10,
    height: sh72,
    ...containerStyle,
  };
  const errorStyle: TextStyle = defaultError !== "" ? { color: colorRed._2 } : {};
  const iconBadgeOffset = value === undefined || defaultError !== "" ? {} : { bottom: 0.5, right: 2, ...badgeOffset };
  const iconContainer = { ...centerHV, height: sh40, width: sw40, ...iconBadgeOffset };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={container}>
        {value === undefined || defaultError !== "" ? (
          <View style={iconContainer}>
            <IcoMoon color={colorBlue._2} name={icon?.inactive || "file-upload"} size={sh32} />
          </View>
        ) : (
          <View style={iconContainer}>
            <Badge icon={{ name: "success", size: sh8 }} style={circle(sw16, colorGreen._1)}>
              <IcoMoon color={colorBlue._2} name={icon?.active || "file"} size={sh32} />
            </Badge>
          </View>
        )}
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View>
          <Text style={{ ...fs16BoldBlue2, ...labelStyle }}>{label || ""}</Text>
          <View style={{ ...centerVertical, ...flexRow }}>
            {defaultError ? (
              <Fragment>
                <View style={{ right: sw2 }}>
                  <IcoMoon color={colorRed._2} name="error-filled" size={sw16} />
                </View>
                <CustomSpacer isHorizontal={true} space={sw4} />
              </Fragment>
            ) : null}
            <Text style={{ ...fs12RegGray8, lineHeight: sh16, ...errorStyle, ...titleStyle }}>{title || defaultLabel}</Text>
          </View>
        </View>
        <CustomFlexSpacer />
        {value !== undefined && customFeature === undefined ? (
          <UploadButton icon="trash" onPress={handleRemove} />
        ) : (
          <Fragment>
            {features.map((feature, index) => {
              const handlePress = () => {
                switch (feature) {
                  case "camera":
                    handleOpenCamera();
                    break;
                  case "file":
                    handleOpenDocument();
                    break;
                  case "gallery":
                    handleOpenPicker();
                    break;

                  default:
                    break;
                }
              };

              return (
                <Fragment key={index}>
                  {feature === "custom" ? (
                    customFeature
                  ) : (
                    <Fragment>
                      {index === 0 ? null : <CustomSpacer isHorizontal={true} space={sw24} />}
                      <UploadButton icon={feature === "file" ? "upload" : feature} onPress={handlePress} />
                    </Fragment>
                  )}
                </Fragment>
              );
            })}
          </Fragment>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});
