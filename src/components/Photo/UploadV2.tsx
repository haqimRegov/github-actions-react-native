import React, { Fragment, useState } from "react";
import { TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Image } from "react-native-image-crop-picker";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import { imageOpenCamera, imageOpenPicker } from "../../integrations/react-native-image-crop-picker";
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
  shadow,
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

interface IUploadProps {
  label?: string;
  labelStyle?: TextStyle;
  maxFileSizeMB?: number;
  onPress?: () => void;
  onPressCamera?: () => void;
  onPressRemove?: () => void;
  onPressPicker?: () => void;
  onSuccess: (data: FileBase64) => void;
  onError?: (data: FileBase64) => void;
  setValue: (value?: FileBase64) => void;
  title?: string;
  titleStyle?: TextStyle;
  value?: FileBase64;
}

const BYTE_TO_MEGABYTE = 1048576;

export const UploadV2 = ({
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
}: IUploadProps) => {
  const [error, setError] = useState<string>("");

  const errorStyle: TextStyle = error !== "" ? { color: colorRed._2 } : {};

  const DEFAULT_MAX_SIZE_MB = maxFileSizeMB || BYTE_TO_MEGABYTE * 5;

  let selectedName = "";
  let selectedExtension = "";
  let selectedFileSizeMB = -1;

  if (value !== undefined) {
    const fileNameArray = value.name.split(".");
    selectedName = fileNameArray.splice(fileNameArray.length - 2, 1).join("");
    [selectedExtension] = fileNameArray.slice(-1);
    selectedFileSizeMB = value.size / BYTE_TO_MEGABYTE;
  }

  const shortFileName = shortenString(selectedName, 20, 20);

  const uploadedTitle =
    value !== undefined ? `${shortFileName}.${selectedExtension} - ${selectedFileSizeMB.toFixed(2)}MB` : UPLOAD.LABEL_NO_FILE;
  const defaultTitle = error || uploadedTitle;

  const handleResult = (results: Image | Image[]) => {
    if (!Array.isArray(results)) {
      const { data, filename, size, mime, creationDate, path } = results;
      const newName = filename === null ? path.substring(path.lastIndexOf("/") + 1) : filename;
      const selectedImage: FileBase64 = { base64: data || "", name: newName, size, type: mime, date: creationDate, path };
      if (size > DEFAULT_MAX_SIZE_MB) {
        if (onError) {
          onError(selectedImage);
        }
        setError(UPLOAD.LABEL_FILE_SIZE_EXCEEDED);
      }
      setError("");
      onSuccess(selectedImage);
    }
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
    imageOpenCamera(handleResult);
  };

  const handleOpenPicker = () => {
    if (onPressPicker) {
      onPressPicker();
    }
    imageOpenPicker(handleResult);
  };

  const container: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...shadow,
    backgroundColor: colorWhite._1,
    borderRadius: sw10,
    height: sh88,
  };
  const iconButtonStyle: ViewStyle = circleBorder(sh48, sw1, colorGray._3, colorWhite._1);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={container}>
        {value === undefined ? (
          <IcoMoon color={colorBlack._1} name="profile" size={sh24} />
        ) : (
          <Badge>
            <IcoMoon color={colorBlack._1} name="profile" size={sh24} />
          </Badge>
        )}
        <CustomSpacer isHorizontal={true} space={sw16} />
        <LabeledTitle
          label={label || ""}
          labelStyle={{ ...fs16RegBlack1, ...labelStyle }}
          title={title || defaultTitle}
          titleStyle={{ ...fs12BoldBlue38, ...errorStyle, ...titleStyle }}
        />
        <CustomFlexSpacer />
        {value !== undefined ? (
          <IconButton color={colorBlack._1} name="trash" onPress={handleRemove} style={iconButtonStyle} />
        ) : (
          <Fragment>
            <IconButton color={colorBlack._1} name="camera" onPress={handleOpenCamera} style={iconButtonStyle} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <IconButton color={colorBlack._1} name="gallery" onPress={handleOpenPicker} style={iconButtonStyle} />
          </Fragment>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
