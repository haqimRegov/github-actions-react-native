import { CommonActions } from "@react-navigation/native";
import cloneDeep from "lodash.clonedeep";
import React, { FunctionComponent, useRef, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { CustomToast, PromptModal } from "../../components";
import { StepperBar } from "../../components/Steps/StepperBar";
import { Language } from "../../constants";
import { NEW_SALES_KEYS, NEW_SALES_ROUTES } from "../../constants/routes/new-sales";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY } from "../../data/dictionary";
import { NewSalesMapDispatchToProps, NewSalesMapStateToProps, NewSalesStoreProps } from "../../store/NewSales";
import { alignFlexStart, flexRow, fs14BoldGray6, fsAlignLeft, fullHW } from "../../styles";
import { NewSalesContent } from "./Content";

const { NEW_SALES, PERSONAL_DETAILS } = Language.PAGE;

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

interface NewSalesPageProps extends NewSalesContentProps, NewSalesStoreProps {
  navigation: IStackNavigationProp;
}

export const NewSalesPageComponent: FunctionComponent<NewSalesPageProps> = (props: NewSalesPageProps) => {
  const {
    addPersonalInfo,
    client,
    newSales,
    navigation,
    personalInfo,
    partialResetInvestors,
    resetAcknowledgement,
    resetClientDetails,
    resetInvestors,
    resetNewSales,
    resetPersonalInfo,
    resetProducts,
    resetRiskAssessment,
    resetSelectedFund,
    resetTransactions,
    riskAssessment,
    updateNewSales,
    updateNewSalesFinishedSteps,
    updateToastVisible,
  } = props;
  const { disabledSteps, finishedSteps, toast } = newSales;

  const findAdditionalInfo = NEW_SALES_DATA.findIndex((step: INewSales) => step.key === NEW_SALES_ROUTES.AccountInformation);
  const findProducts = NEW_SALES_DATA.findIndex((step: INewSales) => step.key === NEW_SALES_ROUTES.Products);

  const updatedNewSalesSteps = cloneDeep(NEW_SALES_DATA);
  if (client.isNewFundPurchase === true) {
    updatedNewSalesSteps.splice(0, 0, ACCOUNT_LIST);
  }
  if (newSales.accountDetails.accountNo === "" && client.isNewFundPurchase === false) {
    updatedNewSalesSteps[0] = {
      ...updatedNewSalesSteps[0],
      label: NEW_SALES.TITLE_ACCOUNT_OPENING,
    };
  }
  if (newSales.accountDetails.accountNo !== "" && client.isNewFundPurchase === false && findProducts !== -1) {
    updatedNewSalesSteps[findProducts].label = NEW_SALES.TITLE_PRODUCTS_AND_SERVICE_NEW;
  }

  if ((client.isNewFundPurchase === true || newSales.accountDetails.accountNo !== "") && findAdditionalInfo !== -1) {
    const checkIndex = client.isNewFundPurchase === true ? 3 : 2;
    updatedNewSalesSteps.splice(checkIndex, 1);
  }
  if (newSales.accountDetails.ampDetails !== undefined && findProducts !== -1) {
    const productsContent = updatedNewSalesSteps[findProducts].content!;
    productsContent.splice(0, 1);
    updatedNewSalesSteps[findProducts].content = productsContent;
  }

  const stepperBarRef = useRef<IStepperBarRef<TypeNewSalesKey>>();
  const [unsavedPrompt, setUnsavedPrompt] = useState<boolean>(false);
  const [cancelNewSales, setCancelNewSales] = useState<boolean>(false);
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

  const handleOpenProducts = () => {
    setUnsavedPrompt(false);
    handleNextStep("ProductsConfirmation");
    addPersonalInfo({
      ...personalInfo,
      incomeDistribution: PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST,
      signatory: PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL,
      principal: {
        ...personalInfo.principal,
        bankSummary: {
          localBank: [
            {
              bankAccountName: "",
              bankAccountNumber: "",
              bankLocation: DICTIONARY_COUNTRIES[0].value,
              bankName: "",
              bankSwiftCode: "",
              currency: [DICTIONARY_CURRENCY[0].value],
              otherBankName: "",
            },
          ],
          foreignBank: [],
        },
        epfDetails: {
          epfAccountType: "",
          epfMemberNumber: "",
        },
        personalDetails: { ...personalInfo.principal!.personalDetails, relationship: "", otherRelationship: "" },
      },
    });

    // combined New Fund and AO
    const updatedFinishedSteps: TypeNewSalesKey[] = ["AccountList", "RiskSummary"];

    if (riskAssessment.isRiskUpdated === true) {
      updatedFinishedSteps.push("RiskAssessment");
    }

    // set to initial disabled steps without Products and ProductsList
    // not using reducer initial state because of redux mutating issue
    const updatedDisabledSteps: TypeNewSalesKey[] = [
      "RiskAssessment",
      // "Products",
      // "ProductsList",
      "ProductsConfirmation",
      "AccountInformation",
      "IdentityVerification",
      "AdditionalDetails",
      "Summary",
      "Acknowledgement",
      "OrderPreview",
      "TermsAndConditions",
      "Signatures",
      "Payment",
    ];

    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleContinue = () => {
    setUnsavedPrompt(false);
  };

  const handleCheckRoute = (item: INewSales, _section: number): boolean => {
    // TODO improvement to more dynamic step
    if (item.key === "Products" && finishedSteps.includes("Products")) {
      setUnsavedPrompt(true);
      return false;
    }
    return true;
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
      <StepperBar<TypeNewSalesKey>
        activeContent={activeContent}
        activeSection={activeSection}
        activeStepHeaderTextStyle={activeContent !== undefined && activeContent.route === "RiskSummary" ? fs14BoldGray6 : {}}
        disabledSteps={disabledSteps}
        finishedSteps={finishedSteps}
        handleCheckRoute={handleCheckRoute}
        handleContentChange={handleContentChange}
        handleBackToDashboard={handleCancelNewSales}
        ref={stepperBarRef}
        setActiveContent={setActiveContent}
        setActiveSection={setActiveSection}
        setFinishedStep={updateNewSalesFinishedSteps}
        steps={updatedNewSalesSteps}
      />
      <NewSalesContent
        handleCancelNewSales={handleCancelNewSales}
        handleResetNewSales={handleResetNewSales}
        cancelNewSales={cancelNewSales}
        handleNextStep={handleNextStep}
        navigation={navigation}
        route={activeContent !== undefined ? activeContentRoute : initialRoute}
      />
      <PromptModal
        backdropOpacity={0.4}
        contentStyle={alignFlexStart}
        handleCancel={handleOpenProducts}
        handleContinue={handleContinue}
        label={NEW_SALES.LABEL_PROMPT_TITLE}
        labelCancel={NEW_SALES.LABEL_PROMPT_CLOSE_WITHOUT_SAVING}
        labelContinue={NEW_SALES.LABEL_CONTINUE_EDITING}
        labelStyle={fsAlignLeft}
        title={NEW_SALES.LABEL_PROMPT_SUBTITLE}
        titleStyle={fsAlignLeft}
        visible={unsavedPrompt}
      />
      <CustomToast parentVisible={toast.toastVisible} setParentVisible={updateToastVisible} />
    </View>
  );
};

export const NewSalesPage = connect(NewSalesMapStateToProps, NewSalesMapDispatchToProps)(NewSalesPageComponent);
