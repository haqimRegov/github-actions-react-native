import React, { Fragment, FunctionComponent, useState } from "react";
import { Platform, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { DocumentPickerResponse } from "react-native-document-picker";
import { Image } from "react-native-image-crop-picker";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { documentPicker, imageOpenCamera, imageOpenPicker, ReactFileSystem } from "../../integrations";
import {
  centerVertical,
  circleBorder,
  colorBlack,
  colorGray,
  colorRed,
  colorWhite,
  flexRow,
  fs12BoldBlue38,
  fs16RegBlack1,
  px,
  sh24,
  sh48,
  sh88,
  shadowBlue5,
  sw1,
  sw10,
  sw16,
  sw24,
} from "../../styles";
import { shortenString } from "../../utils";
import { Badge } from "../Badge";
import { IconButton } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer, LabeledTitle } from "../Views";

const { UPLOAD } = Language.PAGE;

export const BYTE_TO_MEGABYTE = 1048576;
export const BYTE_TO_KILOBYTE = 1024;

const DEFAULT_MAX_SIZE_MB = BYTE_TO_MEGABYTE * 5;

const UploadButton = ({ icon, onPress }) => {
  const iconButtonStyle: ViewStyle = circleBorder(sh48, sw1, colorGray._3, colorWhite._1);
  return (
    <Fragment>
      <IconButton color={colorBlack._1} name={icon} onPress={onPress} style={iconButtonStyle} />
      <CustomSpacer isHorizontal={true} space={sw16} />
    </Fragment>
  );
};

export const UploadDocument: FunctionComponent<UploadProps> = ({
  features,
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
}: UploadProps) => {
  const [error, setError] = useState<string>("");

  const MAX_SIZE_BYTE = maxFileSizeMB || DEFAULT_MAX_SIZE_MB;

  let uploadLabel = UPLOAD.LABEL_NO_FILE;

  if (value !== undefined) {
    const fileNameArray = value.name.split(".");
    const selectedName = fileNameArray.splice(fileNameArray.length - 2, 1).join("");
    const [selectedExtension] = fileNameArray.slice(-1);

    const shortFileName = shortenString(selectedName, 20, 20);
    const fileSizeUnit = value.size >= 100000 ? "MB" : "KB";
    const fileSize = value.size >= 100000 ? value.size / BYTE_TO_MEGABYTE : value.size / BYTE_TO_KILOBYTE;

    uploadLabel = `${shortFileName}.${selectedExtension} - ${`${fileSize.toFixed(2)}${fileSizeUnit}`}`;
  }

  const defaultLabel = error || uploadLabel;

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

      const selectedFile: FileBase64 = { base64: base64 || "", name: newName, size, type, path: realURI };
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
      const { data, filename, size, mime, creationDate, path } = results;
      const newName = filename === null || filename === undefined ? path.substring(path.lastIndexOf("/") + 1) : filename;
      const selectedImage: FileBase64 = { base64: data || "", name: newName, size, type: mime, date: creationDate, path };
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
    imageOpenCamera(handleImageResult);
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
    imageOpenPicker(handleImageResult);
  };

  const container: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderRadius: sw10,
    height: sh88,
  };
  const errorStyle: TextStyle = error !== "" ? { color: colorRed._2 } : {};
  const uploadIcon = features.includes("file") ? "file" : "profile";
  const iconBadgeOffset = { bottom: 0.5 };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={container}>
        {value === undefined ? (
          <IcoMoon color={colorBlack._1} name={uploadIcon} size={sh24} />
        ) : (
          <View style={iconBadgeOffset}>
            <Badge>
              <IcoMoon color={colorBlack._1} name={uploadIcon} size={sh24} />
            </Badge>
          </View>
        )}
        <CustomSpacer isHorizontal={true} space={sw16} />
        <LabeledTitle
          label={label || ""}
          labelStyle={{ ...fs16RegBlack1, ...labelStyle }}
          title={title || defaultLabel}
          titleStyle={{ ...fs12BoldBlue38, ...errorStyle, ...titleStyle }}
        />
        <CustomFlexSpacer />
        {value !== undefined ? (
          <UploadButton icon="trash" onPress={handleRemove} />
        ) : (
          <Fragment>
            {features.includes("camera") ? <UploadButton icon="camera" onPress={handleOpenCamera} /> : null}
            {features.includes("gallery") ? <UploadButton icon="gallery" onPress={handleOpenPicker} /> : null}
            {features.includes("file") ? <UploadButton icon="upload" onPress={handleOpenDocument} /> : null}
          </Fragment>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
