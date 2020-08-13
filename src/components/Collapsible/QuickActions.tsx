import React, { FunctionComponent } from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import {
  centerVertical,
  colorBlue,
  colorGray,
  colorTransparent,
  colorWhite,
  flexRow,
  fs12BoldBlue2,
  fs16BoldBlue2,
  px,
  sh24,
  sh40,
  sh48,
  shadowBlue5,
  sw1,
  sw16,
  sw168,
  sw24,
  sw48,
} from "../../styles";
import { IconText } from "../Touchables";
import { CustomSpacer } from "../Views";
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
    ...shadowBlue5,
  };

  return (
    <CollapsibleDropdown
      baseDropdownStyle={baseDropdownStyle}
      dummyBaseStyle={{ shadowColor: colorTransparent }}
      RenderBase={({ collapse, dummyBaseStyle }) => {
        const baseStyle: ViewStyle = {
          ...px(sw16),
          backgroundColor: collapse ? colorWhite._1 : colorGray._2,
          borderRadius: sw24,
          height: sh48,
          width: sw168,
        };

        const baseContainerStyle: ViewStyle = {
          borderWidth: sw1,
          borderColor: collapse ? colorTransparent : colorWhite._1,
          borderRadius: sw24,
          backgroundColor: colorWhite._1,
          ...shadowBlue5,
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
              const actionStyle: ViewStyle = { ...centerVertical, ...flexRow, height: sh40, ...action.style };

              const handlePress = () => {
                handleClose();
                setTimeout(() => {
                  if (action.onPress !== undefined) {
                    action.onPress();
                  }
                }, 300);
              };

              return (
                <TouchableWithoutFeedback key={index} onPress={handlePress}>
                  <View style={actionStyle}>
                    <CustomSpacer isHorizontal={true} space={sw48} />
                    <Text style={actionTextStyle}>{action.label}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        );
      }}
    />
  );
};
