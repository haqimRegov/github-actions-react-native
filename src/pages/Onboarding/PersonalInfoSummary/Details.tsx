import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { AccountHeader, CustomSpacer, Dash, IconText, LabeledTitleProps, TextCard } from "../../../components";
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
  sw32,
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

  const textCardProps = { itemsPerGroup: 3, spaceBetweenItem: sw32, titleStyle: fsTransformNone };

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
          <View style={px(sw24)}>
            <TextCard data={personalDetails} {...textCardProps} />
          </View>
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_ADDITIONAL} />
          <View style={px(sw24)}>
            <TextCard data={additionalInfo} {...textCardProps} />
          </View>
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_CONTACT} />
          <View style={px(sw24)}>
            <TextCard data={contactDetails} {...textCardProps} />
          </View>
        </View>
        <View style={borderBottomBlack21}>
          <CustomSpacer space={sh16} />
          <TitleIcon onPress={handleEditPersonalDetails} title={SUMMARY.TITLE_ADDRESS} viewStyle={py(0)} />
          <CustomSpacer space={sh8} />
          <View style={px(sw24)}>
            <TextCard data={permanentAddress} itemStyle={{ marginBottom: sh8, marginTop: sh8 }} {...textCardProps} />
            <Dash />
            <CustomSpacer space={sh8} />
            <TextCard data={mailingAddress} {...textCardProps} />
          </View>
        </View>
        {epfDetails !== undefined && epfDetails.length !== 0 ? (
          <View style={borderBottomBlack21}>
            <TitleIcon onPress={handleEditOtherDetails} title={SUMMARY.TITLE_EPF} />
            <View style={px(sw24)}>
              <TextCard data={epfDetails} {...textCardProps} />
            </View>
          </View>
        ) : null}
        {(accountType === "Joint" && accountHolder === "Joint") ||
        (localBankDetails.length === 0 && foreignBankDetails.length === 0) ? null : (
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
                    <TextCard data={bank} {...textCardProps} />
                  </View>
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
                    <TextCard data={bank} {...textCardProps} />
                  </View>
                </Fragment>
              );
            })}
          </View>
        )}
        {employmentDetails.length > 0 ? (
          <View>
            <CustomSpacer space={sh16} />
            <TitleIcon onPress={handleEditEmploymentDetails} title={SUMMARY.TITLE_EMPLOYMENT} viewStyle={py(0)} />
            <CustomSpacer space={sh8} />
            <View style={px(sw24)}>
              <TextCard data={employmentDetails} itemStyle={{ marginBottom: sh8, marginTop: sh8 }} {...textCardProps} />
              <Dash />
              <CustomSpacer space={sh8} />
              <TextCard data={employmentAddress} {...textCardProps} />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};
