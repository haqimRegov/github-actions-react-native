import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { AccountHeader, CardWrap, CustomFlexSpacer, CustomSpacer, IconText, LabeledTitleProps } from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import {
  borderBottomBlack21,
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  fs16BoldBlack2,
  fs16BoldBlue2,
  fs16RegBlack2,
  fs18BoldBlack2,
  fs24BoldBlack2,
  fsTransformNone,
  px,
  py,
  sh16,
  sh24,
  sh64,
  sh8,
  sh80,
  shadowBlack116,
  shadowBlue5,
  sw16,
  sw24,
  sw8,
} from "../../../styles";

const { SUMMARY } = Language.PAGE;

interface SummaryDetailsProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  additionalInfo: LabeledTitleProps[];
  contactDetails: LabeledTitleProps[];
  employmentDetails: LabeledTitleProps[];
  epfDetails?: LabeledTitleProps[];
  foreignBankDetails: LabeledTitleProps[][];
  handleNextStep: (route: TypeOnboardingRoute) => void;
  localBankDetails: LabeledTitleProps[][];
  mailingAddress: LabeledTitleProps[];
  name: string;
  permanentAddress: LabeledTitleProps[];
  personalDetails: LabeledTitleProps[];
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

export const SummaryDetails: FunctionComponent<SummaryDetailsProps> = ({
  accountHolder,
  accountType,
  additionalInfo,
  contactDetails,
  employmentDetails,
  epfDetails,
  foreignBankDetails,
  handleNextStep,
  localBankDetails,
  mailingAddress,
  name,
  permanentAddress,
  personalDetails,
}: SummaryDetailsProps) => {
  const headerStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw24),
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh80,
    position: "relative",
    zIndex: 1,
  };

  const headerTitle = accountHolder === "Principal" ? SUMMARY.TITLE_PRINCIPAL : SUMMARY.TITLE_JOINT;

  const handleEditPersonalDetails = () => {
    handleNextStep("IdentityVerification");
  };

  const handleEditOtherDetails = () => {
    handleNextStep("PersonalDetails");
  };

  const handleEditEmploymentDetails = () => {
    handleNextStep("EmploymentDetails");
  };

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...shadowBlack116 }}>
        {accountType === "Individual" ? (
          <View style={headerStyle}>
            <Text style={fs24BoldBlack2}>{name}</Text>
            <CustomFlexSpacer />
            <Text style={fs16RegBlack2}>{headerTitle}</Text>
          </View>
        ) : (
          <AccountHeader headerStyle={{ height: sh64 }} spaceToBottom={sh8} subtitle={headerTitle} title={name} />
        )}
        <View style={borderBottomBlack21}>
          <TitleIcon onPress={handleEditPersonalDetails} title={SUMMARY.TITLE_PERSONAL} />
          <CardWrap data={personalDetails} titleStyle={fsTransformNone} />
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.LABEL_ADDITIONAL} />
          <CardWrap data={additionalInfo} titleStyle={fsTransformNone} />
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon onPress={handleEditPersonalDetails} title={SUMMARY.TITLE_CONTACT} />
          <CardWrap data={contactDetails} titleStyle={fsTransformNone} />
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon onPress={handleEditPersonalDetails} title={SUMMARY.TITLE_ADDRESS} />
          <CardWrap data={permanentAddress} titleStyle={fsTransformNone} />
          <CardWrap data={mailingAddress} titleStyle={fsTransformNone} />
        </View>
        {epfDetails !== undefined && epfDetails.length !== 0 ? (
          <View style={borderBottomBlack21}>
            <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_EPF} />
            <CardWrap data={epfDetails} titleStyle={fsTransformNone} />
          </View>
        ) : null}
        <View style={borderBottomBlack21}>
          <TitleIcon onPress={handleEditEmploymentDetails} title={SUMMARY.TITLE_EMPLOYMENT} />
          <CardWrap data={employmentDetails} titleStyle={fsTransformNone} />
        </View>
        {accountType === "Joint" && accountHolder === "Joint" ? null : (
          <View>
            <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_BANK} titleStyle={fs18BoldBlack2} />
            {localBankDetails.map((bank: LabeledTitleProps[], index: number) => {
              const label = `${SUMMARY.SUBTITLE_LOCAL_BANK} ${index + 1}`;
              return (
                <Fragment key={index}>
                  {index === 0 ? null : <CustomSpacer space={sh8} />}
                  <View style={px(sw24)}>
                    <IconText color={colorBlue._2} iconSize={sh24} name="bank" text={label} textStyle={fs16BoldBlue2} />
                    <CustomSpacer space={sh8} />
                    <View style={borderBottomBlack21} />
                    <CustomSpacer space={sh8} />
                  </View>
                  <CardWrap data={bank} titleStyle={fsTransformNone} />
                </Fragment>
              );
            })}
            {foreignBankDetails.map((bank: LabeledTitleProps[], index: number) => {
              const label = `${SUMMARY.SUBTITLE_FOREIGN_BANK} ${index + 1}`;
              return (
                <Fragment key={index}>
                  <CustomSpacer space={sh8} />
                  <View style={px(sw24)}>
                    <IconText color={colorBlue._2} iconSize={sh24} name="bank" text={label} textStyle={fs16BoldBlue2} />
                    <CustomSpacer space={sh8} />
                    <View style={borderBottomBlack21} />
                    <CustomSpacer space={sh8} />
                  </View>
                  <CardWrap data={bank} titleStyle={fsTransformNone} />
                </Fragment>
              );
            })}
            <CustomSpacer space={sh24} />
          </View>
        )}
      </View>
    </View>
  );
};
