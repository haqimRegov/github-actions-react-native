import React, { FunctionComponent } from "react";
import { Alert, Text, TextStyle, View, ViewStyle } from "react-native";

import { CardV1, ContentPage, CustomSpacer, LabeledTitleProps } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  borderBottomBlack21,
  centerHorizontal,
  centerVertical,
  colorBlue,
  colorWhite,
  flexRow,
  fs16BoldBlack2,
  fs24BoldBlack2,
  px,
  py,
  sh24,
  sh80,
  shadowBlue5,
  sw16,
  sw200,
  sw24,
  sw8,
} from "../../styles";

const { SUMMARY } = Language.PAGE;

interface SummaryProps {
  handleNextStep: (route: string) => void;
}

interface TitleIconProps {
  title: string;
  titleStyle?: TextStyle;
  onPress?: () => void;
}

const TitleIcon = ({ onPress, title, titleStyle }: TitleIconProps) => {
  return (
    <View style={{ ...centerVertical, ...flexRow, ...px(sw24), ...py(sw24) }}>
      <Text style={{ ...fs16BoldBlack2, ...titleStyle }}>{title}</Text>
      <CustomSpacer isHorizontal={true} space={sw16} />
      <IcoMoon color={colorBlue._1} name="edit" onPress={onPress} size={sh24} />
    </View>
  );
};

