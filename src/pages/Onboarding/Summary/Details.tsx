import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

import { CardWrap, CustomFlexSpacer, CustomSpacer, IconText, LabeledTitleProps } from "../../../components";
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
  fs24BoldBlack2,
  px,
  py,
  sh16,
  sh24,
  sh8,
  sh80,
  shadowBlue5,
  sw16,
  sw24,
  sw8,
} from "../../../styles";

const { SUMMARY } = Language.PAGE;

interface SummaryDetailsProps {
  accountHolder: "Principal" | "Joint";
  accountType: TypeAccountChoices;
  additionalInfo: LabeledTitleProps[];
  contactDetails: LabeledTitleProps[];
  declarationDetails: LabeledTitleProps[];
  employmentDetails: LabeledTitleProps[];
  epfDetails?: LabeledTitleProps[];
  foreignBankDetails: LabeledTitleProps[][];
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
  declarationDetails,
  employmentDetails,
  epfDetails,
  foreignBankDetails,
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

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...shadowBlue5 }}>
        <View style={headerStyle}>
          <Text style={fs24BoldBlack2}>{name}</Text>
          <CustomFlexSpacer />
          {accountType === "Individual" ? null : <Text style={fs16RegBlack2}>{headerTitle}</Text>}
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon title={SUMMARY.TITLE_PERSONAL} />
          <CardWrap data={personalDetails} />
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon title={SUMMARY.LABEL_ADDITIONAL} />
          <CardWrap data={additionalInfo} />
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon title={SUMMARY.TITLE_ADDRESS} />
          <CardWrap data={permanentAddress} />
          <CardWrap data={mailingAddress} />
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon title={SUMMARY.TITLE_CONTACT} />
          <CardWrap data={contactDetails} />
        </View>
        {epfDetails !== undefined && epfDetails.length !== 0 ? (
          <View style={borderBottomBlack21}>
            <TitleIcon title={SUMMARY.TITLE_EPF} />
            <CardWrap data={epfDetails} />
          </View>
        ) : null}
        <View style={borderBottomBlack21}>
          <TitleIcon title={SUMMARY.TITLE_BANK} />
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
                <CardWrap data={bank} />
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
                <CardWrap data={bank} />
              </Fragment>
            );
          })}
        </View>
        <View style={borderBottomBlack21}>
          <TitleIcon title={SUMMARY.TITLE_EMPLOYMENT} />
          <CardWrap data={employmentDetails} />
        </View>
        <View>
          <TitleIcon title={SUMMARY.TITLE_FATCA} />
          <CardWrap data={declarationDetails} />
        </View>
      </View>
    </View>
  );
};
