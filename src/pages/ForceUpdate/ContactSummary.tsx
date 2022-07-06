import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import {
  ColorCard,
  CustomFlexSpacer,
  CustomSpacer,
  CustomToast,
  IconButton,
  LabeledTitle,
  SafeAreaPage,
  SelectionBanner,
  TextCard,
} from "../../components";
import { Language } from "../../constants";
import { PersonalInfoMapDispatchToProps, PersonalInfoMapStateToProps, PersonalInfoStoreProps } from "../../store";
import {
  border,
  circle,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  fs16BoldBlue1,
  fs16BoldGray6,
  fs16RegGray5,
  fs16RegGray6,
  fs18BoldGray6,
  fsTransformNone,
  noBorder,
  px,
  rowCenterVertical,
  sh100,
  sh24,
  sh4,
  sh40,
  sw1,
  sw16,
  sw24,
  sw248,
  sw4,
  sw40,
} from "../../styles";

const { INVESTOR_INFORMATION } = Language.PAGE;

interface ContactSummaryProps extends ForceUpdateContentProps, PersonalInfoStoreProps {}

const ContactSummaryComponent: FunctionComponent<ContactSummaryProps> = ({
  accountHolder,
  forceUpdate,
  handleNextStep,
  personalInfo,
  updateEmailVerified,
  updateForceUpdate,
}: ContactSummaryProps) => {
  const { principal } = personalInfo;
  const { disabledSteps, finishedSteps, emailVerified } = forceUpdate;
  const contactNumber = principal!.contactDetails!.contactNumber!;
  const inputEmail = principal!.contactDetails!.emailAddress!;
  const inputMobile = contactNumber[0];

  const contactSummary: LabeledTitleProps[] = [
    { label: INVESTOR_INFORMATION.LABEL_EMAIL, title: inputEmail, titleStyle: fsTransformNone },
    { label: INVESTOR_INFORMATION.LABEL_MOBILE, title: `${inputMobile.code} ${inputMobile.value}` },
  ];

  const setEmailVerified = (value: boolean) => {
    updateEmailVerified(value);
  };

  const handleContinue = () => {
    const nextStep: TypeForceUpdateKey = accountHolder === "Principal" ? "RiskAssessment" : "FATCADeclaration";
    handleNextStep(nextStep);
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeForceUpdateKey[] = [...finishedSteps];
    const findRiskAssessment = updatedDisabledSteps.indexOf("RiskAssessment");
    if (findRiskAssessment !== -1) {
      updatedDisabledSteps.splice(findRiskAssessment, 1);
    }
    updatedFinishedSteps.push("InvestorInformation");
    updateForceUpdate({ ...forceUpdate, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleEdit = () => {
    handleNextStep("Contact");
  };

  return (
    <Fragment>
      <SafeAreaPage>
        <CustomSpacer space={sh40} />
        <View style={{ ...px(sw24) }}>
          <LabeledTitle
            label={INVESTOR_INFORMATION.HEADING_CONTACT_SUMMARY}
            labelStyle={fs18BoldGray6}
            spaceToLabel={sh4}
            title={INVESTOR_INFORMATION.SUBTITLE_CONTACT_SUMMARY}
            titleStyle={fs16RegGray5}
          />
          <CustomSpacer space={sh24} />
          <ColorCard
            containerStyle={noBorder}
            header="custom"
            customHeader={
              <View style={rowCenterVertical}>
                <CustomSpacer isHorizontal={true} space={sw24} />
                <Text style={fs16BoldBlue1}>{INVESTOR_INFORMATION.CARD_LABEL_CONTACT}</Text>
                <CustomFlexSpacer />
                <IconButton
                  color={colorBlue._1}
                  name="pencil"
                  onPress={handleEdit}
                  style={circle(sw40, undefined)}
                  withHover={{ color: colorBlue._2 }}
                />
                <CustomSpacer isHorizontal={true} space={sw16} />
              </View>
            }
            headerStyle={{ ...border(colorGray._2, sw1), backgroundColor: colorWhite._1, ...px(0) }}
            contentStyle={{ ...border(colorGray._2, sw1), ...px(sw24) }}
            content={<TextCard data={contactSummary} spaceBetweenGroup={0} />}
          />
        </View>
        <CustomFlexSpacer />
        <SelectionBanner
          bottomContent={
            <View style={flexRow}>
              <Text style={fs16BoldGray6}>{INVESTOR_INFORMATION.BANNER_SUBTITLE_CONTACT}</Text>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <Text style={fs16RegGray6}>{INVESTOR_INFORMATION.BANNER_SUBTITLE_UPDATED}</Text>
            </View>
          }
          containerStyle={{ height: sh100 }}
          label={INVESTOR_INFORMATION.BANNER_TITLE}
          submitOnPress={handleContinue}
          labelSubmit={INVESTOR_INFORMATION.BUTTON_CONTINUE}
        />
      </SafeAreaPage>
      <CustomToast
        deleteText={INVESTOR_INFORMATION.TOAST_EMAIL}
        parentVisible={emailVerified}
        setParentVisible={setEmailVerified}
        toastStyle={{ width: sw248 }}
      />
    </Fragment>
  );
};
export const ContactSummaryContent = connect(PersonalInfoMapStateToProps, PersonalInfoMapDispatchToProps)(ContactSummaryComponent);
