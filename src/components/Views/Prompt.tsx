import React, { Fragment, FunctionComponent } from "react";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

import {
  centerHV,
  centerVertical,
  colorWhite,
  flexRowCC,
  fs16SemiBoldBlack2,
  fs24BoldBlue2,
  fsAlignCenter,
  fsTransformNone,
  fullHW,
  px,
  sh16,
  sh32,
  sh48,
  sh56,
  sh8,
  sh96,
  sw10,
  sw176,
  sw234,
  sw5,
  sw56,
  sw565,
} from "../../styles";
import { ActionButtons, ActionButtonsProps } from "../Views/ActionButtons";
import { CustomSpacer } from "../Views/Spacer";

export interface PromptProps extends ActionButtonsProps {
  children?: JSX.Element;
  illustration?: ImageSourcePropType;
  spaceToButton?: number;
  spaceToContent?: number;
  title?: string;
  titleStyle?: TextStyle;
  label?: string;
  labelStyle?: TextStyle;
}

export const Prompt: FunctionComponent<PromptProps> = ({
  children,
  illustration,
  spaceToButton,
  spaceToContent,
  title,
  titleStyle,
  label,
  labelStyle,
  ...rest
}: PromptProps) => {
  const defaultSpaceToContent = spaceToContent === undefined ? sh32 : spaceToContent;
  const defaultSpaceToButton = spaceToButton === undefined ? sh56 : spaceToButton;

  const modalContainer: ViewStyle = {
    backgroundColor: colorWhite._4,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._3,
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

  return (
    <View style={{ ...centerHV, ...fullHW }}>
      <View style={modalContainer}>
        <View style={{ ...centerVertical, ...px(sw56) }}>
          <CustomSpacer space={sh48} />
          {illustration !== undefined ? (
            <Fragment>
              <Image source={illustration} style={illustrationStyle} />
              <CustomSpacer space={sh8} />
            </Fragment>
          ) : null}
          {label !== undefined ? (
            <Fragment>
              <Text style={{ ...fs24BoldBlue2, ...fsAlignCenter, ...labelStyle }}>{label}</Text>
              <CustomSpacer space={sh16} />
            </Fragment>
          ) : null}
          {title !== undefined ? <Text style={{ ...fs16SemiBoldBlack2, ...fsAlignCenter, ...titleStyle }}>{title}</Text> : null}
          <CustomSpacer space={defaultSpaceToContent} />
          {children}
          <CustomSpacer space={defaultSpaceToButton} />
        </View>
        <ActionButtons {...actionButtonProps} />
      </View>
    </View>
  );
};
