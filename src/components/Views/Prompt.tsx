import React, { Fragment, FunctionComponent } from "react";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  flexRowCC,
  fs16RegGray6,
  fs24BoldBlue1,
  fsAlignCenter,
  fsTransformNone,
  imageContain,
  px,
  sh16,
  sh20,
  sh24,
  sh28,
  sh48,
  sh56,
  sh8,
  sh96,
  sw10,
  sw136,
  sw234,
  sw28,
  sw5,
  sw56,
  sw565,
} from "../../styles";
import { ActionButtons, ActionButtonsProps } from "../Views/ActionButtons";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

export interface PromptProps extends ActionButtonsProps {
  children?: JSX.Element;
  closable?: boolean;
  contentStyle?: ViewStyle;
  handleClose?: () => void;
  illustration?: ImageSourcePropType;
  label?: string;
  labelStyle?: TextStyle;
  spaceToButton?: number;
  spaceToTitle?: number;
  spaceToTop?: number;
  title?: string;
  titleStyle?: TextStyle;
}

export const Prompt: FunctionComponent<PromptProps> = ({
  children,
  closable,
  contentStyle,
  handleClose,
  illustration,
  label,
  labelStyle,
  spaceToButton,
  spaceToTitle,
  spaceToTop,
  title,
  titleStyle,
  ...rest
}: PromptProps) => {
  const defaultSpaceToButton = spaceToButton === undefined ? sh56 : spaceToButton;

  const modalContainer: ViewStyle = {
    backgroundColor: colorBlue._2,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
  };
  const buttonStyle: ViewStyle = { width: sw234 };

  const actionButtonProps: ActionButtonsProps = {
    buttonContainerStyle: buttonContainer,
    cancelButtonStyle: buttonStyle,
    cancelTextStyle: fsTransformNone,
    continueTextStyle: fsTransformNone,
    continueButtonStyle: buttonStyle,
    ...rest,
  };

  const illustrationStyle: ImageStyle = { ...imageContain, height: sw136, width: sw136 };
  const topSpace = spaceToTop !== undefined ? spaceToTop : sh48;
  const defaultTopSpace = closable === true ? sh20 : topSpace;
  const defaultSpaceToTitle = spaceToTitle !== undefined ? spaceToTitle : sh16;

  return (
    <View style={modalContainer}>
      {closable === true ? (
        <Fragment>
          <CustomSpacer space={sh28} />
          <View style={flexRow}>
            <CustomFlexSpacer />
            <IcoMoon color={colorBlue._1} name="close" size={sh24} onPress={handleClose} />
            <CustomSpacer isHorizontal={true} space={sw28} />
          </View>
        </Fragment>
      ) : null}
      <View style={{ ...centerVertical, ...px(sw56), ...contentStyle }}>
        <CustomSpacer space={defaultTopSpace} />
        {illustration !== undefined ? (
          <Fragment>
            <Image source={illustration} style={illustrationStyle} />
            <CustomSpacer space={sh8} />
          </Fragment>
        ) : null}
        {label !== undefined ? (
          <Fragment>
            <Text style={{ ...fs24BoldBlue1, ...fsAlignCenter, ...labelStyle }}>{label}</Text>
            <CustomSpacer space={defaultSpaceToTitle} />
          </Fragment>
        ) : null}
        {title !== undefined ? <Text style={{ ...fs16RegGray6, ...fsAlignCenter, ...titleStyle }}>{title}</Text> : null}
        {children}
        <CustomSpacer space={defaultSpaceToButton} />
      </View>
      {rest.labelCancel === undefined &&
      rest.labelContinue === undefined &&
      rest.handleCancel === undefined &&
      rest.handleContinue === undefined ? null : (
        <ActionButtons {...actionButtonProps} />
      )}
    </View>
  );
};
