import moment from "moment";
import React, { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Platform, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { DocumentPickerResponse } from "react-native-document-picker";
import { Image } from "react-native-image-crop-picker";
import { Bar } from "react-native-progress";

import { CALENDAR_FORMAT, Language, TIME_SECONDS_FORMAT } from "../../constants";
import { IcoMoon } from "../../icons";
import { documentPicker, imageOpenCamera, imageOpenPicker, ReactFileSystem, updateStorageData } from "../../integrations";
import {
  centerHV,
  centerVertical,
  circle,
  colorBlack,
  colorBlue,
  colorGreen,
  colorRed,
  colorWhite,
  disabledOpacity4,
  flexRow,
  fs12RegBlack2,
  fs12RegGray4,
  fs12RegGray5,
  fs16BoldBlue1,
  px,
  py,
  sh16,
  sh32,
  sh40,
  sh72,
  sh8,
  shadow4Blue116,
  sw10,
  sw16,
  sw2,
  sw24,
  sw4,
  sw40,
  sw520,
} from "../../styles";
import { shortenString } from "../../utils";
import { Badge } from "../Badge";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";
import { UploadButton } from "./UploadButton";

const { UPLOAD } = Language.PAGE;

export const BYTE_TO_MEGABYTE = 1048576;
export const BYTE_TO_KILOBYTE = 1024;

const DEFAULT_MAX_SIZE_MB = BYTE_TO_MEGABYTE * 5;

export const UploadDocument = forwardRef<IUploadDocumentRef | undefined, UploadProps>((props, ref) => {
  const {
    badgeOffset,
    completed,
    containerStyle,
    customFeature,
    disabled,
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
    progress,
    setValue,
    title,
    titleStyle,
    useOriginalName,
    value,
    withCropping,
  } = props;
  const [error, setError] = useState<string>("");

  const MAX_SIZE_BYTE = maxFileSizeMB || DEFAULT_MAX_SIZE_MB;

  let uploadLabel = UPLOAD.LABEL_NO_FILE;
  const descriptionStyle: TextStyle = { ...fs12RegGray5 };

  let fileSizeLabel: string | undefined;

  if (value !== undefined) {
    const fileNameArray = value.name.split(".");
    const selectedName = fileNameArray.splice(fileNameArray.length - 2, 1).join("");
    const [selectedExtension] = fileNameArray.slice(-1);

    const shortFileName = shortenString(selectedName, 37, 40);
    const valueSize = value.size !== undefined ? value.size : -1;
    const fileSizeUnit = valueSize >= 100000 ? "MB" : "KB";
    const fileSize = valueSize >= 100000 ? valueSize / BYTE_TO_MEGABYTE : valueSize / BYTE_TO_KILOBYTE;
    fileSizeLabel = valueSize !== -1 ? `${fileSize.toFixed(2)}${fileSizeUnit}` : "";

    uploadLabel = `${shortFileName}.${selectedExtension} - `;
    descriptionStyle.color = colorBlack._2;
  }

  const defaultError = errorMessage !== undefined ? errorMessage : error;
  const defaultLabel = defaultError !== "" ? defaultError : uploadLabel;
  const defaultCropping = withCropping !== undefined ? withCropping : true;
  const disabledStyle = disabled === true ? { ...disabledOpacity4 } : {};

  const generateName = (mime: string, filename?: string) => {
    const moments = moment();
    const ext = mime.substring(mime.lastIndexOf("/") + 1);
    const type = mime === "application/pdf" ? "DOC" : "IMG";
    return useOriginalName === true && filename !== undefined && filename !== null
      ? filename
      : `KIB ${type} ${moments.format(CALENDAR_FORMAT)} at ${moments.format(TIME_SECONDS_FORMAT)}.${ext}`;
  };

  const handleDocumentResult = async (results: DocumentPickerResponse) => {
    await updateStorageData("thirdPartyModal", false);
    if (!Array.isArray(results)) {
      const { fileCopyUri, uri, name, size, type } = results;
      if (size === null || type === null) {
        return setError(UPLOAD.LABEL_ERROR);
      }

      const realURI = Platform.select({ android: uri, ios: decodeURI(uri) });
      const path = fileCopyUri ? decodeURI(fileCopyUri) : realURI;
      let base64 = "";
      let newName = "";
      if (realURI !== undefined) {
        base64 = await ReactFileSystem.readFile(realURI);
        newName = generateName(type, name);
      }

      const selectedFile: FileBase64 = { base64: base64 || "", name: newName, size, type, date: `${moment().valueOf()}`, path: path };
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

  const handleImageResult = async (results: Image | Image[]) => {
    await updateStorageData("thirdPartyModal", false);
    if (!Array.isArray(results)) {
      const { data, filename, size, mime, path } = results;

      const selectedImage: FileBase64 = {
        base64: data || "",
        name: generateName(mime, filename),
        size,
        type: mime,
        date: `${moment().valueOf()}`,
        path,
      };
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

  const handleOpenCamera = async () => {
    await updateStorageData("thirdPartyModal", true);
    if (onPressCamera) {
      onPressCamera();
    }
    imageOpenCamera(handleImageResult, { cropping: defaultCropping });
  };

  const handleOpenDocument = async () => {
    await updateStorageData("thirdPartyModal", true);
    if (onPressCamera) {
      onPressCamera();
    }
    documentPicker(handleDocumentResult);
  };

  const handleOpenPicker = async () => {
    await updateStorageData("thirdPartyModal", true);
    if (onPressPicker) {
      onPressPicker();
    }
    imageOpenPicker(handleImageResult, { cropping: defaultCropping });
  };

  useImperativeHandle(ref, () => ({ handleOpenCamera, handleOpenPicker, handleOpenDocument }));

  const container: ViewStyle = {
    ...flexRow,
    ...px(sw40),
    ...py(sh16),
    ...shadow4Blue116,
    backgroundColor: colorWhite._1,
    borderRadius: sw10,
    minHeight: sh72,
    ...containerStyle,
  };
  const errorStyle: TextStyle = defaultError !== "" ? { color: colorRed._2 } : {};
  const iconBadgeOffset =
    value === undefined || defaultError !== "" || (value !== undefined && progress !== undefined)
      ? {}
      : { bottom: 0.5, right: 2, ...badgeOffset };
  const iconContainer = { ...centerHV, height: sh40, width: sw40, ...iconBadgeOffset };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ ...container, ...disabledStyle }} pointerEvents={disabled === true ? "none" : "auto"}>
        {value === undefined ||
        defaultError !== "" ||
        (value !== undefined && progress !== undefined) ||
        (completed !== undefined && completed === false) ? (
          <View style={iconContainer}>
            <IcoMoon color={colorBlue._1} name={icon?.inactive || "file-upload"} size={sh32} />
          </View>
        ) : (
          <View style={iconContainer}>
            <Badge icon={{ name: "success", size: sh8 }} style={circle(sw16, colorGreen._1)}>
              <IcoMoon color={colorBlue._1} name={icon?.active || "file"} size={sh32} />
            </Badge>
          </View>
        )}
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View>
          <Text style={{ ...fs16BoldBlue1, ...labelStyle }}>{label || ""}</Text>
          <View style={{ ...centerVertical, ...flexRow }}>
            {defaultError ? (
              <Fragment>
                <View style={{ right: sw2 }}>
                  <IcoMoon color={colorRed._2} name="error-filled" size={sw16} />
                </View>
                <CustomSpacer isHorizontal={true} space={sw4} />
              </Fragment>
            ) : null}
            <View style={{ ...centerVertical, ...flexRow }}>
              <Text style={{ ...descriptionStyle, ...errorStyle, ...titleStyle }}>{title || defaultLabel}</Text>
              {value !== undefined && fileSizeLabel ? <Text style={fs12RegGray4}>{fileSizeLabel}</Text> : null}
            </View>
            {progress !== undefined ? (
              <Fragment>
                <CustomFlexSpacer />
                <Text style={fs12RegBlack2}>{`${Math.round((progress.loaded / progress.total) * 100)}%`}</Text>
              </Fragment>
            ) : null}
          </View>
          {progress !== undefined ? (
            <View>
              <CustomSpacer space={sh8} />
              <Bar
                borderWidth={0}
                color={colorGreen._1}
                height={sh8}
                progress={progress.loaded / progress.total}
                unfilledColor={colorBlue._2}
                width={sw520}
              />
            </View>
          ) : null}
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
