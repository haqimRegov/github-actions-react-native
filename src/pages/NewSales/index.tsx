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
  label: NEW_SALES.TITLE_ACCOUNT_LIST,
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
    label: NEW_SALES.TITLE_ACCOUNT_OPENING,
    route: NEW_SALES_ROUTES.RiskProfile,
    key: NEW_SALES_KEYS.RiskProfile,
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

  const findAccountList = NEW_SALES_DATA.findIndex((step: INewSales) => step.route === NEW_SALES_ROUTES.AccountList);
  const findAdditionalInfo = NEW_SALES_DATA.findIndex((step: INewSales) => step.key === NEW_SALES_ROUTES.AccountInformation);

  const updatedNewSalesSteps = cloneDeep(NEW_SALES_DATA);
  if (client.isNewFundPurchase === true && findAccountList === -1) {
    updatedNewSalesSteps.splice(0, 0, ACCOUNT_LIST);
  }
  if ((client.isNewFundPurchase === true || newSales.accountDetails.accountNo !== "") && findAdditionalInfo !== -1) {
    const checkIndex = client.isNewFundPurchase === true ? 3 : 2;
    updatedNewSalesSteps.splice(checkIndex, 1);
  }

  const stepperBarRef = useRef<IStepperBarRef<TypeNewSalesKey>>();
  const [unsavedPrompt, setUnsavedPrompt] = useState<boolean>(false);
  const [cancelNewSales, setCancelNewSales] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<INewSalesContentItem | INewSales | undefined>(updatedNewSalesSteps[0]);
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleNextStep = (route: TypeNewSalesRoute) => {
    if (stepperBarRef.current !== null && stepperBarRef.current !== undefined) {
      stepperBarRef!.current!.handleNextStep(route);
    }
  };

  const handleContentChange = (item: INewSalesContentItem | INewSales) => {
    setActiveContent(item);
  };

  const handleCancelNewSales = () => {
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
    const updatedFinishedSteps: TypeNewSalesKey[] = ["AccountList", "RiskProfile"];

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
    switch (item.key) {
      case "Products":
        setUnsavedPrompt(true);
        return false;
      default:
        return true;
    }
  };

  const handleResetNewSales = () => {
    setCancelNewSales(false);
    resetAcknowledgement();
    resetClientDetails();
    resetInvestors();
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

  return (
    <View style={{ ...flexRow, ...fullHW }}>
      <StepperBar<TypeNewSalesKey>
        activeContent={activeContent}
        activeSection={activeSection}
        activeStepHeaderTextStyle={activeContent !== undefined && activeContent.route === "RiskProfile" ? fs14BoldGray6 : {}}
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
        route={activeContent !== undefined ? activeContent.route! : NEW_SALES_ROUTES.RiskProfile}
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
