import * as React from "react";
import { Text, View, ViewStyle, Image, Alert } from "react-native";

import { useSafeArea } from "react-native-safe-area-context";
import { LocalAssets } from "../assets/LocalAssets";
import {
  colorGray,
  f32SemiBoldBlack4,
  flexRow,
  fs12BoldBlack4,
  fs16RegBlack2,
  fs16RegBlack4,
  fs24RegBlack2,
  fs36SemiBoldBlack2,
  fullHeight,
  fullWidth,
  sh12,
  sh16,
  sh184,
  sh24,
  sh40,
  sh48,
  sh72,
  sh8,
  sh91,
  sw16,
  sw36,
  sw400,
  sw96,
} from "../styles";
import { CustomSpacer, CustomFlexSpacer, CheckBox, RoundedButton } from "../components";

const STEP_INFO = ["Risk Assessment", "Product Recommendation", "Personal Information", "Conformation", "Payment"];
const RISK_ASSESSMENT_INFO = [
  "My gross annual income is more than RM 300,000/Year.",
  "My annual household income* is more than RM 400,000/Year.",
  "My current net asset** worth is  more than RM 3,000,000.",
];
const BUTTONS = ["Skip Risk Assessment", "Take Risk Assessment"];

export const NetWorthAssessment = () => {
  // const { bottom, top } = useSafeArea();
  const handlePress = () => Alert.alert("alert");
  const pageContainer: ViewStyle = { ...flexRow, ...fullHeight };
  const stepsContainer: ViewStyle = { paddingLeft: sw36, width: sw400 };
  const assessmentContainer: ViewStyle = { paddingLeft: sw96, backgroundColor: colorGray._3, ...fullWidth };
  return (
    <View style={pageContainer}>
      <View>
        <View style={stepsContainer}>
          <CustomSpacer space={sh72} />
          <View>
            <Image source={LocalAssets.logo.kenanga} />
          </View>
          <CustomSpacer space={sh91} />
          <View>
            <Text style={f32SemiBoldBlack4}>Your financial</Text>
            <Text style={f32SemiBoldBlack4}>freedom in just</Text>
            <Text style={f32SemiBoldBlack4}>5 simple steps</Text>
          </View>
          <CustomSpacer space={sh24} />
          <View>
            {STEP_INFO.map((INFO: string, index: number) => (
              <View style={flexRow} key={index}>
                <Text style={fs12BoldBlack4}>
                  STEP {index + 1}
                  {"           "}
                </Text>
                <Text style={fs16RegBlack4}>{INFO}</Text>
                <CustomSpacer space={sh40} />
              </View>
            ))}
          </View>
        </View>
        <CustomFlexSpacer />
        <Image source={LocalAssets.OnboardingPeople.OnboardingPeople} />
      </View>
      <View style={assessmentContainer}>
        <CustomSpacer space={sh184} />
        <View>
          <Text style={fs36SemiBoldBlack2}>Hello Edgar.</Text>
          <Text style={fs24RegBlack2}>Before we continue, let's find your risk appetite.</Text>
          <CustomSpacer space={sh8} />
          <Text style={fs16RegBlack2}>Do you fall under any of the following categories,</Text>
        </View>
        <CustomSpacer space={sh12} />
        <View>
          {RISK_ASSESSMENT_INFO.map((INFO: string, index: number) => (
            <React.Fragment key={index}>
              <CheckBox label={INFO} toggle={true} />
              <CustomSpacer space={sh16} />
            </React.Fragment>
          ))}
        </View>
        <CustomFlexSpacer />
        <View style={flexRow}>
          {BUTTONS.map((INFO: string, index: number) => (
            <React.Fragment key={index}>
              <RoundedButton text={INFO} onPress={handlePress} secondary={INFO === "Skip Risk Assessment"} />
              <CustomSpacer space={sw16} isHorizontal={true} />
            </React.Fragment>
          ))}
        </View>
        <CustomSpacer space={sh48} />
      </View>
    </View>
  );
};
