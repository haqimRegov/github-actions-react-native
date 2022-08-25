import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal, SelectionBanner } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_EPF_AGE } from "../../../data/dictionary";
import { GlobalStoreProps, ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../store";
import { flexChild, flexCol, fs16RegGray6, sh56 } from "../../../styles";
import { ProductConfirmation } from "./Confirmation";
import { ProductDetails } from "./Details";
import { ProductList } from "./ProductList";

const { INVESTMENT, PRODUCT_LIST } = Language.PAGE;

interface ProductsProps extends ProductsStoreProps, OnboardingContentProps, GlobalStoreProps {}

export const ProductComponent: FunctionComponent<ProductsProps> = ({
  accountType,
  addInvestmentDetails,
  addPersonalInfo,
  addSelectedFund,
  addViewFund,
  details,
  handleNextStep,
  investmentDetails,
  global,
  onboarding,
  resetProducts,
  resetSelectedFund,
  riskScore,
  selectedFunds,
  updateOnboarding,
  updateOutsideRisk,
  viewFund,
}: ProductsProps) => {
  const { disabledSteps, finishedSteps } = onboarding;
  const { agent, isMultiUtmc } = global;
  const [page, setPage] = useState<number>(0);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<"risk" | "cancel" | undefined>(undefined);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState<boolean>(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const principalClientAge = moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "months");
  const withEpf = accountType === "Individual" && principalClientAge < DICTIONARY_EPF_AGE;

  const handleBackToAssessment = () => {
    setPrompt(undefined);
    handleNextStep("RiskAssessment");
    resetProducts();
    resetSelectedFund();
  };

  const handleCancel = () => {
    setPrompt(undefined);
  };

  const handleInvest = () => {
    const initialStateArray: IProductSales[] = [];
    selectedFunds.forEach((item: IProduct) => {
      let newMasterClassList: IProductClasses = {};
      item.masterList.forEach((list: IProductMasterList) => {
        const dump = { class: list.class !== null ? list.class : "No Class", currency: list.currency };
        const findClassIndex = Object.keys(newMasterClassList).indexOf(dump.class);
        if (findClassIndex === -1) {
          newMasterClassList = { ...newMasterClassList, [dump.class]: [list] };
        } else {
          newMasterClassList[dump.class].push(list);
        }
        return dump;
      });

      const findExistingInvestment =
        investmentDetails !== undefined ? investmentDetails.findIndex((fund) => fund.fundDetails.fundCode === item.fundCode) : -1;
      const existingInvestmentDetails =
        investmentDetails !== undefined && findExistingInvestment !== -1 ? investmentDetails[findExistingInvestment].investment : {};

      const newState: IProductSales = {
        investment: {
          fundId: item.masterList[0].fundId,
          fundPaymentMethod: item.isEpfOnly === "Yes" ? "EPF" : "Cash",
          investmentAmount: "",
          investmentSalesCharge: "",
          fundCurrency: item.masterList[0].currency,
          fundClass: item.masterList[0].class !== null ? item.masterList[0].class : "No Class",
          scheduledInvestment: false,
          prsType: item.prsType,
          ...existingInvestmentDetails,
        },
        fundDetails: { ...item },
        masterClassList: newMasterClassList,
      };

      return initialStateArray.push(newState);
    });
    const kenangaArray = initialStateArray.filter(
      (eachElement: IProductSales) => eachElement.fundDetails.issuingHouse === "KENANGA INVESTORS BERHAD",
    );
    const sortedWithoutKenanga: IProductSales[] = initialStateArray
      .filter((eachInitialElement: IProductSales) => eachInitialElement.fundDetails.issuingHouse !== "KENANGA INVESTORS BERHAD")
      .sort((firstElement: IProductSales, secondElement: IProductSales) => {
        const { fundDetails: firstFundDetails } = firstElement;
        const { fundDetails: secondFundDetails } = secondElement;
        if (firstFundDetails.issuingHouse < secondFundDetails.issuingHouse) {
          return -1;
        }
        if (firstFundDetails.issuingHouse > secondFundDetails.issuingHouse) {
          return 1;
        }
        return 0;
      });
    const sortedInvestmentArray = [...kenangaArray, ...sortedWithoutKenanga];
    addInvestmentDetails(sortedInvestmentArray);
    setPage(1);
  };

  const handlePrompt = () => {
    if (prompt === "risk") {
      handleInvest();
      updateOutsideRisk(true);
      return setPrompt(undefined);
    }
    return handleBackToAssessment();
  };

  const checkOutsideRiskFactor = () => {
    const fundsRisk = selectedFunds.map((item) => (item.prsType === "prsDefault" ? "" : item.riskCategory.toLowerCase()));
    if (riskScore.appetite.toLowerCase() === "medium") {
      return fundsRisk.includes("high");
    }
    if (riskScore.appetite.toLowerCase() === "low") {
      return fundsRisk.includes("high") || fundsRisk.includes("medium");
    }

    return false;
  };

  const handleStartInvesting = () => {
    if (checkOutsideRiskFactor() === true) {
      return setPrompt("risk");
    }
    return handleInvest();
  };

  const handleBackToListing = () => {
    return page === 1 ? setPage(0) : addSelectedFund([]);
  };

  const handleCancelProducts = () => {
    setPrompt("cancel");
  };

  const handleBack = () => {
    addViewFund(undefined);
  };

  const handleConfirmIdentity = () => {
    const epfInvestments = investmentDetails!
      .filter(({ investment }) => investment.fundPaymentMethod === "EPF")
      .map((epfInvestment) => epfInvestment.fundDetails.isSyariah);
    const epfShariah = epfInvestments.includes("Yes");
    const allEpf = epfInvestments.length === investmentDetails!.length;
    const epfObject =
      epfInvestments.length > 0 ? { epfInvestment: true, epfShariah: epfShariah } : { epfInvestment: false, epfShariah: epfShariah };
    addPersonalInfo({ ...epfObject, editPersonal: false, isAllEpf: allEpf });
    const route: TypeOnboardingRoute = disabledSteps.includes("EmailVerification") ? "IdentityVerification" : "EmailVerification";
    handleNextStep(route);
    const updatedFinishedSteps: TypeOnboardingKey[] =
      epfInvestments.length === 0 || disabledSteps.includes("EmailVerification")
        ? ["RiskAssessment", "Products"]
        : [...finishedSteps, "Products"];
    const updatedDisabledSteps: TypeOnboardingKey[] =
      epfInvestments.length === 0 || disabledSteps.includes("EmailVerification")
        ? [
            "IdentityVerification",
            "PersonalDetails",
            "EmploymentDetails",
            "PersonalInfoSummary",
            "Declarations",
            "FATCADeclaration",
            "CRSDeclaration",
            "FEADeclaration",
            "DeclarationSummary",
            "OrderSummary",
            "Acknowledgement",
            "TermsAndConditions",
            "Signatures",
            "Payment",
          ]
        : [...disabledSteps];
    if (disabledSteps.includes("EmailVerification")) {
      updatedFinishedSteps.push("EmailVerification");
      updatedDisabledSteps.push("EmailVerification");
    }
    const findPersonalInfo = updatedDisabledSteps.indexOf("PersonalInformation");
    if (findPersonalInfo !== -1) {
      updatedDisabledSteps.splice(findPersonalInfo, 1);
    }
    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });
  };

  const handleShareDocuments = async () => {
    // TODO integration
    // const response = [];
    // const documents = response.map((file: FileBase64) => `data:${file.type};base64,${file.base64}`);
    // const share = await RNShareApi.filesBase64(documents);
    // if (share !== undefined) {
    //   setShareSuccess(true);
    // }
  };

  let screen = {
    content: (
      <ProductList
        handleCancelProducts={handleCancelProducts}
        handleShareDocuments={handleShareDocuments}
        scrollEnabled={scrollEnabled}
        setScrollEnabled={setScrollEnabled}
        withEpf={withEpf}
      />
    ),
    onPressCancel: handleCancelProducts,
    onPressSubmit: handleStartInvesting,
    labelSubmit: INVESTMENT.BUTTON_START_INVESTING,
  };

  if (page === 1 && selectedFunds.length > 0) {
    screen = {
      ...screen,
      content: (
        <ProductConfirmation
          accountType={accountType}
          agentCategory={agent!.category!}
          investmentDetails={investmentDetails!}
          multiUtmc={isMultiUtmc}
          selectedFunds={selectedFunds}
          setFixedBottomShow={setFixedBottomShow}
          setInvestmentDetails={addInvestmentDetails}
          setPage={setPage}
          setSelectedFund={addSelectedFund}
          withEpf={withEpf}
        />
      ),
      onPressCancel: handleBackToListing,
      onPressSubmit: handleConfirmIdentity,
      labelSubmit: INVESTMENT.BUTTON_CONFIRM,
    };
  }

  if (viewFund !== undefined) {
    screen = {
      ...screen,
      content: <ProductDetails fund={viewFund} handleBack={handleBack} handleShareDocuments={handleShareDocuments} />,
      onPressSubmit: handleConfirmIdentity,
      labelSubmit: INVESTMENT.BUTTON_CONFIRM,
    };
  }

  useEffect(() => {
    setShareSuccess(false);
  }, [shareSuccess]);

  let utCount = 0;
  let prsCount = 0;
  let ampCount = 0;
  selectedFunds.forEach((fund: IProduct) => {
    if (fund.fundType === "UT" || fund.fundType === "UTF" || fund.fundType === "WSF") {
      utCount += 1;
    } else if (fund.fundType === "PRS") {
      prsCount += 1;
    } else if (fund.fundType === "AMP") {
      ampCount += 1;
    }
  });

  const utSuffix = utCount > 0 && prsCount > 0 && ampCount > 0 ? ", " : "";
  const prsSuffix = utCount > 0 && prsCount > 0 && ampCount > 0 ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const prsPrefix = prsCount > 0 && utCount > 0 && ampCount === 0 ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const ampPrefix =
    (ampCount > 0 && utCount > 0 && prsCount === 0) || (ampCount > 0 && prsCount > 0 && utCount === 0) ? ` ${INVESTMENT.LABEL_AND} ` : "";
  const utLabel = utCount > 0 ? `${utCount} ${INVESTMENT.LABEL_UT}` : "";
  const prsLabel = prsCount > 0 ? `${prsCount} ${INVESTMENT.LABEL_PRS}` : "";
  const ampLabel = ampCount > 0 ? `${ampCount} ${INVESTMENT.LABEL_AMP}` : "";

  const bannerText = `${utLabel}${utSuffix}${prsPrefix}${prsLabel}${prsSuffix}${ampPrefix}${ampLabel} ${INVESTMENT.LABEL_SELECTED}`;

  const disableContinue = investmentDetails?.find(({ investment }) => {
    return (
      investment.investmentAmount === "" ||
      investment.investmentSalesCharge === "" ||
      (investment.scheduledInvestment === true && investment.scheduledInvestmentAmount === "") ||
      (investment.scheduledInvestment === true && investment.scheduledSalesCharge === "") ||
      investment.amountError !== undefined ||
      investment.scheduledAmountError !== undefined ||
      investment.investmentSalesChargeError !== undefined ||
      investment.scheduledSalesChargeError !== undefined
    );
  });

  const handleKeyboardShow = () => {
    setKeyboardIsShowing(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardIsShowing(false);
  };

  useEffect(() => {
    if (finishedSteps.includes("Products")) {
      setPage(1);
    }
    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
    return () => {
      keyboardWillHide.remove();
      keyboardWillShow.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const promptTitle = prompt === "cancel" ? PRODUCT_LIST.PROMPT_TITLE_CANCEL : PRODUCT_LIST.PROMPT_TITLE_RISK;
  const riskPromptText = prompt === "cancel" ? PRODUCT_LIST.PROMPT_LABEL_CANCEL : PRODUCT_LIST.PROMPT_LABEL_OUTSIDE;
  const promptText = prompt === "cancel" ? PRODUCT_LIST.PROMPT_LABEL_CANCEL : riskPromptText;

  return (
    <Fragment>
      <View style={flexChild}>
        {screen.content}
        {fixedBottomShow === true &&
        selectedFunds.length !== 0 &&
        viewFund === undefined &&
        keyboardIsShowing === false &&
        scrollEnabled === true ? (
          <View style={flexCol}>
            <SelectionBanner
              bottomContent={<Text style={fs16RegGray6}>{bannerText}</Text>}
              cancelOnPress={screen.onPressCancel}
              continueDisabled={disableContinue !== undefined && page === 1}
              labelCancel={INVESTMENT.BUTTON_CANCEL}
              labelSubmit={screen.labelSubmit}
              submitOnPress={screen.onPressSubmit}
              label={INVESTMENT.LABEL_FUND_SUMMARY}
            />
          </View>
        ) : null}
      </View>
      <ConfirmationModal
        handleCancel={handleCancel}
        handleContinue={handlePrompt}
        labelCancel={PRODUCT_LIST.BUTTON_NO}
        labelContinue={PRODUCT_LIST.BUTTON_YES}
        spaceToTitle={prompt === "cancel" ? undefined : sh56}
        title={promptTitle}
        visible={prompt !== undefined}>
        <Text style={fs16RegGray6}>{promptText}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};

export const Products = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductComponent);
