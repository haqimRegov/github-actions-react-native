import React, { useEffect, useState } from "react";

import { OnboardingSteps, SafeAreaPage } from "../../components";
import { OnboardingContent } from "./Content";

export const OnboardingPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeContent, setActiveContent] = useState<IContentItem | IAccordionContent | undefined>(undefined);
  const [finishedStep, setFinishedStep] = useState<number[]>([]);

  const onboardingContent: IAccordionContent[] = [
    {
      content: [
        { title: "Questionnaire", route: "Questionnaire" },
        { title: "Funding Options & FEA Status", route: "FundingOptions" },
      ],
      label: "Risk Assessment",
    },
    {
      label: "Product Recommendation",
      route: "ProductRecommendation",
    },
    {
      content: [
        { title: "Proof of Address", route: "Address" },
        { title: "Contact Details", route: "ContactDetails" },
        { title: "Employment Details", route: "EmploymentDetails" },
        { title: "FATCA & CRS Declaration", route: "Declaration" },
      ],
      label: "Personal Information",
    },
    {
      label: "Confirmation",
      route: "Confirmation",
    },
    {
      label: "Payment",
      route: "Payment",
    },
  ];

  const handleContentChange = (item: IContentItem | IAccordionContent) => {
    setActiveContent(item);
  };

  useEffect(() => {
    if (onboardingContent[0].content !== undefined) {
      setActiveContent(onboardingContent[0].content[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        steps={onboardingContent}
        visitedSections={finishedStep}
      />
    </SafeAreaPage>
  );
};
