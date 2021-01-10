import { CommonActions } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";

import { OnboardingSteps } from "../../components";
import { Language, ONBOARDING_KEYS, ONBOARDING_ROUTES } from "../../constants";
import { OnboardingMapDispatchToProps, OnboardingMapStateToProps, OnboardingStoreProps } from "../../store";
import { OnboardingContent } from "./Content";

const { ONBOARDING } = Language.PAGE;

// TODO handle if FEA
const isFea = true;

const DECLARATION_CONTENT = [
  { title: ONBOARDING.TITLE_FATCA_DECLARATION, route: ONBOARDING_ROUTES.FATCADeclaration },
  { title: ONBOARDING.TITLE_CRS_DECLARATION, route: ONBOARDING_ROUTES.CRSDeclaration },
  { title: ONBOARDING.TITLE_SUMMARY, route: ONBOARDING_ROUTES.DeclarationSummary },
];

if (isFea === true) {
  DECLARATION_CONTENT.splice(2, 0, { title: ONBOARDING.TITLE_FEA_DECLARATION, route: ONBOARDING_ROUTES.FEADeclarations });
}

export const ONBOARDING_DATA: IOnboarding[] = [
  {
    key: ONBOARDING_KEYS.RiskAssessment,
    label: ONBOARDING.TITLE_RISK_ASSESSMENT,
    route: ONBOARDING_ROUTES.RiskAssessment,
  },
  {
    key: ONBOARDING_KEYS.Products,
    label: ONBOARDING.TITLE_PRODUCT_RECOMMENDATION,
    route: ONBOARDING_ROUTES.ProductRecommendation,
  },
  {
    content: [
      { title: ONBOARDING.TITLE_EMAIL_VERIFICATION, route: ONBOARDING_ROUTES.EmailVerification },
      { title: ONBOARDING.TITLE_ID_VERIFICATION, route: ONBOARDING_ROUTES.IdentityVerification },
      { title: ONBOARDING.TITLE_PERSONAL_DETAILS, route: ONBOARDING_ROUTES.PersonalDetails },
      { title: ONBOARDING.TITLE_EMPLOYMENT_DETAILS, route: ONBOARDING_ROUTES.EmploymentDetails },
      { title: ONBOARDING.TITLE_SUMMARY, route: ONBOARDING_ROUTES.PersonalInfoSummary },
    ],
    key: ONBOARDING_KEYS.PersonalInformation,
    label: ONBOARDING.TITLE_PERSONAL_INFORMATION,
  },
  {
    content: DECLARATION_CONTENT,
    key: ONBOARDING_KEYS.Declarations,
    label: ONBOARDING.TITLE_DECLARATIONS,
  },
  {
    content: [
      { title: ONBOARDING.TITLE_ORDER_SUMMARY, route: ONBOARDING_ROUTES.OrderSummary },
      { title: ONBOARDING.TITLE_TERMS_CONDITIONS, route: ONBOARDING_ROUTES.TermsAndConditions },
      { title: ONBOARDING.TITLE_SIGNATURES, route: ONBOARDING_ROUTES.Signatures },
    ],
    key: ONBOARDING_KEYS.Acknowledgement,
    label: ONBOARDING.TITLE_ACKNOWLEDGEMENT,
  },
  {
    key: ONBOARDING_KEYS.Payment,
    label: ONBOARDING.TITLE_PAYMENT,
    route: ONBOARDING_ROUTES.Payment,
  },
];

interface OnboardingPageProps extends OnboardingStoreProps {
  navigation: IStackNavigationProp;
}

const OnboardingPageComponent: FunctionComponent<OnboardingPageProps> = (props: OnboardingPageProps) => {
  const {
    finishedSteps,
    navigation,
    resetClientDetails,
    resetPersonalInfo,
    resetRiskAssessment,
    resetViewFund,
    resetSelectedFund,
    resetProducts,
    resetSteps,
    updateFinishedSteps,
  } = props;

  const [cancelOnboarding, setCancelOnboarding] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<IContentItem | IOnboarding | undefined>(ONBOARDING_DATA[0]);
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleContentChange = (item: IContentItem | IOnboarding) => {
    setActiveContent(item);
  };

  const handleCancelOnboarding = () => {
    setCancelOnboarding(!cancelOnboarding);
  };

  const handleResetOnboarding = () => {
    setCancelOnboarding(false);
    resetClientDetails();
    resetPersonalInfo();
    resetRiskAssessment();
    resetViewFund();
    resetSelectedFund();
    resetProducts();
    resetSteps();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      }),
    );
  };

  useEffect(() => {
    if (ONBOARDING_DATA[0].content !== undefined) {
      setActiveContent(ONBOARDING_DATA[0].content[0]);
    }
  }, []);

  // TODO scroll position reseting when back to dashboard

  return (
    <Fragment>
      <OnboardingSteps
        activeContent={activeContent}
        activeSection={activeSection}
        finishedSteps={finishedSteps}
        handleContentChange={handleContentChange}
        handleBackToDashboard={handleCancelOnboarding}
        RenderContent={({ handleNextStep }) => {
          return (
            <OnboardingContent
              handleCancelOnboarding={handleCancelOnboarding}
              handleResetOnboarding={handleResetOnboarding}
              cancelOnboarding={cancelOnboarding}
              handleNextStep={handleNextStep}
              navigation={navigation}
              route={activeContent !== undefined ? activeContent.route! : ONBOARDING_ROUTES.RiskAssessment}
            />
          );
        }}
        setActiveContent={setActiveContent}
        setActiveSection={setActiveSection}
        setFinishedStep={updateFinishedSteps}
        steps={ONBOARDING_DATA}
      />
    </Fragment>
  );
};

export const OnboardingPage = connect(OnboardingMapStateToProps, OnboardingMapDispatchToProps)(OnboardingPageComponent);
