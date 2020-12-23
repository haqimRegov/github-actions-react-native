import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { AccountHeader, CardWrap, CustomSpacer, Dash, IconText, LabeledTitleProps } from "../../../components";
import { Language } from "../../../constants";
import { IcoMoon } from "../../../icons";
import {
  borderBottomBlack21,
  borderBottomRed4,
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  fs16BoldBlack2,
  fs16BoldBlue2,
  fs18BoldBlack2,
  fs24BoldBlack2,
  fsTransformNone,
  px,
  py,
  sh16,
  sh24,
  sh64,
  sh8,
  shadowBlack116,
  shadowBlue204,
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
  employmentAddress: LabeledTitleProps[];
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
  viewStyle?: ViewStyle;
}

const TitleIcon = ({ onPress, title, titleStyle, viewStyle }: TitleIconProps) => {
  return (
    <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sh16), ...viewStyle }}>
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
  employmentAddress,
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
    ...borderBottomRed4,
    ...shadowBlue204,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh64,
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
          </View>
        ) : (
          <AccountHeader headerStyle={{ height: sh64 }} spaceToBottom={0} subtitle={headerTitle} title={name} />
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
          <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_CONTACT} />
          <CardWrap data={contactDetails} titleStyle={fsTransformNone} />
        </View>
        <View style={borderBottomBlack21}>
          <CustomSpacer space={sh16} />
          <TitleIcon onPress={handleEditPersonalDetails} title={SUMMARY.TITLE_ADDRESS} viewStyle={py(0)} />
          <CustomSpacer space={sh8} />
          <CardWrap data={permanentAddress} itemStyle={{ marginBottom: sh8, marginTop: sh8 }} titleStyle={fsTransformNone} />
          <View style={px(sw24)}>
            <Dash />
          </View>
          <CustomSpacer space={sh8} />
          <CardWrap data={mailingAddress} titleStyle={fsTransformNone} />
        </View>
        {epfDetails !== undefined && epfDetails.length !== 0 ? (
          <View style={borderBottomBlack21}>
            <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_EPF} />
            <CardWrap data={epfDetails} titleStyle={fsTransformNone} />
          </View>
        ) : null}
        {accountType === "Joint" && accountHolder === "Joint" ? null : (
          <View style={borderBottomBlack21}>
            <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_BANK} titleStyle={fs18BoldBlack2} />
            {localBankDetails.map((bank: LabeledTitleProps[], index: number) => {
              const label = `${SUMMARY.SUBTITLE_LOCAL_BANK} ${index + 1}`;
              return (
                <Fragment key={index}>
                  {index === 0 ? null : <CustomSpacer space={sh8} />}
                  <View style={px(sw24)}>
                    <IconText color={colorBlue._2} iconSize={sh24} name="bank" text={label} textStyle={fs16BoldBlue2} />
                    <CustomSpacer space={sh8} />
                    <Dash />
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
                    <Dash />
                    <CustomSpacer space={sh8} />
                  </View>
                  <CardWrap data={bank} titleStyle={fsTransformNone} />
                </Fragment>
              );
            })}
          </View>
        )}
        <View>
          <CustomSpacer space={sh16} />
          <TitleIcon onPress={handleEditEmploymentDetails} title={SUMMARY.TITLE_EMPLOYMENT} viewStyle={py(0)} />
          <CustomSpacer space={sh8} />
          <CardWrap data={employmentDetails} itemStyle={{ marginBottom: sh8, marginTop: sh8 }} titleStyle={fsTransformNone} />
          <View style={px(sw24)}>
            <Dash />
          </View>
          <CustomSpacer space={sh8} />
          <CardWrap data={employmentAddress} titleStyle={fsTransformNone} />
        </View>
      </View>
    </View>
  );
};
