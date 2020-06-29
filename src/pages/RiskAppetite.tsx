import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useState } from "react";
import { Text, View } from "react-native";

import { CheckBox, CheckBoxProps, CustomFlexSpacer, CustomSpacer, RoundedButton, SafeAreaPage, SideMenu } from "../components";
import { Language } from "../constants";
import {
  centerVertical,
  colorGray,
  flexChild,
  flexRow,
  fs12BoldBlack4,
  fs16RegBlack2,
  fs16RegBlack4,
  fs24RegBlack2,
  fs32SemiBoldBlack4,
  fs36SemiBoldBlack2,
  fullHeight,
  px,
  sh16,
  sh168,
  sh24,
  sh28,
  sh40,
  sh8,
  sw16,
  sw24,
  sw96,
} from "../styles";
import { ONBOARDING_DATA } from "./Onboarding";

const { ONBOARDING, RISK_APPETITE } = Language.PAGE;
const USER_NAME: string = "Edgar";
const GREETINGS: string = `${RISK_APPETITE.HEADING} ${USER_NAME}.`;

interface RiskAppetitePageProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const RiskAppetitePage = ({ navigation }: RiskAppetitePageProps) => {
  const [assessment1, setAssessment1] = useState<boolean>(false);
  const [assessment2, setAssessment2] = useState<boolean>(false);
  const [assessment3, setAssessment3] = useState<boolean>(false);

  const handlePress = () => {
    navigation.navigate("Onboarding");
  };

  const handleAssessment1 = () => {
    setAssessment1(!assessment1);
  };

  const handleAssessment2 = () => {
    setAssessment2(!assessment2);
  };

  const handleAssessment3 = () => {
    setAssessment3(!assessment3);
  };

  const options: CheckBoxProps[] = [
    { label: RISK_APPETITE.OPTION_1, onPress: handleAssessment1, toggle: assessment1 },
    { label: RISK_APPETITE.OPTION_2, onPress: handleAssessment2, toggle: assessment2 },
    { label: RISK_APPETITE.OPTION_3, onPress: handleAssessment3, toggle: assessment3 },
  ];

  return (
    <View style={{ ...flexRow, ...fullHeight }}>
      <SideMenu>
        <Text style={fs32SemiBoldBlack4}>{ONBOARDING.HEADING}</Text>
        <CustomSpacer space={sh24} />
        {ONBOARDING_DATA.map((item: IOnboarding, index: number) => (
          <View style={{ ...centerVertical, ...flexRow }} key={index}>
            <Text style={fs12BoldBlack4}>
              {ONBOARDING.STEP} {index + 1}
            </Text>
            <CustomSpacer space={sw24} isHorizontal={true} />
            <Text style={fs16RegBlack4}>{item.label}</Text>
            <CustomSpacer space={sh40} />
          </View>
        ))}
      </SideMenu>
      <SafeAreaPage>
        <View style={{ ...flexChild, ...px(sw96), backgroundColor: colorGray._3 }}>
          <CustomSpacer space={sh168} />
          <Text style={fs36SemiBoldBlack2}>{GREETINGS}</Text>
          <Text style={fs24RegBlack2}>{RISK_APPETITE.SUBHEADING}</Text>
          <CustomSpacer space={sh8} />
          <Text style={fs16RegBlack2}>{RISK_APPETITE.LABEL_QUESTION}</Text>
          <CustomSpacer space={sh24} />
          {options.map((option: CheckBoxProps, index: number) => (
            <Fragment key={index}>
              <CheckBox {...option} style={fs16RegBlack2} />
              <CustomSpacer space={sh16} />
            </Fragment>
          ))}
          <CustomFlexSpacer />
          <View style={flexRow}>
            <RoundedButton onPress={handlePress} secondary={true} text={RISK_APPETITE.BUTTON_SKIP} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <RoundedButton onPress={handlePress} text={RISK_APPETITE.BUTTON_TAKE} />
          </View>
          <CustomSpacer space={sh28} />
        </View>
      </SafeAreaPage>
    </View>
  );
};
