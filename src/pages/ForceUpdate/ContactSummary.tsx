import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
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
import { submitChangeRequest } from "../../network-actions";
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
import { isArrayNotEmpty } from "../../utils";

const { INVESTOR_INFORMATION } = Language.PAGE;

interface ContactSummaryProps extends ForceUpdateContentProps, PersonalInfoStoreProps {
  navigation: IStackNavigationProp;
}

const ContactSummaryComponent: FunctionComponent<ContactSummaryProps> = ({
  accountHolder,
  details,
  forceUpdate,
  handleNextStep,
  navigation,
  personalInfo,
  updateEmailVerified,
  updateForceUpdate,
}: ContactSummaryProps) => {
  const { principal } = personalInfo;
  const { declarations, disabledSteps, finishedSteps, emailVerified } = forceUpdate;
  const contactNumber = principal!.contactDetails!.contactNumber!;
  const inputEmail = principal!.contactDetails!.emailAddress!;
  const inputMobile = contactNumber[0];

  const fetching = useRef<boolean>(false);
  const [continueLoader, setContinueLoader] = useState<boolean>(false);

  const contactSummary: LabeledTitleProps[] = [
    { label: INVESTOR_INFORMATION.LABEL_EMAIL, title: inputEmail, titleStyle: fsTransformNone },
    { label: INVESTOR_INFORMATION.LABEL_MOBILE, title: `${inputMobile.code} ${inputMobile.value}` },
  ];

  const setEmailVerified = (value: boolean) => {
    updateEmailVerified(value);
  };

  const handleContinue = async () => {
    let nextStep: TypeForceUpdateKey = accountHolder === "Principal" ? "RiskAssessment" : "FATCADeclaration";
    let updatedDisabledSteps: TypeForceUpdateKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeForceUpdateKey[] = [...finishedSteps];

    updatedFinishedSteps.push("InvestorInformation", "ContactSummary");

    if (isArrayNotEmpty(declarations) === true) {
      // Investor has to do Declaration
      const findRiskAssessment = updatedDisabledSteps.indexOf("RiskAssessment");
      if (findRiskAssessment !== -1) {
        updatedDisabledSteps.splice(findRiskAssessment, 1);
      }

      const findFinishedFatca = updatedFinishedSteps.indexOf("FATCADeclaration");
      if (findFinishedFatca !== -1 && accountHolder === "Joint") {
        nextStep = "CRSDeclaration";
      }

      const findFinishedCrs = updatedFinishedSteps.indexOf("CRSDeclaration");
      if (findFinishedCrs !== -1 && findFinishedFatca !== -1 && accountHolder === "Joint") {
        nextStep = "DeclarationSummary";
      }
    }

    if (isArrayNotEmpty(declarations) === false && fetching.current === false && accountHolder === "Joint") {
      const request: ISubmitChangeRequestRequest = {
        id: details?.principalHolder?.id!,
        initId: details?.initId as string,
        clientId: details!.principalHolder!.clientId!,
        clientInfo: {
          contactDetails: {
            contactNumber: principal!.contactDetails!.contactNumber!.map((contact) => ({
              code: contact.code,
              label: contact.label,
              value: contact.value,
            })),
            emailAddress: principal!.contactDetails!.emailAddress!,
          },
          declaration: {},
        },
      };
      setContinueLoader(true);
      fetching.current = true;
      const response: ISubmitChangeRequestResponse = await submitChangeRequest(request, navigation);
      fetching.current = false;
      setContinueLoader(false);
      if (response !== undefined) {
        const { data, error } = response;
        if (error === null && data !== null) {
          nextStep = "TermsAndConditions";
          updatedDisabledSteps = ["InvestorInformation", "Acknowledgement", "Signatures"];
        }

        if (error !== null) {
          const errorList = error.errorList?.join("\n");
          setTimeout(() => {
            Alert.alert(error.message, errorList);
          }, 150);
        }
      }
    }

    updateForceUpdate({ ...forceUpdate, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
    handleNextStep(nextStep);
  };

  const handleEdit = () => {
    const updatedDisabledSteps: TypeForceUpdateKey[] = [
      "ContactSummary",
      "RiskAssessment",
      "Declarations",
      "FATCADeclaration",
      "CRSDeclaration",
      "DeclarationSummary",
      "Acknowledgement",
      "TermsAndConditions",
      "Signatures",
    ];

    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps, finishedSteps: [] });
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
                  style={circle(sw40)}
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
          continueLoading={continueLoader}
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
