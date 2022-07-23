import { CommonActions } from "@react-navigation/native";
import cloneDeep from "lodash.clonedeep";
import React, { Fragment, FunctionComponent, useState } from "react";
import { connect } from "react-redux";

import { CustomToast, PromptModal } from "../../components";
import { NewSalesSteps } from "../../components/Steps/NewSalesSteps";
import { Language } from "../../constants";
import { NEW_SALES_KEYS, NEW_SALES_ROUTES } from "../../constants/routes/new-sales";
import { NewSalesMapDispatchToProps, NewSalesMapStateToProps, NewSalesStoreProps } from "../../store/NewSales";
import { alignFlexStart, fs14BoldGray6, fsAlignLeft } from "../../styles";
import { NewSalesContent } from "./Content";

const { NEW_SALES } = Language.PAGE;

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

interface IItem {
  item: INewSales;
  section: number;
}

export const NewSalesPageComponent: FunctionComponent<NewSalesPageProps> = (props: NewSalesPageProps) => {
  const {
    client,
    newSales,
    navigation,
    resetAcknowledgement,
    resetClientDetails,
    resetInvestors,
    resetNewSales,
    resetPersonalInfo,
    resetProducts,
    resetRiskAssessment,
    resetSelectedFund,
    resetTransactions,
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

  const [promptModal, setPromptModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<IItem | undefined>(undefined);
  const [cancelNewSales, setCancelNewSales] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<INewSalesContentItem | INewSales | undefined>(updatedNewSalesSteps[0]);
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleContentChange = (item: INewSalesContentItem | INewSales) => {
    setActiveContent(item);
  };

  const handleCancelNewSales = () => {
    setCancelNewSales(!cancelNewSales);
  };

  const handleCancel = () => {
    setPromptModal(false);
    setActiveContent(currentItem?.item);
    setActiveSection(currentItem?.section!);
    setCurrentItem(undefined);
  };
  const handleContinue = () => {
    setPromptModal(false);
  };

  const handleCheckRoute = (item: INewSales, section: number): boolean => {
    // TODO improvement
    switch (item.route) {
      case "ProductsList":
        setCurrentItem({ item: item, section: section });
        setPromptModal(true);
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

  // TODO scroll position resetting when back to dashboard

  return (
    <Fragment>
      <NewSalesSteps
        activeContent={activeContent}
        activeSection={activeSection}
        activeStepHeaderTextStyle={activeContent !== undefined && activeContent.route === "RiskProfile" ? fs14BoldGray6 : {}}
        disabledSteps={disabledSteps}
        finishedSteps={finishedSteps}
        handleCheckRoute={handleCheckRoute}
        handleContentChange={handleContentChange}
        handleBackToDashboard={handleCancelNewSales}
        RenderContent={({ handleNextStep }) => {
          return (
            <NewSalesContent
              handleCancelNewSales={handleCancelNewSales}
              handleResetNewSales={handleResetNewSales}
              cancelNewSales={cancelNewSales}
              handleNextStep={handleNextStep}
              navigation={navigation}
              route={activeContent !== undefined ? activeContent.route! : NEW_SALES_ROUTES.RiskProfile}
            />
          );
        }}
        setActiveContent={setActiveContent}
        setActiveSection={setActiveSection}
        setFinishedStep={updateNewSalesFinishedSteps}
        steps={updatedNewSalesSteps}
      />
      <PromptModal
        backdropOpacity={0.4}
        contentStyle={alignFlexStart}
        handleCancel={handleCancel}
        handleContinue={handleContinue}
        label={NEW_SALES.LABEL_PROMPT_TITLE}
        labelCancel={NEW_SALES.LABEL_PROMPT_CLOSE_WITHOUT_SAVING}
        labelContinue={NEW_SALES.LABEL_CONTINUE_EDITING}
        labelStyle={fsAlignLeft}
        title={NEW_SALES.LABEL_PROMPT_SUBTITLE}
        titleStyle={fsAlignLeft}
        visible={promptModal}
      />
      <CustomToast parentVisible={toast.toastVisible} setParentVisible={updateToastVisible} />
    </Fragment>
  );
};

export const NewSalesPage = connect(NewSalesMapStateToProps, NewSalesMapDispatchToProps)(NewSalesPageComponent);