export const Summary: FunctionComponent<SummaryProps> = ({ handleNextStep }: SummaryProps) => {
  const SAMPLE_NAME = "Edgar Constantine";

  const handleCancel = () => {
    Alert.alert("Cancel");
  };

  const handleContinue = () => {
    handleNextStep(ONBOARDING_ROUTES.Acknowledgement);
  };

  const personalDetails: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_NRIC_NUMBER, title: "880808-08-8888" },
    { label: SUMMARY.LABEL_DATE_OF_BIRTH, title: "123" },
    { label: SUMMARY.LABEL_SALUTATION, title: "123" },
    { label: SUMMARY.LABEL_GENDER, title: "123" },
    { label: SUMMARY.LABEL_NATIONALITY, title: "123" },
    { label: SUMMARY.LABEL_BUMIPUTERA, title: "123" },
    { label: SUMMARY.LABEL_RACE, title: "123" },
    { label: SUMMARY.LABEL_RISK_PROFILE, title: "123" },
    { label: SUMMARY.LABEL_PLACE_OF_BIRTH, title: "123" },
    { label: SUMMARY.LABEL_COUNTRY_OF_BIRTH, title: "123" },
    { label: SUMMARY.LABEL_MOTHER, title: "123" },
    { label: SUMMARY.LABEL_MARITAL, title: "123" },
    { label: SUMMARY.LABEL_EDUCATION, title: "123" },
  ];

  const permanentAddress: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_PERMANENT_ADDRESS, title: "123" },
    { label: SUMMARY.LABEL_POSTCODE, title: "123" },
    { label: SUMMARY.LABEL_CITY, title: "123" },
    { label: SUMMARY.LABEL_STATE, title: "123" },
    { label: SUMMARY.LABEL_COUNTRY, title: "123" },
  ];

  const mailingAddress: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_MAILING_ADDRESS, title: "123" },
    { label: SUMMARY.LABEL_POSTCODE, title: "123" },
    { label: SUMMARY.LABEL_CITY, title: "123" },
    { label: SUMMARY.LABEL_STATE, title: "123" },
    { label: SUMMARY.LABEL_COUNTRY, title: "123" },
  ];

  const contactDetails: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_EMAIL, title: "123" },
    { label: SUMMARY.LABEL_MOBILE_NUMBER, title: "123" },
    { label: SUMMARY.LABEL_HOME_NUMBER, title: "123" },
    { label: SUMMARY.LABEL_OFFICE_NUMBER, title: "123" },
    { label: SUMMARY.LABEL_FAX_NUMBER, title: "123" },
  ];

  const epfDetails: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_EPF_NUMBER, title: "123" },
    { label: SUMMARY.LABEL_EPF_ACCOUNT, title: "123" },
  ];

  const localBank: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_CURRENCY, title: "123" },
    { label: SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: "123" },
    { label: SUMMARY.LABEL_BANK_NAME, title: "123" },
    { label: SUMMARY.LABEL_BANK_ACCOUNT_NUMBER, title: "123" },
    { label: SUMMARY.LABEL_BANK_SWIFT, title: "123" },
  ];

  const foreignBank: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_CURRENCY, title: "123" },
    { label: SUMMARY.LABEL_BANK_ACCOUNT_NAME, title: "123" },
    { label: SUMMARY.LABEL_BANK_NAME, title: "123" },
    { label: SUMMARY.LABEL_BANK_ACCOUNT_NUMBER, title: "123" },
    { label: SUMMARY.LABEL_BANK_SWIFT, title: "123" },
    { label: SUMMARY.LABEL_BANK_LOCATION, title: "123" },
  ];

  const employmentDetails: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_OCCUPATION, title: "123" },
    { label: SUMMARY.LABEL_NATURE, title: "123" },
    { label: SUMMARY.LABEL_MONTHLY, title: "123" },
    { label: SUMMARY.LABEL_EMPLOYER_NAME, title: "123" },
    { label: SUMMARY.LABEL_EMPLOYER_ADDRESS, title: "123" },
    { label: SUMMARY.LABEL_POSTCODE, title: "123" },
    { label: SUMMARY.LABEL_CITY, title: "123" },
    { label: SUMMARY.LABEL_STATE, title: "123" },
    { label: SUMMARY.LABEL_COUNTRY, title: "123" },
  ];

  const declaration: LabeledTitleProps[] = [
    { label: SUMMARY.LABEL_CITIZENSHIP, title: "123" },
    { label: SUMMARY.LABEL_US_BORN, title: "123" },
    { label: SUMMARY.LABEL_RESIDENT, title: "123" },
    { label: SUMMARY.LABEL_CERTIFICATE, title: "123" },
    { label: SUMMARY.LABEL_CERTIFICATE_REASON, title: "123" },
    { label: SUMMARY.LABEL_JURISDICTION, labelStyle: { width: sw200 }, title: "123" },
    { label: SUMMARY.LABEL_TIN_COUNTRY, title: "123" },
    { label: SUMMARY.LABEL_TIN_NUMBER, title: "123" },
    { label: SUMMARY.LABEL_TIN_REASON, title: "123" },
    { label: SUMMARY.LABEL_TIN_REMARKS, title: "123" },
  ];

  const headerStyle: ViewStyle = {
    ...centerHorizontal,
    ...px(sw24),
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
    height: sh80,
    position: "relative",
    zIndex: 1,
  };

  return (
    <ContentPage
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      noBounce={true}
      subheading={SUMMARY.HEADING}
      subtitle={SUMMARY.SUBHEADING}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh24} />
        <View style={{ backgroundColor: colorWhite._1, borderRadius: sw8, ...shadowBlue5 }}>
          <View style={headerStyle}>
            <Text style={fs24BoldBlack2}>{SAMPLE_NAME}</Text>
          </View>
          <View style={borderBottomBlack21}>
            <TitleIcon title={SUMMARY.TITLE_PERSONAL} />
            <CardV1 data={personalDetails} />
          </View>
          <View style={borderBottomBlack21}>
            <TitleIcon title={SUMMARY.TITLE_ADDRESS} />
            <CardV1 data={permanentAddress} />
            <CardV1 data={mailingAddress} />
          </View>
          <View style={borderBottomBlack21}>
            <TitleIcon title={SUMMARY.TITLE_CONTACT} />
            <CardV1 data={contactDetails} />
          </View>
          <View style={borderBottomBlack21}>
            <TitleIcon title={SUMMARY.TITLE_EPF} />
            <CardV1 data={epfDetails} />
          </View>
          <View style={borderBottomBlack21}>
            <TitleIcon title={SUMMARY.TITLE_BANK} />
            <CardV1 data={localBank} />
            <CardV1 data={foreignBank} />
          </View>
          <View style={borderBottomBlack21}>
            <TitleIcon title={SUMMARY.TITLE_EMPLOYMENT} />
            <CardV1 data={employmentDetails} />
          </View>
          <View>
            <TitleIcon title={SUMMARY.TITLE_FATCA} />
            <CardV1 data={declaration} />
          </View>
        </View>
      </View>
    </ContentPage>
  );
};
