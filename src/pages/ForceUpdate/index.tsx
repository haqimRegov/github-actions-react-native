import { CommonActions } from "@react-navigation/native";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";

import { ForceUpdateSteps } from "../../components";
import { FORCE_UPDATE_KEYS, FORCE_UPDATE_ROUTES, Language } from "../../constants";
import { ForceUpdateMapDispatchToProps, ForceUpdateMapStateToProps, ForceUpdateStoreProps } from "../../store/ForceUpdate";
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
    disabledSteps,
    finishedSteps,
    navigation,
    resetAcknowledgement,
    resetClientDetails,
    resetForceUpdate,
    resetPersonalInfo,
    resetRiskAssessment,
    updateFUFinishedSteps,
  } = props;

  const [cancelForceUpdate, setCancelForceUpdate] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<IForceUpdateContentItem | IForceUpdate | undefined>(FORCE_UPDATE_DATA[0]);
  const [activeSection, setActiveSection] = useState<number>(0);

  const findRiskAssessment = FORCE_UPDATE_DATA.findIndex((step: IForceUpdate) => step.route === FORCE_UPDATE_ROUTES.RiskAssessment);

  if (accountHolder === "Principal" && findRiskAssessment === -1) {
    FORCE_UPDATE_DATA.splice(1, 0, RISK_ASSESSMENT);
  }

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
    resetPersonalInfo();
    resetRiskAssessment();
    resetForceUpdate();
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

  // TODO scroll position resetting when back to dashboard

  return (
    <Fragment>
      <ForceUpdateSteps
        activeContent={activeContent}
        activeSection={activeSection}
        disabledSteps={disabledSteps}
        finishedSteps={finishedSteps}
        handleContentChange={handleContentChange}
        handleBackToDashboard={handleCancelForceUpdate}
        RenderContent={({ handleNextStep }) => {
          return (
            <ForceUpdateContent
              handleCancelForceUpdate={handleCancelForceUpdate}
              handleResetForceUpdate={handleResetForceUpdate}
              cancelForceUpdate={cancelForceUpdate}
              handleNextStep={handleNextStep}
              navigation={navigation}
              route={activeContent !== undefined ? activeContent.route! : FORCE_UPDATE_ROUTES.Contact}
            />
          );
        }}
        setActiveContent={setActiveContent}
        setActiveSection={setActiveSection}
        setFinishedStep={updateFUFinishedSteps}
        steps={FORCE_UPDATE_DATA}
      />
    </Fragment>
  );
};

export const ForceUpdatePage = connect(ForceUpdateMapStateToProps, ForceUpdateMapDispatchToProps)(ForceUpdatePageComponent);
