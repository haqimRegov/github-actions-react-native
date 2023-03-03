import { CommonActions, useNavigation } from "@react-navigation/native";
import cloneDeep from "lodash.clonedeep";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { BrowserWebView, CustomToast } from "../../components";
import { StepperBar } from "../../components/Steps/StepperBar";
import { Language } from "../../constants";
import { NEW_SALES_KEYS, NEW_SALES_ROUTES } from "../../constants/routes/new-sales";
import { DICTIONARY_LINK_AIMS } from "../../data/dictionary";
import { NewSalesMapDispatchToProps, NewSalesMapStateToProps, NewSalesStoreProps } from "../../store/NewSales";
import { flexRow, fs14BoldGray6, fullHW } from "../../styles";
import { NewSalesContent } from "./Content";

const { NEW_SALES } = Language.PAGE;

const ACCOUNT_LIST: INewSales = {
  label: NEW_SALES.TITLE_ACCOUNT_SELECTION,
  route: NEW_SALES_KEYS.AccountList,
  key: NEW_SALES_KEYS.AccountList,
};

const NEW_SALES_DATA: INewSales[] = [
  {
    content: [
      {
        title: NEW_SALES.SUBTITLE_RISK_ASSESSMENT,
        route: NEW_SALES_ROUTES.RiskAssessment,
        key: NEW_SALES_ROUTES.RiskAssessment,
      },
    ],
    label: NEW_SALES.TITLE_SALES,
    key: NEW_SALES_KEYS.RiskSummary,
    route: NEW_SALES_ROUTES.RiskSummary,
  },
  {
    content: [
      {
        title: NEW_SALES.SUBTITLE_SELECTION,
        route: NEW_SALES_ROUTES.ProductsList,
        key: NEW_SALES_KEYS.ProductsList,
      },
      {
        title: NEW_SALES.SUBTITLE_CONFIRMATION,
        route: NEW_SALES_ROUTES.ProductsConfirmation,
        key: NEW_SALES_KEYS.ProductsConfirmation,
      },
    ],
    label: NEW_SALES.TITLE_PRODUCTS_AND_SERVICE,
    key: NEW_SALES_KEYS.Products,
  },
  {
    content: [
      { title: NEW_SALES.SUBTITLE_VERIFY_ID, route: NEW_SALES_ROUTES.IdentityVerification, key: NEW_SALES_KEYS.IdentityVerification },
      { title: NEW_SALES.SUBTITLE_ADDITIONAL_DETAILS, route: NEW_SALES_ROUTES.AdditionalDetails, key: NEW_SALES_KEYS.AdditionalDetails },
      { title: NEW_SALES.TITLE_SUMMARY, route: NEW_SALES_ROUTES.Summary, key: NEW_SALES_KEYS.Summary },
    ],
    label: NEW_SALES.TITLE_ACCOUNT_INFORMATION,
    key: NEW_SALES_KEYS.AccountInformation,
  },
  {
    content: [
      {
        title: NEW_SALES.SUBTITLE_ORDER_PREVIEW,
        route: NEW_SALES_ROUTES.OrderPreview,
        key: NEW_SALES_KEYS.OrderPreview,
      },
      {
        title: NEW_SALES.SUBTITLE_TERMS_CONDITIONS,
        route: NEW_SALES_ROUTES.TermsAndConditions,
        key: NEW_SALES_KEYS.TermsAndConditions,
      },
      { title: NEW_SALES.SUBTITLE_SIGNATURES, route: NEW_SALES_ROUTES.Signatures, key: NEW_SALES_KEYS.Signatures },
    ],
    label: NEW_SALES.TITLE_ACKNOWLEDGEMENT,
    key: NEW_SALES_KEYS.Acknowledgement,
  },
  {
    label: NEW_SALES.TITLE_PROOF_OF_PAYMENT,
    key: NEW_SALES_KEYS.Payment,
    route: NEW_SALES_KEYS.Payment,
  },
];

type NewSalesPageProps = NewSalesStoreProps;

