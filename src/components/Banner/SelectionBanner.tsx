import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import {
  centerHorizontal,
  centerVertical,
  colorYellow,
  flexRowCC,
  fs24BoldBlue2,
  fullWidth,
  px,
  sh112,
  sw16,
  sw200,
  sw24,
  sw8,
} from "../../styles";
import { RoundedButton } from "../Touchables/RoundedButton";
import { CustomFlexSpacer, CustomSpacer } from "../Views/Spacer";

interface SelectionBannerProps {
  bottomContent?: ReactNode;
  cancelOnPress?: () => void;
  continueDebounce?: boolean;
  continueDisabled?: boolean;
  label: string;
  labelCancel?: string;
  labelStyle?: TextStyle;
  labelSubmit?: string;
  submitOnPress: () => void;
}

export const SelectionBanner: FunctionComponent<SelectionBannerProps> = ({
  bottomContent,
  cancelOnPress,
  continueDebounce,
  continueDisabled,
  label,
  labelCancel,
  labelStyle,
  labelSubmit,
  submitOnPress,
}: SelectionBannerProps) => {
  const bottomContainer: ViewStyle = {
    ...flexRowCC,
    ...fullWidth,
    ...px(sw24),
    backgroundColor: colorYellow._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    bottom: 0,
    height: sh112,
    position: "absolute",
  };

  const submitLabel = labelSubmit || "Done";
  const cancelLabel = labelCancel || "Cancel";

  return (
    <View style={{ ...centerVertical, ...px(sw24) }}>
      <View style={bottomContainer}>
        <View style={centerHorizontal}>
          <Text style={{ ...fs24BoldBlue2, ...labelStyle }}>{label}</Text>
          {bottomContent}
        </View>
        <CustomFlexSpacer />
        {labelCancel !== undefined && cancelOnPress !== undefined ? (
          <Fragment>
            <RoundedButton buttonStyle={{ width: sw200 }} onPress={cancelOnPress} radius={sw24} secondary={true} text={cancelLabel} />
            <CustomSpacer isHorizontal={true} space={sw16} />
          </Fragment>
        ) : null}
        <RoundedButton
          disabled={continueDisabled}
          buttonStyle={{ width: sw200 }}
          onPress={submitOnPress}
          radius={sw24}
          text={submitLabel}
          withDebounce={continueDebounce !== undefined ? continueDebounce : true}
        />
      </View>
    </View>
  );
};
