import React, { Fragment } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { LinkTextGroup, LinkTextProps } from "../../components/Touchables/LinkText";
import { CustomFlexSpacer, CustomSpacer } from "../../components/Views/Spacer";
import {
  centerHorizontal,
  centerVertical,
  colorYellow,
  flexRow,
  flexRowCC,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  fullWidth,
  px,
  sh120,
  sh8,
  sw1,
  sw16,
  sw200,
  sw24,
  sw8,
} from "../../styles";
import { RoundedButton } from "../Touchables/RoundedButton";

interface BottomFixedDetailsProps {
  amount: string;
  fundAmountText: string;
  fundSelectionText: string;
  cancelOnPress?: () => void;
  labelCancel?: string;
  numberOfFunds: number;
  submitOnPress: () => void;
  labelSubmit: string;
}

export const BottomFixedDetails = ({
  amount,
  fundAmountText,
  fundSelectionText,
  cancelOnPress,
  labelCancel,
  numberOfFunds,
  submitOnPress,
  labelSubmit,
}: BottomFixedDetailsProps) => {
  const bottomFixedTitle = `${numberOfFunds} ${fundSelectionText}`;
  const textStyle: TextStyle = { ...fs16RegBlack2, textTransform: "none" };
  const links: LinkTextProps[] = [
    {
      text: fundAmountText,
      style: textStyle,
    },
    {
      text: amount,
      style: fs16BoldBlack2,
    },
  ];
  const bottomContainer: ViewStyle = {
    ...flexRowCC,
    ...fullWidth,
    ...px(sw24),
    backgroundColor: colorYellow._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    bottom: 0,
    height: sh120,
    position: "absolute",
  };

  return (
    <View style={{ ...centerVertical, ...px(sw24) }}>
      <View style={bottomContainer}>
        <View style={centerHorizontal}>
          <Text style={fs24BoldBlack2}>{bottomFixedTitle}</Text>
          <CustomSpacer space={sh8} />
          <View style={flexRow}>
            <LinkTextGroup direction="row" links={links} spaceToDivider={sw1} />
          </View>
        </View>
        <CustomFlexSpacer />
        {labelCancel !== undefined && cancelOnPress !== undefined ? (
          <Fragment>
            <RoundedButton buttonStyle={{ width: sw200 }} onPress={cancelOnPress} radius={sw24} secondary={true} text={labelCancel} />
            <CustomSpacer isHorizontal={true} space={sw16} />
          </Fragment>
        ) : null}
        <RoundedButton buttonStyle={{ width: sw200 }} onPress={submitOnPress} radius={sw24} text={labelSubmit} />
      </View>
    </View>
  );
};
