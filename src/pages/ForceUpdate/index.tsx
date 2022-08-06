import { CommonActions } from "@react-navigation/native";
import cloneDeep from "lodash.clonedeep";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { StepperBar } from "../../components";
import { FORCE_UPDATE_KEYS, FORCE_UPDATE_ROUTES, Language } from "../../constants";
import { ForceUpdateMapDispatchToProps, ForceUpdateMapStateToProps, ForceUpdateStoreProps } from "../../store/ForceUpdate";
import { flexRow, fullHW } from "../../styles";
import { ForceUpdateContent } from "./Content";

const { FORCE_UPDATE } = Language.PAGE;

const RISK_ASSESSMENT: IForceUpdate = {
  label: FORCE_UPDATE.TITLE_RISK_ASSESSMENT,
  route: FORCE_UPDATE_ROUTES.RiskAssessment,
  key: FORCE_UPDATE_KEYS.RiskAssessment,
};

const FORCE_UPDATE_DATA: IForceUpdate[] = [
  {
    content: [
      {
        title: FORCE_UPDATE.TITLE_CONTACT,
        route: FORCE_UPDATE_ROUTES.Contact,
        key: FORCE_UPDATE_KEYS.Contact,
      },
      {
        title: FORCE_UPDATE.TITLE_SUMMARY,
        route: FORCE_UPDATE_ROUTES.ContactSummary,
        key: FORCE_UPDATE_KEYS.ContactSummary,
      },
    ],
    label: FORCE_UPDATE.TITLE_INVESTOR_INFORMATION,
    key: FORCE_UPDATE_KEYS.InvestorInformation,
  },
  {
    content: [
      { title: FORCE_UPDATE.TITLE_FATCA_DECLARATION, route: FORCE_UPDATE_ROUTES.FATCADeclaration, key: FORCE_UPDATE_KEYS.FATCADeclaration },
      { title: FORCE_UPDATE.TITLE_CRS_DECLARATION, route: FORCE_UPDATE_ROUTES.CRSDeclaration, key: FORCE_UPDATE_KEYS.CRSDeclaration },
      { title: FORCE_UPDATE.TITLE_SUMMARY, route: FORCE_UPDATE_ROUTES.DeclarationSummary, key: FORCE_UPDATE_KEYS.DeclarationSummary },
    ],
    label: FORCE_UPDATE.TITLE_DECLARATIONS,
    key: FORCE_UPDATE_KEYS.Declarations,
  },
  {
    content: [
      {
        title: FORCE_UPDATE.TITLE_TERMS_CONDITIONS,
        route: FORCE_UPDATE_ROUTES.TermsAndConditions,
        key: FORCE_UPDATE_KEYS.TermsAndConditions,
      },
      { title: FORCE_UPDATE.TITLE_SIGNATURES, route: FORCE_UPDATE_ROUTES.Signatures, key: FORCE_UPDATE_KEYS.Signatures },
    ],

    label: FORCE_UPDATE.TITLE_ACKNOWLEDGEMENT,
    key: FORCE_UPDATE_KEYS.Acknowledgement,
  },
];

interface ForceUpdatePageProps extends ForceUpdateContentProps, ForceUpdateStoreProps {
  navigation: IStackNavigationProp;
}

export const ForceUpdatePageComponent: FunctionComponent<ForceUpdatePageProps> = (props: ForceUpdatePageProps) => {
  const {
    accountHolder,
    declarations,
    disabledSteps,
    finishedSteps,
    navigation,
    resetAcknowledgement,
    resetClientDetails,
    resetForceUpdate,
    resetPersonalInfo,
    resetRiskAssessment,
    resetTransactions,
    updateFUFinishedSteps,
  } = props;

  const stepperBarRef = useRef<IStepperBarRef<TypeForceUpdateKey>>();
  const [cancelForceUpdate, setCancelForceUpdate] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<IForceUpdateContentItem | IForceUpdate | undefined>(FORCE_UPDATE_DATA[0]);
  const [activeSection, setActiveSection] = useState<number>(0);

  const updatedNewSalesSteps = cloneDeep(FORCE_UPDATE_DATA);
  const findRiskAssessment = updatedNewSalesSteps.findIndex((step: IForceUpdate) => step.route === FORCE_UPDATE_ROUTES.RiskAssessment);

  if (accountHolder === "Principal" && findRiskAssessment === -1) {
    updatedNewSalesSteps.splice(1, 0, RISK_ASSESSMENT);
  }
  const findDeclarations = updatedNewSalesSteps.findIndex((step: IForceUpdate) => step.key === FORCE_UPDATE_KEYS.Declarations);
  if (findDeclarations !== -1) {
    if (declarations.length === 0) {
      updatedNewSalesSteps.splice(findDeclarations, 1);
    } else {
      const updatedContent = cloneDeep(updatedNewSalesSteps[findDeclarations].content!).filter(
        (eachContent: IForceUpdateContentItem) =>
          (eachContent.route === FORCE_UPDATE_ROUTES.FATCADeclaration && declarations.includes("fatca")) ||
          (eachContent.route === FORCE_UPDATE_ROUTES.CRSDeclaration && declarations.includes("crs")) ||
          eachContent.route === "DeclarationSummary",
      );
      updatedNewSalesSteps[findDeclarations].content = updatedContent;
    }
  }

  const handleNextStep = (route: TypeForceUpdateKey) => {
    if (stepperBarRef.current !== null && stepperBarRef.current !== undefined) {
      stepperBarRef!.current!.handleNextStep(route);
    }
  };

  const handleContentChange = (item: IForceUpdateContentItem | IForceUpdate) => {
    setActiveContent(item);
  };

  const handleCancelForceUpdate = () => {
    setCancelForceUpdate(!cancelForceUpdate);
  };

  const handleResetForceUpdate = () => {
    setCancelForceUpdate(false);
    resetAcknowledgement();
    resetClientDetails();
    resetForceUpdate();
    resetPersonalInfo();
    resetRiskAssessment();
    resetTransactions();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      }),
    );
  };

  useEffect(() => {
    if (FORCE_UPDATE_DATA[0].content !== undefined) {
      setActiveContent(FORCE_UPDATE_DATA[0].content[0]);
    }
  }, []);

  return (
    <View style={{ ...flexRow, ...fullHW }}>
      <StepperBar<TypeForceUpdateKey>
        activeContent={activeContent}
        activeSection={activeSection}
        disabledSteps={disabledSteps}
        finishedSteps={finishedSteps}
        handleContentChange={handleContentChange}
        handleBackToDashboard={handleCancelForceUpdate}
        ref={stepperBarRef}
        setActiveContent={setActiveContent}
        setActiveSection={setActiveSection}
        setFinishedStep={updateFUFinishedSteps}
        steps={updatedNewSalesSteps}
      />
      <ForceUpdateContent
        handleCancelForceUpdate={handleCancelForceUpdate}
        handleResetForceUpdate={handleResetForceUpdate}
        cancelForceUpdate={cancelForceUpdate}
        handleNextStep={handleNextStep}
        navigation={navigation}
        route={activeContent !== undefined ? activeContent.route! : FORCE_UPDATE_ROUTES.Contact}
      />
    </View>
  );
};

export const ForceUpdatePage = connect(ForceUpdateMapStateToProps, ForceUpdateMapDispatchToProps)(ForceUpdatePageComponent);