export const NewSalesPageComponent: FunctionComponent<NewSalesPageProps> = (props: NewSalesPageProps) => {
  const {
    client,
    newSales,
    personalInfo,
    partialResetInvestors,
    resetAcknowledgement,
    resetClientDetails,
    resetForceUpdate,
    resetInvestors,
    resetNewSales,
    resetPersonalInfo,
    resetProducts,
    resetRiskAssessment,
    resetSelectedFund,
    resetTransactions,
    updateNewSalesFinishedSteps,
    resetNewSalesToast,
  } = props;
  const { accountDetails, disabledSteps, finishedSteps, toast, transactionType } = newSales;
  const { editMode } = personalInfo;
  const { isBankDetailsRequired } = accountDetails;
  const navigation = useNavigation<IStackNavigationProp>();

  const updatedNewSalesSteps = cloneDeep(NEW_SALES_DATA);

  // sales from quick actions
  if (client.isNewFundPurchase === true) {
    updatedNewSalesSteps.splice(0, 0, ACCOUNT_LIST);
  }

  // account opening
  if (newSales.accountDetails.accountNo === "" && client.isNewFundPurchase === false) {
    updatedNewSalesSteps[0] = {
      ...updatedNewSalesSteps[0],
      label: NEW_SALES.TITLE_ACCOUNT_OPENING,
    };
  }

  // remove account information section
  if ((client.isNewFundPurchase === true || newSales.accountDetails.accountNo !== "") && isBankDetailsRequired === false) {
    const checkIndex = client.isNewFundPurchase === true ? 3 : 2;
    updatedNewSalesSteps.splice(checkIndex, 1);
  }

  // remove identity verification
  if (isBankDetailsRequired === true && transactionType === "Sales") {
    const findAdditionalInfo = updatedNewSalesSteps.findIndex((step: INewSales) => step.key === NEW_SALES_ROUTES.AccountInformation);
    updatedNewSalesSteps[findAdditionalInfo].content?.splice(0, 1);
  }

  const findProducts = updatedNewSalesSteps.findIndex((step: INewSales) => step.key === NEW_SALES_ROUTES.Products);
  // rename products label
  if (newSales.accountDetails.accountNo !== "" && client.isNewFundPurchase === false && findProducts !== -1) {
    updatedNewSalesSteps[findProducts].label = NEW_SALES.TITLE_PRODUCTS_AND_SERVICE_NEW;
  }

  // remove product list
  if (newSales.accountDetails.ampDetails !== undefined && findProducts !== -1) {
    const productsContent = updatedNewSalesSteps[findProducts].content!;
    productsContent.splice(0, 1);
    updatedNewSalesSteps[findProducts].content = productsContent;
  }

  const stepperBarRef = useRef<IStepperBarRef<TypeNewSalesKey>>();
  const [cancelNewSales, setCancelNewSales] = useState<boolean>(false);
  const [aimsOpen, setAimsOpen] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<INewSalesContentItem | INewSales | undefined>(updatedNewSalesSteps[0]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [cancelBackToInvestor, setCancelBackToInvestor] = useState<boolean>(false);

  const handleNextStep = (route: TypeNewSalesRoute) => {
    if (stepperBarRef.current !== null && stepperBarRef.current !== undefined) {
      stepperBarRef.current.handleNextStep(route);
    }
  };

  const handleContentChange = (item: INewSalesContentItem | INewSales) => {
    setActiveContent(item);
  };

  const handleCancelNewSales = (backToInvestor?: boolean) => {
    if (backToInvestor !== undefined) {
      setCancelBackToInvestor(backToInvestor);
    }
    setCancelNewSales(!cancelNewSales);
  };

  const handleCloseWebView = () => {
    setAimsOpen(false);
  };

  const handleResetNewSales = () => {
    setCancelNewSales(false);
    resetAcknowledgement();
    resetClientDetails();
    if (cancelBackToInvestor === true) {
      partialResetInvestors();
    } else {
      resetInvestors();
    }
    resetPersonalInfo();
    resetRiskAssessment();
    resetSelectedFund();
    resetProducts();
    resetNewSales();
    resetForceUpdate();
    resetTransactions();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      }),
    );
  };
  const typedActiveContent: INewSales = { ...activeContent } as INewSales;
  let activeContentRoute: TypeNewSalesRoute = "RiskSummary";
  if (typedActiveContent.route !== undefined) {
    activeContentRoute = typedActiveContent.route;
  } else if (typedActiveContent.route === undefined && typedActiveContent.content !== undefined) {
    activeContentRoute = typedActiveContent.content[0].route;
  }

  const initialRoute = client.isNewFundPurchase === true ? NEW_SALES_ROUTES.AccountList : NEW_SALES_ROUTES.RiskSummary;

  return (
    <View style={{ ...flexRow, ...fullHW }}>
      {aimsOpen === false ? (
        <Fragment>
          <StepperBar<TypeNewSalesKey>
            activeContent={activeContent}
            activeSection={activeSection}
            activeStepHeaderTextStyle={activeContent !== undefined && activeContent.route === "RiskSummary" ? fs14BoldGray6 : {}}
            disabledSteps={disabledSteps}
            editMode={editMode}
            finishedSteps={finishedSteps}
            handleContentChange={handleContentChange}
            handleBackToDashboard={handleCancelNewSales}
            ref={stepperBarRef}
            setActiveContent={setActiveContent}
            setActiveSection={setActiveSection}
            setFinishedStep={updateNewSalesFinishedSteps}
            steps={updatedNewSalesSteps}
          />
          <NewSalesContent
            aimsOpen={aimsOpen}
            handleCancelNewSales={handleCancelNewSales}
            handleResetNewSales={handleResetNewSales}
            cancelNewSales={cancelNewSales}
            handleNextStep={handleNextStep}
            navigation={navigation}
            route={activeContent !== undefined ? activeContentRoute : initialRoute}
            setAimsOpen={setAimsOpen}
          />
        </Fragment>
      ) : (
        <BrowserWebView baseUrl={DICTIONARY_LINK_AIMS} handleClose={handleCloseWebView} />
      )}
      <CustomToast deleteText={toast} parentVisible={toast !== undefined} setParentVisible={resetNewSalesToast} />
    </View>
  );
};

export const NewSalesPage = connect(NewSalesMapStateToProps, NewSalesMapDispatchToProps)(NewSalesPageComponent);
