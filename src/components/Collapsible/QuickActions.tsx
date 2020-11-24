import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  centerHV,
  colorBlack,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexRow,
  fs12BoldBlue2,
  fs16BoldBlue2,
  px,
  sh24,
  sh4,
  sh40,
  sh48,
  sh8,
  shadowBlack5,
  sw1,
  sw16,
  sw172,
  sw24,
} from "../../styles";
import { IconText } from "../Touchables";
import { CustomSpacer } from "../Views/Spacer";
import { CollapsibleDropdown } from "./BasicDropdown";

export interface IQuickAction {
  label: string;
  labelStyle?: TextStyle;
  onPress?: () => void;
  style?: ViewStyle;
}

interface QuickActionsProps {
  actions: IQuickAction[];
  label?: string;
  labelStyle?: TextStyle;
  style?: ViewStyle;
}

export const QuickActions: FunctionComponent<QuickActionsProps> = ({ actions }: QuickActionsProps) => {
  const baseDropdownStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    ...shadowBlack5,
  };

  return (
    <CollapsibleDropdown
      backDrop={true}
      backDropColor={colorBlack._1}
      backDropOpacity={0.3}
      baseDropdownStyle={baseDropdownStyle}
      dummyBaseStyle={{ shadowColor: colorTransparent }}
      RenderBase={({ collapse, dummyBaseStyle }) => {
        const baseStyle: ViewStyle = {
          ...px(sw16),
          backgroundColor: collapse ? colorWhite._1 : colorGray._2,
          borderRadius: sw24,
          height: sh48,
          width: sw172,
        };

        const baseContainerStyle: ViewStyle = {
          borderWidth: sw1,
          borderColor: collapse ? colorGray._4 : colorWhite._1,
          borderRadius: sw24,
          backgroundColor: colorWhite._1,
          ...shadowBlack5,
          ...dummyBaseStyle,
        };

        return (
          <View style={baseContainerStyle}>
            <IconText
              color={colorBlue._2}
              iconSize={sh24}
              name="quick-action"
              style={baseStyle}
              text="Quick Actions"
              textStyle={fs16BoldBlue2}
            />
          </View>
        );
      }}
      RenderDropdown={({ handleClose }) => {
        const dropdownStyle: ViewStyle = {
          backgroundColor: colorWhite._1,
          borderBottomLeftRadius: sw24,
          borderBottomRightRadius: sw24,
        };

        return (
          <View style={dropdownStyle}>
            {actions.map((action: IQuickAction, index: number) => {
              const actionTextStyle: TextStyle = { ...fs12BoldBlue2, letterSpacing: -0.44, ...action.labelStyle };
              const actionStyle: ViewStyle = { ...centerHV, ...flexRow, height: sh40, ...action.style };

              const handlePress = () => {
                handleClose();
                setTimeout(() => {
                  if (action.onPress !== undefined) {
                    action.onPress();
                  }
                }, 300);
              };

              return (
                <Fragment key={index}>
                  {index === 0 ? <CustomSpacer space={sh8} /> : null}
                  <TouchableWithoutFeedback onPress={handlePress}>
                    <View style={actionStyle}>
                      <Text style={actionTextStyle}>{action.label}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  {index === actions.length - 1 ? <CustomSpacer space={sh4} /> : null}
                </Fragment>
              );
            })}
          </View>
        );
      }}
    />
  );
};
