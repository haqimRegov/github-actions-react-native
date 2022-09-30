import React, { Fragment, FunctionComponent, useState } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import PDFView from "react-native-view-pdf";
import { connect } from "react-redux";

import { CheckBox, ContentPage, CustomFlexSpacer, CustomSpacer, CustomTooltip } from "../../../components";
import { Language } from "../../../constants";
import { CRS_NEW, DICTIONARY_LINK_FULL_TERMS, FATCA_NEW, INVESTOR_UPDATE } from "../../../data/dictionary";
import { IcoMoon } from "../../../icons";
import { AcknowledgementMapDispatchToProps, AcknowledgementMapStateToProps, AcknowledgementStoreProps } from "../../../store";
import {
  alignItemsStart,
  alignSelfCenter,
  borderBottomBlue4,
  colorBlue,
  disabledOpacity6,
  flexRow,
  fs12BoldWhite1,
  fs12SemiBoldBlue1,
  fs14RegGray5,
  fs16RegBlack2,
  justifyContentEnd,
  px,
  rowCenterVertical,
  sh16,
  sh24,
  sh32,
  sh4,
  sh456,
  sh6,
  sw10,
  sw14,
  sw24,
  sw265,
  sw4,
  sw800,
} from "../../../styles";
import { TermsAccordionNew } from "../../../templates";

const { TERMS_AND_CONDITIONS } = Language.PAGE;

interface TermsAndConditionsProps extends AcknowledgementStoreProps, ForceUpdateContentProps {
  navigation: IStackNavigationProp;
}

