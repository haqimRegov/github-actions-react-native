import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";

import { OnboardingSteps } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import {
  OnboardingStepsMapDispatchToProps,
  OnboardingStepsMapStateToProps,
  OnboardingStepsStoreProps,
  PersonalInfoStoreProps,
} from "../../store";
import { OnboardingContent } from "./Content";

const { ONBOARDING } = Language.PAGE;

export const ONBOARDING_DATA: IOnboarding[] = [
  {
    label: ONBOARDING.TITLE_QUESTIONNAIRE,
    route: ONBOARDING_ROUTES.Questionnaire,
  },
  {
    label: ONBOARDING.TITLE_PRODUCT_RECOMMENDATION,
    route: ONBOARDING_ROUTES.ProductRecommendation,
  },
  {
    content: [
      { title: ONBOARDING.TITLE_EMAIL_VERIFICATION, route: ONBOARDING_ROUTES.EmailVerification },
      { title: ONBOARDING.TITLE_ID_VERIFICATION, route: ONBOARDING_ROUTES.IdentityVerification },
      { title: ONBOARDING.TITLE_PERSONAL_DETAILS, route: ONBOARDING_ROUTES.PersonalDetails },
      { title: ONBOARDING.TITLE_EMPLOYMENT_DETAILS, route: ONBOARDING_ROUTES.EmploymentDetails },
      { title: ONBOARDING.TITLE_FATCA, route: ONBOARDING_ROUTES.Declaration },
      { title: ONBOARDING.TITLE_SUMMARY, route: ONBOARDING_ROUTES.Summary },
    ],
    label: ONBOARDING.TITLE_PERSONAL_INFORMATION,
  },
  {
    content: [
      { title: ONBOARDING.TITLE_ORDER_SUMMARY, route: ONBOARDING_ROUTES.OrderSummary },
      { title: ONBOARDING.TITLE_TERMS_CONDITIONS, route: ONBOARDING_ROUTES.TermsAndConditions },
    ],
    label: ONBOARDING.TITLE_ACKNOWLEDGEMENT,
  },
  {
    label: ONBOARDING.TITLE_PAYMENT,
    route: ONBOARDING_ROUTES.Payment,
  },
];

interface OnboardingPageProps extends OnboardingStepsStoreProps, PersonalInfoStoreProps {
  navigation: IStackNavigationProp;
}

const OnboardingPageComponent: FunctionComponent<OnboardingPageProps> = (props: OnboardingPageProps) => {
  const { finishedSteps, navigation, resetClientDetails, resetPersonalInfo, updateFinishedSteps } = props;

  const [activeContent, setActiveContent] = useState<IContentItem | IOnboarding | undefined>(ONBOARDING_DATA[0]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const activeRoute: TypeOnboardingRoute = activeContent !== undefined ? activeContent.route! : ONBOARDING_ROUTES.Questionnaire;

  const handleContentChange = (item: IContentItem | IOnboarding) => {
    setActiveContent(item);
  };

  useEffect(() => {
    if (ONBOARDING_DATA[0].content !== undefined) {
      setActiveContent(ONBOARDING_DATA[0].content[0]);
    }
  }, []);

  return (
    <OnboardingSteps
      activeContent={activeContent}
      activeSection={activeSection}
      finishedSteps={finishedSteps}
      handleContentChange={handleContentChange}
      RenderContent={({ handleNextStep }) => {
        return (
          <OnboardingContent
            finishedSteps={finishedSteps}
            handleNextStep={handleNextStep}
            navigation={navigation}
            resetClientDetails={resetClientDetails}
            resetPersonalInfo={resetPersonalInfo}
            route={activeRoute}
            setFinishedSteps={updateFinishedSteps}
          />
        );
      }}
      setActiveContent={setActiveContent}
      setActiveSection={setActiveSection}
      setFinishedStep={updateFinishedSteps}
      steps={ONBOARDING_DATA}
    />
  );
};

export const OnboardingPage = connect(OnboardingStepsMapStateToProps, OnboardingStepsMapDispatchToProps)(OnboardingPageComponent);
