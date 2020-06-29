import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";

import { OnboardingSteps, SafeAreaPage } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { OnboardingContent } from "./Content";

const { ONBOARDING } = Language.PAGE;

export const ONBOARDING_DATA: IOnboarding[] = [
  {
    content: [
      { title: ONBOARDING.TITLE_QUESTIONNAIRE, route: ONBOARDING_ROUTES.Questionnaire },
      { title: ONBOARDING.TITLE_FUNDING_OPTIONS, route: ONBOARDING_ROUTES.FundingOptions },
    ],
    label: ONBOARDING.TITLE_RISK_ASSESSMENT,
  },
  {
    label: ONBOARDING.TITLE_PRODUCT_RECOMMENDATION,
    route: ONBOARDING_ROUTES.ProductRecommendation,
  },
  {
    content: [
      { title: ONBOARDING.TITLE_PROOF_OF_ADDRESS, route: ONBOARDING_ROUTES.Address },
      { title: ONBOARDING.TITLE_CONTACT_DETAILS, route: ONBOARDING_ROUTES.ContactDetails },
      { title: ONBOARDING.TITLE_EMPLOYMENT_DETAILS, route: ONBOARDING_ROUTES.EmploymentDetails },
      { title: ONBOARDING.TITLE_FATCA, route: ONBOARDING_ROUTES.Declaration },
    ],
    label: ONBOARDING.TITLE_PERSONAL_INFORMATION,
  },
  {
    label: ONBOARDING.TITLE_CONFIRMATION,
    route: ONBOARDING_ROUTES.Confirmation,
  },
  {
    label: ONBOARDING.TITLE_PAYMENT,
    route: ONBOARDING_ROUTES.Payment,
  },
];

interface OnboardingProps {
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const OnboardingPage = ({ navigation }: OnboardingProps) => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeContent, setActiveContent] = useState<IContentItem | IOnboarding | undefined>(undefined);
  const [finishedStep, setFinishedStep] = useState<number[]>([]);

  const handleContentChange = (item: IContentItem | IOnboarding) => {
    setActiveContent(item);
  };

  useEffect(() => {
    if (ONBOARDING[0].content !== undefined) {
      setActiveContent(ONBOARDING[0].content[0]);
    }
  }, []);

  const ACTIVE_CONTENT = activeContent !== undefined ? activeContent.route || "" : "Questionnaire";

  return (
    <OnboardingSteps
      activeContent={activeContent}
      activeSection={activeSection}
      handleContentChange={handleContentChange}
      RenderContent={({ handleNextStep }) => (
        <SafeAreaPage>
          <OnboardingContent route={ACTIVE_CONTENT} handleNextStep={handleNextStep} navigation={navigation} />
        </SafeAreaPage>
      )}
      setActiveContent={setActiveContent}
      setActiveSection={setActiveSection}
      setFinishedStep={setFinishedStep}
      steps={ONBOARDING_DATA}
      visitedSections={finishedStep}
    />
  );
};
