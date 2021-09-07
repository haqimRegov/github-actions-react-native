import React, { Fragment, FunctionComponent } from "react";
import { Image, ImageStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlack,
  colorBlue,
  colorWhite,
  flexRow,
  fs12RegBlue38,
  fs16SemiBoldBlue2,
  px,
  sh24,
  sh34,
  sh42,
  sh88,
  shadowBlue5,
  sw10,
  sw16,
  sw24,
  sw32,
  sw4,
  sw40,
  sw84,
} from "../../styles";
import { shortenString } from "../../utils";
import { Badge } from "../Badge";
import { UploadButton } from "../Upload/UploadButton";
import { CustomFlexSpacer, CustomSpacer, LabeledTitle, Status } from "../Views";

const { UPLOAD } = Language.PAGE;

export const BYTE_TO_MEGABYTE = 1048576;
export const BYTE_TO_KILOBYTE = 1024;

export const PdfEditCard: FunctionComponent<PdfEditCardProps> = ({
  active,
  completed,
  completedText,
  disabled,
  label,
  labelStyle,
  onPress,
  onPressEdit,
  onPressRemove,
  setValue,
  title,
  titleStyle,
  tooltip,
  value,
}: PdfEditCardProps) => {
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

  const handleRemove = () => {
    if (onPressRemove) {
      onPressRemove();
    }
    setValue(undefined);
  };

  const handleEdit = () => {
    if (onPressEdit && disabled === false) {
      onPressEdit();
    }
  };

  const opacity = disabled === true ? 0.3 : 0.6;
  const container: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw40),
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderRadius: sw10,
    height: sh88,
    opacity: completed === true || disabled === true || tooltip === false ? opacity : 1,
  };
  const iconBadgeOffset = { bottom: 0.5 };
  const iconData = completed === true ? { icon: "trash", function: handleRemove } : { icon: "sign", function: handleEdit };
  const editPress = completed === true ? onPress : handleEdit;
  const cardPress = disabled === true ? undefined : editPress;

  const tooltipStyle: ImageStyle = { height: sh34, width: sw84, position: "absolute", zIndex: 1, bottom: sh42 };

  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={cardPress}>
        <View style={container}>
          <CustomSpacer isHorizontal={true} space={sw4} />
          {completed === false ? (
            <IcoMoon color={colorBlack._1} name="order" size={sh24} />
          ) : (
            <View style={iconBadgeOffset}>
              <Badge>
                <IcoMoon color={colorBlack._1} name="order" size={sh24} />
              </Badge>
            </View>
          )}
          <CustomSpacer isHorizontal={true} space={sw16} />
          <LabeledTitle
            label={label || ""}
            labelStyle={{ ...fs16SemiBoldBlue2, ...labelStyle }}
            title={title || uploadLabel}
            titleStyle={{ ...fs12RegBlue38, ...titleStyle }}
          />
          <CustomFlexSpacer />
          {completed === true ? <Status text={completedText!} /> : null}
          <CustomSpacer isHorizontal={true} space={sw32} />
          {active === false || completed === true ? (
            <UploadButton color={colorBlue._2} icon={iconData.icon} onPress={iconData.function} size={sw24} />
          ) : (
            <View style={{ width: sw84 }}>
              {tooltip === true ? <Image source={LocalAssets.tooltip.proceed} style={tooltipStyle} /> : null}
              <View style={centerVertical}>
                <UploadButton color={colorBlue._2} icon={iconData.icon} onPress={iconData.function} size={sw24} />
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
};
