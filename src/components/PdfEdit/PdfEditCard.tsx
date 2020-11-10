import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  fs12RegBlue2,
  fs12RegBlue38,
  fs16SemiBoldBlue2,
  px,
  sh1,
  sh24,
  sh26,
  sh34,
  sh40,
  sh88,
  shadowBlue5,
  sw1,
  sw10,
  sw16,
  sw24,
  sw32,
  sw4,
  sw40,
  sw8,
  sw82,
  sw85,
} from "../../styles";
import { shortenString } from "../../utils";
import { Badge } from "../Badge";
import { IconButton } from "../Touchables";
import { CustomFlexSpacer, CustomSpacer, LabeledTitle, Status } from "../Views";

const { UPLOAD } = Language.PAGE;

export const BYTE_TO_MEGABYTE = 1048576;
export const BYTE_TO_KILOBYTE = 1024;

const UploadButton = ({ color, icon, onPress, size }) => {
  const iconButtonStyle: ViewStyle = circleBorder(sh40, sw1, colorGray._3, colorWhite._1);
  return (
    <Fragment>
      <IconButton color={color} name={icon} onPress={onPress} size={size} style={iconButtonStyle} />
      <CustomSpacer isHorizontal={true} space={sw16} />
    </Fragment>
  );
};

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
  tooltipLabel,
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
    opacity: completed === true || disabled === true ? opacity : 1,
  };
  const iconBadgeOffset = { bottom: 0.5 };
  const proceedToolTip: TextStyle = {
    ...centerVertical,
    top: -30,
    zIndex: 1,
    position: "absolute",
    borderRadius: sw8,
  };
  const toolTipLabelStyle: TextStyle = {
    ...centerHV,
    position: "absolute",
    top: sh1,
    left: sw1,
    right: sw1,
    backgroundColor: colorWhite._1,
    alignContent: "center",
    borderRadius: sw8,
    width: sw82,
    height: sh26,
  };
  const iconData = completed === true ? { icon: "trash", function: handleRemove } : { icon: "sign", function: handleEdit };
  const editPress = completed === true ? onPress : handleEdit;
  const cardPress = disabled === true ? undefined : editPress;

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
            <View>
              <View style={{ width: sw85 }}>
                <View style={proceedToolTip}>
                  <IcoMoon color={colorBlue._1} name="filter-tooltip" size={sh34} />
                  <View style={toolTipLabelStyle}>
                    <Text style={{ ...fs12RegBlue2 }}>{tooltipLabel}</Text>
                  </View>
                </View>
                <View style={centerVertical}>
                  <UploadButton color={colorBlue._2} icon={iconData.icon} onPress={iconData.function} size={sw24} />
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
};