export const TermsAndConditionsComponent: FunctionComponent<TermsAndConditionsProps> = ({
  agreeTerms,
  forceUpdate,
  handleNextStep,
  updateAgree,
  updateForceUpdate,
}: TermsAndConditionsProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const { declarations } = forceUpdate;

  const handleAgree1 = () => {
    updateAgree({ agreeTerms: { ...agreeTerms, agree1: !agreeTerms.agree1 } });
  };

  const handleAgree2 = () => {
    updateAgree({ agreeTerms: { ...agreeTerms, agree2: !agreeTerms.agree2 } });
  };

  const handleAgree3 = () => {
    updateAgree({ agreeTerms: { ...agreeTerms, agree3: !agreeTerms.agree3 } });
  };

  const handleContinue = () => {
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...forceUpdate.disabledSteps];
    const findSignatures = updatedDisabledSteps.indexOf("Signatures");
    if (findSignatures !== -1) {
      updatedDisabledSteps.splice(findSignatures, 1);
    }
    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps });
    handleNextStep("Signatures");
  };

  const TERMS_AND_CONDITION_LIST: ITermsAccordionSection[] = [FATCA_NEW, CRS_NEW, INVESTOR_UPDATE];
  if (!declarations.includes("fatca")) {
    TERMS_AND_CONDITION_LIST.splice(0, 1);
  }
  if (!declarations.includes("crs")) {
    const checkIndex = !declarations.includes("fatca") ? 0 : 1;
    TERMS_AND_CONDITION_LIST.splice(checkIndex, 1);
  }

  const GENERAL: ITermsAccordionSection = {
    title: TERMS_AND_CONDITIONS.LABEL_GENERAL_TERMS_AND_CONDITIONS,
    custom: (
      <View>
        <PDFView style={{ height: sh456 }} resource={DICTIONARY_LINK_FULL_TERMS} resourceType="url" />
        <CustomSpacer space={sh24} />
      </View>
    ),
  };

  TERMS_AND_CONDITION_LIST.push(GENERAL);

  const handleExpandAll = () => {
    setExpandAll(!expandAll);
    if (activeSections.length === TERMS_AND_CONDITION_LIST.length) {
      setActiveSections([]);
      setExpandAll(true);
    } else {
      const allActiveSections: number[] = [];
      TERMS_AND_CONDITION_LIST.forEach((_section, index) => {
        return allActiveSections.push(index);
      });
      setActiveSections(allActiveSections);
    }
  };

  const headerText =
    activeSections.length === TERMS_AND_CONDITION_LIST.length
      ? TERMS_AND_CONDITIONS.LABEL_COLLAPSE_ALL
      : TERMS_AND_CONDITIONS.LABEL_EXPAND_ALL;

  const termsHeader: ViewStyle = { ...flexRow, ...alignSelfCenter, zIndex: 2 };
  const disabled = !(agreeTerms.agree1 === true && agreeTerms.agree2 === true && agreeTerms.agree3 === true);

  if (!forceUpdate.disabledSteps.includes("Signatures") && disabled === true) {
    const updatedDisabledSteps: TypeForceUpdateKey[] = [...forceUpdate.disabledSteps, "Signatures"];
    updateForceUpdate({ ...forceUpdate, disabledSteps: updatedDisabledSteps });
  }

  return (
    <ContentPage
      continueDisabled={disabled}
      handleContinue={handleContinue}
      labelContinue={TERMS_AND_CONDITIONS.BUTTON_AGREE}
      subheading={TERMS_AND_CONDITIONS.HEADING}>
      {TERMS_AND_CONDITION_LIST.length === 0 ? null : (
        <Fragment>
          <View style={px(sw24)}>
            <CustomSpacer space={sh4} />
            <View style={termsHeader}>
              <View style={rowCenterVertical}>
                <Text style={fs14RegGray5}>{TERMS_AND_CONDITIONS.SUBHEADING}</Text>
                <CustomTooltip
                  arrowSize={{ width: sw10, height: sh6 }}
                  content={<Text style={fs12BoldWhite1}>{TERMS_AND_CONDITIONS.POPUP_TERMS}</Text>}
                  contentStyle={{ width: sw265 }}
                  theme={"dark"}
                />
              </View>
              <CustomFlexSpacer />
              <Pressable onPress={handleExpandAll}>
                <View style={{ ...justifyContentEnd, ...flexRow }}>
                  <View>
                    <IcoMoon
                      color={colorBlue._1}
                      name={activeSections.length === TERMS_AND_CONDITION_LIST.length ? "collapse" : "expand"}
                      size={sw14}
                    />
                  </View>
                  <CustomSpacer isHorizontal space={sw4} />
                  <Text style={fs12SemiBoldBlue1}>{headerText}</Text>
                </View>
              </Pressable>
            </View>
            <CustomSpacer space={sh24} />
            <TermsAccordionNew
              activeSections={activeSections}
              expandMultiple={true}
              sections={TERMS_AND_CONDITION_LIST}
              setActiveSections={setActiveSections}
            />
            <CustomSpacer space={sh32} />
          </View>
          <View style={borderBottomBlue4} />
          <CustomSpacer space={sh32} />
          <View style={px(sw24)}>
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_1_NEW}
              onPress={handleAgree1}
              toggle={agreeTerms.agree1}
              labelStyle={fs16RegBlack2}
            />
            <CustomSpacer space={sh16} />
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_2_NEW}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={handleAgree2}
              toggle={agreeTerms.agree2}
              labelStyle={fs16RegBlack2}
            />
            <CustomSpacer space={sh16} />
            <CheckBox
              label={TERMS_AND_CONDITIONS.LABEL_CHECKBOX_3_NEW}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={handleAgree3}
              toggle={agreeTerms.agree3}
              labelStyle={fs16RegBlack2}
            />
            <CustomSpacer space={sh16} />
            <CheckBox
              checkboxStyle={disabledOpacity6}
              label={TERMS_AND_CONDITIONS.LABEL_CONSENT_NEW}
              style={{ ...alignItemsStart, width: sw800 }}
              onPress={() => {}}
              toggle={true}
              labelStyle={{ ...fs16RegBlack2, ...disabledOpacity6 }}
            />
          </View>
        </Fragment>
      )}
    </ContentPage>
  );
};

export const TermsAndConditions = connect(AcknowledgementMapStateToProps, AcknowledgementMapDispatchToProps)(TermsAndConditionsComponent);
