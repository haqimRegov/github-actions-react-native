import React, { Fragment, useState } from "react";
import { Alert, Image, ImageStyle, Text, View } from "react-native";

import { LocalAssets } from "../assets/LocalAssets";
import { CheckBox, CheckBoxProps, CustomFlexSpacer, CustomSpacer, RoundedButton } from "../components";
import { Language } from "../constants";
import {
  centerVertical,
  colorGray,
  colorWhite,
  flexRow,
  fs12BoldBlack4,
  fs16RegBlack2,
  fs16RegBlack4,
  fs24RegBlack2,
  fs32SemiBoldBlack4,
  fs36SemiBoldBlack2,
  fullHeight,
  fullWidth,
  px,
  sh16,
  sh184,
  sh24,
  sh40,
  sh48,
  sh60,
  sh72,
  sh8,
  sh91,
  sw126,
  sw16,
  sw24,
  sw240,
  sw36,
  sw398,
  sw96,
} from "../styles";
import { ONBOARDING } from "./Onboarding";

const { HEADING } = Language.PAGE.ONBOARDING;
const {
  ANSWER_1,
  ANSWER_2,
  ANSWER_3,
  BEFORE_WE_CONTINUE,
  BUTTON_SKIP_RISK_ASSESSMENT,
  BUTTON_TAKE_RISK_ASSESSMENT,
  HELLO,
  QUESTION,
  STEP,
} = Language.PAGE.NET_WORTH_ASSESSMENT;
const USER_NAME: string = "Edgar";
const HELLO_USER: string = `${HELLO} ${USER_NAME}.`;

export const NetWorthAssessment = () => {
  const [assessment1, setAssessment1] = useState<boolean>(false);
  const [assessment2, setAssessment2] = useState<boolean>(false);
  const [assessment3, setAssessment3] = useState<boolean>(false);

  const logoStyle: ImageStyle = { height: sh60, resizeMode: "contain", width: sw126 };

  const handlePress = () => Alert.alert("alert");

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
    { label: ANSWER_1, onPress: handleAssessment1, toggle: assessment1 },
    { label: ANSWER_2, onPress: handleAssessment2, toggle: assessment2 },
    { label: ANSWER_3, onPress: handleAssessment3, toggle: assessment3 },
  ];

  return (
    <View style={{ ...flexRow, ...fullHeight }}>
      <View style={{ backgroundColor: colorWhite._2 }}>
        <View style={{ ...px(sw36), width: sw398 }}>
          <CustomSpacer space={sh72} />
          <Image source={LocalAssets.logo.kenanga} style={logoStyle} />
          <CustomSpacer space={sh91} />
          <Text style={{ ...fs32SemiBoldBlack4, width: sw240 }}>{HEADING}</Text>
          <CustomSpacer space={sh24} />
          {ONBOARDING.map((item: IOnboarding, index: number) => (
            <View style={{ ...centerVertical, ...flexRow }} key={index}>
              <Text style={fs12BoldBlack4}>
                {STEP} {index + 1}
              </Text>
              <CustomSpacer space={sw24} isHorizontal={true} />
              <Text style={fs16RegBlack4}>{item.label}</Text>
              <CustomSpacer space={sh40} />
            </View>
          ))}
        </View>
        <CustomFlexSpacer />
        <Image source={LocalAssets.onboarding.people} style={fullWidth} />
      </View>
      <View style={{ ...px(sw96), backgroundColor: colorGray._3 }}>
        <CustomSpacer space={sh184} />
        <Text style={fs36SemiBoldBlack2}>{HELLO_USER}</Text>
        <Text style={fs24RegBlack2}>{BEFORE_WE_CONTINUE}</Text>
        <CustomSpacer space={sh8} />
        <Text style={fs16RegBlack2}>{QUESTION}</Text>
        <CustomSpacer space={sh24} />
        {options.map((option: CheckBoxProps, index: number) => (
          <Fragment key={index}>
            <CheckBox {...option} style={fs16RegBlack2} />
            <CustomSpacer space={sh16} />
          </Fragment>
        ))}
        <CustomFlexSpacer />
        <View style={flexRow}>
          <RoundedButton
            buttonStyle={{ backgroundColor: colorGray._3 }}
            noShadow={true}
            onPress={handlePress}
            secondary={true}
            text={BUTTON_SKIP_RISK_ASSESSMENT}
          />
          <CustomSpacer isHorizontal={true} space={sw16} />
          <RoundedButton onPress={handlePress} text={BUTTON_TAKE_RISK_ASSESSMENT} />
        </View>
        <CustomSpacer space={sh48} />
      </View>
    </View>
  );
};
