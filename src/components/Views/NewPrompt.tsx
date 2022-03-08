import React, { Fragment, FunctionComponent, useRef } from "react";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

import { IcoMoon } from "../../icons";
import {
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  flexRowCC,
  fs12RegBlue5,
  fs24BoldBlue1,
  fsAlignCenter,
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
  sw28,
  sw48,
  sw56,
} from "../../styles";
import { NewActionButtons, NewActionButtonsProps } from "./NewActionButtons";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface NewPromptProps extends NewActionButtonsProps {
  children?: JSX.Element;
  closable?: boolean;
  contentStyle?: ViewStyle;
  handleClose?: () => void;
  illustration?: ImageSourcePropType;
  illustrationStyle?: ImageStyle;
  label?: string;
  labelStyle?: TextStyle;
  spaceToButton?: number;
  spaceToTitle?: number;
  spaceToTop?: number;
  title?: string;
  titleStyle?: TextStyle;
}

interface IPropsCache {
  label?: string;
  title?: string;
  illustration?: ImageSourcePropType;
  primaryButton?: string;
  secondaryButton?: string;
}

export const NewPrompt: FunctionComponent<NewPromptProps> = ({
  children,
  closable,
  contentStyle,
  handleClose,
  illustration,
  illustrationStyle,
  label,
  labelStyle,
  spaceToButton,
  spaceToTitle,
  spaceToTop,
  title,
  titleStyle,

  ...actionButtonProps
}: NewPromptProps) => {
  const { buttonContainerStyle, primary, secondary } = actionButtonProps;

  const propsCache = useRef<IPropsCache>({
    label: label,
    title: title,
    illustration: illustration,
    primaryButton: primary !== undefined ? primary.text : "",
    secondaryButton: secondary !== undefined ? secondary.text : "",
  });

  const modalContainer: ViewStyle = {
    backgroundColor: colorBlue._2,
    borderRadius: sh8,
    width: 536,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
    ...buttonContainerStyle,
  };

  const defaultIllustrationStyle: ImageStyle = { ...imageContain, height: sw136, width: sw136, ...illustrationStyle };

  const topSpace = spaceToTop !== undefined ? spaceToTop : sh48;
  const defaultTopSpace = closable === true ? sh20 : topSpace;
  const defaultSpaceToTitle = spaceToTitle !== undefined ? spaceToTitle : sh16;
  const defaultSpaceToButton = spaceToButton === undefined ? sh56 : spaceToButton;

  return (
    <View style={modalContainer}>
      {closable === true ? (
        <Fragment>
          <CustomSpacer space={sh28} />
          <View style={flexRow}>
            <CustomFlexSpacer />
            <IcoMoon color={colorBlue._1} name="close" onPress={handleClose} size={sh24} suppressHighlighting={true} />
            <CustomSpacer isHorizontal={true} space={sw28} />
          </View>
        </Fragment>
      ) : null}
      <View>
        <CustomSpacer space={defaultTopSpace} />
        {illustration !== undefined && propsCache.current !== null && propsCache.current.illustration !== undefined ? (
          <Fragment>
            <Image source={propsCache.current.illustration} style={defaultIllustrationStyle} />
            <CustomSpacer space={sh24} />
          </Fragment>
        ) : null}
      </View>
      <View style={{ ...centerVertical, ...px(sw48), ...contentStyle }}>
        {propsCache.current !== null && propsCache.current.label !== undefined ? (
          <Fragment>
            <Text style={{ ...fs12RegBlue5, ...fsAlignCenter, ...labelStyle }}>{propsCache.current.label}</Text>
            <CustomSpacer space={defaultSpaceToTitle} />
          </Fragment>
        ) : null}
        {propsCache.current !== null && propsCache.current.title !== undefined ? (
          <Text style={{ ...fs24BoldBlue1, ...fsAlignCenter, ...titleStyle }}>{propsCache.current.title}</Text>
        ) : null}
        {children}
        <CustomSpacer space={defaultSpaceToButton} />
      </View>
      {primary !== undefined || secondary !== undefined ? (
        <NewActionButtons
          buttonContainerStyle={buttonContainer}
          primary={
            primary !== undefined && propsCache.current.primaryButton ? { ...primary, text: propsCache.current.primaryButton } : undefined
          }
          secondary={
            secondary !== undefined && propsCache.current.secondaryButton
              ? { ...secondary, text: propsCache.current.secondaryButton }
              : undefined
          }
        />
      ) : null}
    </View>
  );
};
