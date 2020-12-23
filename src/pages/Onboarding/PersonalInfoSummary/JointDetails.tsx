import React, { FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { CardWrap, CustomFlexSpacer, CustomSpacer, LabeledTitleProps } from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import {
  borderBottomRed4,
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  fs12RegBlack2,
  fs16BoldBlack2,
  fs24BoldBlack2,
  fsTransformNone,
  px,
  py,
  sh16,
  sh24,
  sh64,
  shadowBlack116,
  shadowBlue204,
  sw16,
  sw24,
  sw8,
} from "../../../styles";

const { SUMMARY } = Language.PAGE;

interface SummaryJointDetailsProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
  principalName: string;
  jointName: string;
  jointDetails: LabeledTitleProps[];
}

interface TitleIconProps {
  title: string;
  titleStyle?: TextStyle;
  onPress?: () => void;
}

const TitleIcon = ({ onPress, title, titleStyle }: TitleIconProps) => {
  return (
    <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh16) }}>
      <Text style={{ ...fs16BoldBlack2, ...titleStyle }}>{title}</Text>
      <CustomSpacer isHorizontal={true} space={sw16} />
      <IcoMoon color={colorBlue._1} name="edit" onPress={onPress} size={sh24} />
    </View>
  );
};

export const SummaryJointDetails: FunctionComponent<SummaryJointDetailsProps> = ({
  handleNextStep,
  principalName,
  jointName,
  jointDetails,
}: SummaryJointDetailsProps) => {
  const headerStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...borderBottomRed4,
    ...shadowBlue204,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh64,
    position: "relative",
    zIndex: 1,
  };

  const handleEditOtherDetails = () => {
    handleNextStep("PersonalDetails");
  };

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...shadowBlack116 }}>
        <View style={headerStyle}>
          <Text style={fs24BoldBlack2}>{`${principalName} & ${jointName}`}</Text>
          <CustomFlexSpacer />
          <Text style={fs12RegBlack2}>{SUMMARY.TITLE_JOINT_ACCOUNT}</Text>
        </View>
        <View>
          <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_ADDITIONAL} />
          <CardWrap data={jointDetails} titleStyle={fsTransformNone} />
        </View>
      </View>
    </View>
  );
};
