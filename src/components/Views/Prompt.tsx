import React, { Fragment, FunctionComponent } from "react";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  flexRowCC,
  fs16SemiBoldBlack2,
  fs24BoldBlue2,
  fsAlignCenter,
  fsTransformNone,
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
  sw176,
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
  handleClose: () => void;
  illustration?: ImageSourcePropType;
  spaceToButton?: number;
  spaceToTitle?: number;
  title?: string;
  titleStyle?: TextStyle;
  label?: string;
  labelStyle?: TextStyle;
}

export const Prompt: FunctionComponent<PromptProps> = ({
  children,
  closable,
  handleClose,
  illustration,
  spaceToButton,
  spaceToTitle,
  title,
  titleStyle,
  label,
  labelStyle,
  ...rest
}: PromptProps) => {
  const defaultSpaceToButton = spaceToButton === undefined ? sh56 : spaceToButton;

  const modalContainer: ViewStyle = {
    backgroundColor: colorWhite._4,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._2,
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

  const illustrationStyle: ImageStyle = { height: sw176, width: sw176 };
  const defaultTopSpace = closable === true ? sh20 : sh48;
  const defaultSpaceToTitle = spaceToTitle !== undefined ? spaceToTitle : sh16;

  return (
    <View style={modalContainer}>
      {closable === true ? (
        <Fragment>
          <CustomSpacer space={sh28} />
          <View style={flexRow}>
            <CustomFlexSpacer />
            <IcoMoon color={colorBlue._2} name="close" size={sh24} onPress={handleClose} />
            <CustomSpacer isHorizontal={true} space={sw28} />
          </View>
        </Fragment>
      ) : null}
      <View style={{ ...centerVertical, ...px(sw56) }}>
        <CustomSpacer space={defaultTopSpace} />
        {illustration !== undefined ? (
          <Fragment>
            <Image source={illustration} style={illustrationStyle} />
            <CustomSpacer space={sh8} />
          </Fragment>
        ) : null}
        {label !== undefined ? (
          <Fragment>
            <Text style={{ ...fs24BoldBlue2, ...fsAlignCenter, ...labelStyle }}>{label}</Text>
            <CustomSpacer space={defaultSpaceToTitle} />
          </Fragment>
        ) : null}
        {title !== undefined ? <Text style={{ ...fs16SemiBoldBlack2, ...fsAlignCenter, ...titleStyle }}>{title}</Text> : null}
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
