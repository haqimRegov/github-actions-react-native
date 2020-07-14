import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { View } from "react-native";

import { OnboardingStepsV2 } from "../../components";
import { Language, ONBOARDING_ROUTES } from "../../constants";
import { flexRow, fullHW } from "../../styles";
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
  navigation: StackNavigationProp<RootNavigatorType>;
}

export const OnboardingPage = ({ navigation }: OnboardingProps) => {
  const [activeContent, setActiveContent] = useState<IContentItem | IOnboarding | undefined>(undefined);
  const [activeSection, setActiveSection] = useState(0);
  const [finishedStep, setFinishedStep] = useState<number[]>([]);

  const ACTIVE_CONTENT = activeContent !== undefined ? activeContent.route || "" : ONBOARDING_ROUTES.ProductRecommendation;

  const handleContentChange = (item: IContentItem | IOnboarding) => {
    setActiveContent(item);
  };

  useEffect(() => {
    if (ONBOARDING_DATA[0].content !== undefined) {
      setActiveContent(ONBOARDING_DATA[0].content[0]);
    }
  }, []);

  return (
    <Fragment>
      <OnboardingStepsV2
        activeContent={activeContent}
        activeSection={activeSection}
        handleContentChange={handleContentChange}
        RenderContent={({ handleNextStep }) => {
          return (
            <View style={{ ...flexRow, ...fullHW }}>
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
