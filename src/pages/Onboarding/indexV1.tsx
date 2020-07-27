import React, { Fragment, useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";

import { OnboardingSteps } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { flexRow, fullHW, sw134, sw398 } from "../../styles";
import { OnboardingContent } from "./Content";

const { ONBOARDING } = Language.PAGE;

export const ONBOARDING_DATA: IOnboarding[] = [
  {
    content: [{ title: ONBOARDING.TITLE_QUESTIONNAIRE, route: ONBOARDING_ROUTES.Questionnaire }],
    label: ONBOARDING.TITLE_RISK_ASSESSMENT,
  },
  {
    label: ONBOARDING.TITLE_PRODUCT_RECOMMENDATION,
    route: ONBOARDING_ROUTES.ProductRecommendation,
  },
  {
    content: [
      { title: ONBOARDING.TITLE_PROOF_OF_ADDRESS, route: ONBOARDING_ROUTES.Address },
      { title: ONBOARDING.TITLE_CONTACT_DETAILS, route: ONBOARDING_ROUTES.PersonalDetails },
      { title: ONBOARDING.TITLE_EMPLOYMENT_DETAILS, route: ONBOARDING_ROUTES.EmploymentDetails },
      { title: ONBOARDING.TITLE_FATCA, route: ONBOARDING_ROUTES.Declaration },
    ],
    label: ONBOARDING.TITLE_PERSONAL_INFORMATION,
  },
  {
    label: ONBOARDING.TITLE_ACKNOWLEDGEMENT,
    route: ONBOARDING_ROUTES.Acknowledgement,
  },
  {
    label: ONBOARDING.TITLE_PAYMENT,
    route: ONBOARDING_ROUTES.Payment,
  },
];

interface OnboardingProps {
  navigation: IStackNavigationProp;
}

const PRODUCTS_INDEX = 1;

export const OnboardingPage = ({ navigation }: OnboardingProps) => {
  const [activeContent, setActiveContent] = useState<IContentItem | IOnboarding | undefined>(undefined);
  const [activeSection, setActiveSection] = useState(0);
  const [finishedStep, setFinishedStep] = useState<number[]>([]);
  const [hideSideMenu, setHideSideMenu] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const ACTIVE_CONTENT = activeContent !== undefined ? activeContent.route || "" : ONBOARDING_ROUTES.ProductRecommendation;

  const sideBarStyle: ViewStyle = ACTIVE_CONTENT === ONBOARDING_ROUTES.ProductRecommendation ? { width: sw134 } : { width: sw398 };

  const handleContentChange = (item: IContentItem | IOnboarding) => {
    setActiveContent(item);
    setShowOverlay(false);
  };

  const handleResetSection = () => {
    setActiveSection(PRODUCTS_INDEX);
    setHideSideMenu(true);
    setShowOverlay(false);
  };

  const handleExpand = () => {
    setHideSideMenu(false);
    setShowOverlay(true);
  };

  useEffect(() => {
    if (ONBOARDING_DATA[0].content !== undefined) {
      setActiveContent(ONBOARDING_DATA[0].content[0]);
    }
  }, []);

  useEffect(() => {
    if (activeSection === PRODUCTS_INDEX) {
      return setHideSideMenu(true);
    }
    if (activeSection === PRODUCTS_INDEX && ACTIVE_CONTENT === ONBOARDING_ROUTES.ProductRecommendation) {
      return setHideSideMenu(true);
    }
    return setHideSideMenu(false);
  }, [activeSection, ACTIVE_CONTENT]);

  return (
    <Fragment>
      <OnboardingSteps
        activeContent={activeContent}
        activeSection={activeSection}
        collapse={hideSideMenu}
        handleContentChange={handleContentChange}
        onPressBackdrop={handleResetSection}
        onPressExpand={handleExpand}
        overlay={showOverlay}
        RenderContent={({ handleNextStep }) => {
          return (
            <View style={{ ...flexRow, ...fullHW }}>
              <View style={sideBarStyle} />
              <OnboardingContent route={ACTIVE_CONTENT} handleNextStep={handleNextStep} navigation={navigation} />
            </View>
          );
        }}
        setActiveContent={setActiveContent}
        setActiveSection={setActiveSection}
        setFinishedStep={setFinishedStep}
        steps={ONBOARDING_DATA}
        visitedSections={finishedStep}
      />
    </Fragment>
  );
};
