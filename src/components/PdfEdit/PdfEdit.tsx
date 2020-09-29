import React, { Fragment, FunctionComponent } from "react";
import { TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerVertical,
  circleBorder,
  colorBlack,
  colorGray,
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

const UploadButton = ({ icon, onPress }) => {
  const iconButtonStyle: ViewStyle = circleBorder(sh48, sw1, colorGray._3, colorWhite._1);
  return (
    <Fragment>
      <IconButton color={colorBlack._1} name={icon} onPress={onPress} style={iconButtonStyle} />
      <CustomSpacer isHorizontal={true} space={sw16} />
    </Fragment>
  );
};

export const PdfEdit: FunctionComponent<PdfEditProps> = ({
  completed,
  label,
  labelStyle,
  onPress,
  onPressEdit,
  onPressRemove,
  setValue,
  title,
  titleStyle,
  value,
}: PdfEditProps) => {
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
    if (onPressEdit) {
      onPressEdit();
    }
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
  const iconBadgeOffset = { bottom: 0.5 };

  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={container}>
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
            labelStyle={{ ...fs16RegBlack1, ...labelStyle }}
            title={title || uploadLabel}
            titleStyle={{ ...fs12BoldBlue38, ...titleStyle }}
          />
          <CustomFlexSpacer />
          {completed === true ? <UploadButton icon="trash" onPress={handleRemove} /> : <UploadButton icon="sign" onPress={handleEdit} />}
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
};
