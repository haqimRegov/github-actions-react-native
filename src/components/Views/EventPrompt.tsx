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
  fs16RegBlack2,
  fs16RegGray6,
  fs24BoldBlue1,
  fsAlignCenter,
  fullWidth,
  px,
  sh24,
  sh28,
  sh280,
  sh4,
  sh40,
  sh8,
  sh96,
  sw10,
  sw28,
  sw48,
  sw56,
} from "../../styles";
import { CheckBox } from "../CheckBox";
import { NewActionButtons, NewActionButtonsProps } from "./NewActionButtons";
import { CustomFlexSpacer, CustomSpacer } from "./Spacer";

export interface EventPromptProps extends NewActionButtonsProps {
  checkboxLabel?: string;
  checkboxToggled?: boolean;
  children?: JSX.Element;
  closable?: boolean;
  contentStyle?: ViewStyle;
  description?: string;
  descriptionStyle?: TextStyle;
  handleCheckbox?: () => void;
  handleClose?: () => void;
  header?: string;
  headerDescription?: string;
  headerDescriptionStyle?: TextStyle;
  headerStyle?: TextStyle;
  illustration?: ImageSourcePropType;
  illustrationStyle?: ImageStyle;
  spaceToButton?: number;
  spaceToCheckbox?: number;
  spaceToDescription?: number;
  spaceToHeader?: number;
}

interface IPropsCache {
  checkboxLabel?: string;
  description?: string;
  header?: string;
  headerDescription?: string;
  illustration?: ImageSourcePropType;
  primaryButton?: string;
  secondaryButton?: string;
}

export const EventPrompt: FunctionComponent<EventPromptProps> = ({
  checkboxLabel,
  checkboxToggled,
  children,
  closable,
  contentStyle,
  handleCheckbox,
  handleClose,
  illustration,
  illustrationStyle,
  description,
  descriptionStyle,
  header,
  headerStyle,
  headerDescription,
  headerDescriptionStyle,
  spaceToButton,
  spaceToCheckbox,
  spaceToDescription,
  spaceToHeader,
  ...actionButtonProps
}: EventPromptProps) => {
  const { buttonContainerStyle, primary, secondary } = actionButtonProps;

  const propsCache = useRef<IPropsCache>({
    checkboxLabel: checkboxLabel,
    description: description,
    header: header,
    headerDescription: headerDescription,
    illustration: illustration,
    primaryButton: primary !== undefined ? primary.text : "",
    secondaryButton: secondary !== undefined ? secondary.text : "",
  });

  const defaultSpaceToButton = spaceToButton === undefined ? sh40 : spaceToButton;

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

  const defaultIllustrationStyle: ImageStyle = {
    ...fullWidth,
    borderTopLeftRadius: sh8,
    borderTopRightRadius: sh8,
    height: sh280,
    ...illustrationStyle,
  };

  const defaultSpaceToHeader = spaceToHeader !== undefined ? spaceToHeader : sh4;
  const defaultSpaceToDescription = spaceToDescription !== undefined ? spaceToDescription : sh4;
  const defaultSpaceToCheckbox = spaceToCheckbox !== undefined ? spaceToCheckbox : sh24;

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
        {illustration !== undefined && propsCache.current !== null && propsCache.current.illustration !== undefined ? (
          <Fragment>
            <Image source={propsCache.current.illustration} style={defaultIllustrationStyle} />
            <CustomSpacer space={sh24} />
          </Fragment>
        ) : null}
      </View>
      <View style={{ ...centerVertical, ...px(sw48), ...contentStyle }}>
        {propsCache.current !== null && propsCache.current.headerDescription !== undefined ? (
          <Fragment>
            <Text style={{ ...fs12RegBlue5, ...fsAlignCenter, ...headerDescriptionStyle }}>{propsCache.current.headerDescription}</Text>
            <CustomSpacer space={defaultSpaceToHeader} />
          </Fragment>
        ) : null}
        {propsCache.current !== null && propsCache.current.header !== undefined ? (
          <Fragment>
            <Text style={{ ...fs24BoldBlue1, ...fsAlignCenter, ...headerStyle }}>{propsCache.current.header}</Text>
            <CustomSpacer space={defaultSpaceToDescription} />
          </Fragment>
        ) : null}
        {propsCache.current !== null && propsCache.current.description !== undefined ? (
          <Text style={{ ...fs16RegGray6, ...fsAlignCenter, ...descriptionStyle }}>{propsCache.current.description}</Text>
        ) : null}
        {propsCache.current !== null && checkboxLabel !== undefined && handleCheckbox !== undefined && checkboxToggled !== undefined ? (
          <Fragment>
            <CustomSpacer space={defaultSpaceToCheckbox} />
            <CheckBox
              label={propsCache.current.checkboxLabel}
              onPress={handleCheckbox}
              toggle={checkboxToggled}
              labelStyle={fs16RegBlack2}
            />
          </Fragment>
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
