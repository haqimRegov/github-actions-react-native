import React, { useEffect, useState } from "react";

import { OnboardingSteps, SafeAreaPage } from "../../components";
import { ONBOARDING_ROUTES, Language } from "../../constants";
import { OnboardingContent } from "./Content";

const {
  TITLE_CONFORMATION,
  TITLE_CONTACT_DETAILS,
  TITLE_EMPLOYMENT_DETAILS,
  TITLE_FATCA,
  TITLE_FUNDING_OPTIONS,
  TITLE_PAYMENT,
  TITLE_PERSONAL_INFORMATION,
  TITLE_PRODUCT_RECOMMENDATION,
  TITLE_PROOF_OF_ADDRESS,
  TITLE_QUESTIONNAIRE,
  TITLE_RISK_ASSESSMENT,
} = Language.PAGE.ONBOARDING;

export const ONBOARDING: IOnboarding[] = [
  {
    content: [
      { title: TITLE_QUESTIONNAIRE, route: ONBOARDING_ROUTES.Questionnaire },
      { title: TITLE_FUNDING_OPTIONS, route: ONBOARDING_ROUTES.FundingOptions },
    ],
    label: TITLE_RISK_ASSESSMENT,
  },
  {
    label: TITLE_PRODUCT_RECOMMENDATION,
    route: ONBOARDING_ROUTES.ProductRecommendation,
  },
  {
    content: [
      { title: TITLE_PROOF_OF_ADDRESS, route: ONBOARDING_ROUTES.Address },
      { title: TITLE_CONTACT_DETAILS, route: ONBOARDING_ROUTES.ContactDetails },
      { title: TITLE_EMPLOYMENT_DETAILS, route: ONBOARDING_ROUTES.EmploymentDetails },
      { title: TITLE_FATCA, route: ONBOARDING_ROUTES.Declaration },
    ],
    label: TITLE_PERSONAL_INFORMATION,
  },
  {
    label: TITLE_CONFORMATION,
    route: ONBOARDING_ROUTES.Confirmation,
  },
  {
    label: TITLE_PAYMENT,
    route: ONBOARDING_ROUTES.Payment,
  },
];

export const OnboardingPage = () => {
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
    <SafeAreaPage>
      <OnboardingSteps
        activeContent={activeContent}
        activeSection={activeSection}
        handleContentChange={handleContentChange}
        RenderContent={({ handleNextStep }) => <OnboardingContent route={ACTIVE_CONTENT} handleNextStep={handleNextStep} />}
        setActiveContent={setActiveContent}
        setActiveSection={setActiveSection}
        setFinishedStep={setFinishedStep}
        steps={ONBOARDING}
        visitedSections={finishedStep}
      />
    </SafeAreaPage>
  );
};
