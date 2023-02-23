import { CommonActions } from "@react-navigation/native";
import React, { FunctionComponent, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { StepperBar } from "../../components";
import { Language, ONBOARDING_KEYS, ONBOARDING_ROUTES } from "../../constants";
import { OnboardingMapDispatchToProps, OnboardingMapStateToProps, OnboardingStoreProps } from "../../store";
import { flexRow, fs14BoldGray6, fullHW } from "../../styles";
import { OnboardingContent } from "./Content";

const { ONBOARDING } = Language.PAGE;

const DECLARATION_CONTENT = [
  { title: ONBOARDING.TITLE_FATCA_DECLARATION, route: ONBOARDING_ROUTES.FATCADeclaration, key: ONBOARDING_KEYS.FATCADeclaration },
  { title: ONBOARDING.TITLE_CRS_DECLARATION, route: ONBOARDING_ROUTES.CRSDeclaration, key: ONBOARDING_KEYS.CRSDeclaration },
  { title: ONBOARDING.TITLE_SUMMARY, route: ONBOARDING_ROUTES.DeclarationSummary, key: ONBOARDING_KEYS.DeclarationSummary },
];

export const ONBOARDING_DATA: IOnboarding[] = [
  {
    content: [
      {
        title: ONBOARDING.TITLE_RISK_ASSESSMENT,
        route: ONBOARDING_ROUTES.RiskAssessment,
        key: ONBOARDING_KEYS.RiskAssessment,
      },
    ],

    label: ONBOARDING.TITLE_ACCOUNT_OPENING,
    route: ONBOARDING_ROUTES.RiskSummary,
    key: ONBOARDING_KEYS.RiskSummary,
  },
  {
    content: [
      {
        title: ONBOARDING.SUBTITLE_SELECTION,
        route: ONBOARDING_ROUTES.ProductsList,
        key: ONBOARDING_KEYS.ProductsList,
      },
      {
        title: ONBOARDING.SUBTITLE_CONFIRMATION,
        route: ONBOARDING_ROUTES.ProductsConfirmation,
        key: ONBOARDING_KEYS.ProductsConfirmation,
      },
    ],
    label: ONBOARDING.TITLE_PRODUCTS_AND_SERVICE,
    key: ONBOARDING_KEYS.Products,
  },
  {
    content: [
      {
        title: ONBOARDING.TITLE_EMAIL_VERIFICATION,
        route: ONBOARDING_ROUTES.EmailVerification,
        key: ONBOARDING_KEYS.EmailVerification,
      },
      {
        title: ONBOARDING.TITLE_IDENTIFICATION,
        route: ONBOARDING_ROUTES.IdentityVerification,
        key: ONBOARDING_KEYS.IdentityVerification,
      },
      { title: ONBOARDING.TITLE_CONTACT_DETAILS, route: ONBOARDING_ROUTES.ContactDetails, key: ONBOARDING_KEYS.ContactDetails },
      {
        title: ONBOARDING.TITLE_EMPLOYMENT_DETAILS,
        route: ONBOARDING_ROUTES.EmploymentDetails,
        key: ONBOARDING_KEYS.EmploymentDetails,
      },
      {
        title: ONBOARDING.TITLE_ADDITIONAL_DETAILS,
        route: ONBOARDING_ROUTES.AdditionalDetails,
        key: ONBOARDING_KEYS.AdditionalDetails,
      },
      { title: ONBOARDING.TITLE_SUMMARY, route: ONBOARDING_ROUTES.PersonalInfoSummary, key: ONBOARDING_KEYS.PersonalInfoSummary },
    ],

    label: ONBOARDING.TITLE_PERSONAL_INFORMATION,
    key: ONBOARDING_KEYS.PersonalInformation,
  },
  {
    content: DECLARATION_CONTENT,
    label: ONBOARDING.TITLE_DECLARATIONS,
    key: ONBOARDING_KEYS.Declarations,
  },
  {
    content: [
      { title: ONBOARDING.TITLE_ORDER_PREVIEW, route: ONBOARDING_ROUTES.OrderSummary, key: ONBOARDING_KEYS.OrderSummary },
      {
        title: ONBOARDING.TITLE_TERMS_CONDITIONS,
        route: ONBOARDING_ROUTES.TermsAndConditions,
        key: ONBOARDING_KEYS.TermsAndConditions,
      },
      { title: ONBOARDING.TITLE_SIGNATURES, route: ONBOARDING_ROUTES.Signatures, key: ONBOARDING_KEYS.Signatures },
    ],

    label: ONBOARDING.TITLE_ACKNOWLEDGEMENT,
    key: ONBOARDING_KEYS.Acknowledgement,
  },
  {
    label: ONBOARDING.TITLE_PAYMENT,
    route: ONBOARDING_ROUTES.Payment,
    key: ONBOARDING_KEYS.Payment,
  },
];

interface OnboardingPageProps extends OnboardingStoreProps {
  navigation: IStackNavigationProp;
}

const OnboardingPageComponent: FunctionComponent<OnboardingPageProps> = (props: OnboardingPageProps) => {
  const {
    disabledSteps,
    finishedSteps,
    navigation,
    personalInfo,
    resetAcknowledgement,
    resetClientDetails,
    resetOnboarding,
    resetPersonalInfo,
    resetProducts,
    resetRiskAssessment,
    resetSelectedFund,
    resetTransactions,
    updateFinishedSteps,
  } = props;

  const { editMode } = personalInfo;

  const stepperBarRef = useRef<IStepperBarRef<TypeOnboardingKey>>();
  const [cancelOnboarding, setCancelOnboarding] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<IOnboardingContentItem | IOnboarding | undefined>(ONBOARDING_DATA[0]);
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleNextStep = (route: TypeOnboardingKey) => {
    if (stepperBarRef.current !== null && stepperBarRef.current !== undefined) {
      stepperBarRef.current.handleNextStep(route);
    }
  };

  const handleContentChange = (item: IOnboardingContentItem | IOnboarding) => {
    setActiveContent(item);
  };

  const handleCancelOnboarding = () => {
    setCancelOnboarding(!cancelOnboarding);
  };

  const handleResetOnboarding = () => {
    setCancelOnboarding(false);
    resetAcknowledgement();
    resetClientDetails();
    resetPersonalInfo();
    resetRiskAssessment();
    resetSelectedFund();
    resetProducts();
    resetOnboarding();
    resetTransactions();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      }),
    );
  };

  return (
    <View style={{ ...flexRow, ...fullHW }}>
      <StepperBar<TypeOnboardingKey>
        activeContent={activeContent}
        activeSection={activeSection}
        activeStepHeaderTextStyle={activeContent !== undefined && activeContent.route === "RiskSummary" ? fs14BoldGray6 : {}}
        disabledSteps={disabledSteps}
        editMode={editMode}
        finishedSteps={finishedSteps}
        handleContentChange={handleContentChange}
        handleBackToDashboard={handleCancelOnboarding}
        ref={stepperBarRef}
        setActiveContent={setActiveContent}
        setActiveSection={setActiveSection}
        setFinishedStep={updateFinishedSteps}
        steps={ONBOARDING_DATA}
      />
      <OnboardingContent
        handleCancelOnboarding={handleCancelOnboarding}
        handleResetOnboarding={handleResetOnboarding}
        cancelOnboarding={cancelOnboarding}
        handleNextStep={handleNextStep}
        navigation={navigation}
        route={activeContent !== undefined ? activeContent.route! : ONBOARDING_ROUTES.RiskSummary}
      />
    </View>
  );
};

export const OnboardingPage = connect(OnboardingMapStateToProps, OnboardingMapDispatchToProps)(OnboardingPageComponent);
