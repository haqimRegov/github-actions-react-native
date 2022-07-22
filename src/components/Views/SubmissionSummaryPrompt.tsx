import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { Language } from "../../constants";
import {
  colorBlue,
  colorWhite,
  flexRowCC,
  fs16RegBlack2,
  fs18BoldBlue1,
  px,
  sh32,
  sh40,
  sh96,
  sw404,
  sw48,
  sw536,
  sw56,
  sw8,
} from "../../styles";
import { CheckBox, CheckBoxProps } from "../CheckBox";
import { NewActionButtons, NewActionButtonsProps } from "./NewActionButtons";
import { CustomSpacer } from "./Spacer";

const { SUBMISSION_SUMMARY } = Language.PAGE;

export interface SubmissionSummaryPromptProps extends NewActionButtonsProps {
  checkbox?: CheckBoxProps;
  children?: JSX.Element;
  contentStyle?: ViewStyle;
  spaceToButton?: number;
  spaceToCheckbox?: number;
  spaceToTop?: number;
  title?: string;
  titleStyle?: TextStyle;
}

export const SubmissionSummaryPrompt: FunctionComponent<SubmissionSummaryPromptProps> = ({
  checkbox,
  children,
  contentStyle,
  spaceToButton,
  spaceToCheckbox,
  spaceToTop,
  title,
  titleStyle,
  ...newActionButtonProps
}: SubmissionSummaryPromptProps) => {
  const { buttonContainerStyle, primary, secondary } = newActionButtonProps;

  const propsCache = {
    checkboxLabel: checkbox !== undefined && checkbox.label !== undefined ? checkbox.label : "",
    primaryButton: primary !== undefined && primary.text !== undefined ? primary.text : SUBMISSION_SUMMARY.BUTTON_CONFIRM,
    secondaryButton: secondary !== undefined && secondary.text !== undefined ? secondary.text : SUBMISSION_SUMMARY.BUTTON_CANCEL,
    title: title,
  };

  const modalContainer: ViewStyle = {
    backgroundColor: colorBlue._2,
    borderRadius: sw8,
    width: sw536,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw8,
    borderBottomRightRadius: sw8,
    height: sh96,
    ...buttonContainerStyle,
  };

  return (
    <View style={modalContainer}>
      <CustomSpacer space={spaceToTop || sh40} />
      <View style={{ ...px(sw48), ...contentStyle }}>
        {propsCache !== null && propsCache.title !== undefined ? (
          <Text style={{ ...fs18BoldBlue1, ...titleStyle }}>{propsCache.title}</Text>
        ) : null}
        {children}
        {checkbox !== undefined ? (
          <Fragment>
            <CustomSpacer space={spaceToCheckbox || sh32} />
            <CheckBox {...checkbox} labelStyle={{ ...fs16RegBlack2, width: sw404, ...checkbox.labelStyle }} />
          </Fragment>
        ) : null}
        <CustomSpacer space={spaceToButton || sh40} />
      </View>
      {primary !== undefined || secondary !== undefined ? (
        <NewActionButtons
          buttonContainerStyle={buttonContainer}
          primary={primary !== undefined && propsCache.primaryButton ? { ...primary, text: propsCache.primaryButton } : undefined}
          secondary={secondary !== undefined && propsCache.secondaryButton ? { ...secondary, text: propsCache.secondaryButton } : undefined}
        />
      ) : null}
    </View>
  );
};
