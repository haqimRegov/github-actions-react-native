import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { DICTIONARY_EPF_AGE } from "../../../data/dictionary";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { ProductDetails, ProductsBanner, ProductsPrompt } from "../../../templates";
import { ProductConfirmation } from "./Confirmation";
import { ProductList } from "./ProductList";

const { INVESTMENT, PRODUCT_LIST } = Language.PAGE;

interface ProductsProps extends ProductsStoreProps, OnboardingContentProps {}

export const ProductComponent: FunctionComponent<ProductsProps> = ({
  accountType,
  addInvestmentDetails,
  addPersonalInfo,
  addSelectedFund,
  addViewFund,
  details,
  global,
  handleNextStep,
  investmentDetails,
  onboarding,
  personalInfo,
  resetProducts,
  resetSelectedFund,
  selectedFunds,
  updateOnboarding,
  updateOutsideRisk,
  viewFund,
}: ProductsProps) => {
  const { disabledSteps, finishedSteps, riskInfo } = onboarding;
  const { agent, isMultiUtmc } = global;
  const { joint } = personalInfo;
  const jointDOB = joint?.personalDetails?.dateOfBirth;
  const [page, setPage] = useState<number>(0);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [prompt, setPrompt] = useState<"risk" | "cancel" | undefined>(undefined);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState<boolean>(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const principalClientAge = moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "months");
  const withEpf = accountType === "Individual" && principalClientAge < DICTIONARY_EPF_AGE;

  const handleBackToAssessment = () => {
    setPrompt(undefined);
    handleNextStep("RiskSummary");
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
    if (riskInfo.appetite.toLowerCase() === "medium") {
      return fundsRisk.includes("high");
    }
    if (riskInfo.appetite.toLowerCase() === "low") {
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

    const updatedDisabledSteps: TypeOnboardingKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeOnboardingKey[] = [...finishedSteps];

    // add to disabledSteps
    // currently, whenever they confirm their investment again, they will be forced to go through each Personal Information step, we also disabled PersonalInfoSummary
    if (updatedDisabledSteps.includes("PersonalInfoSummary") === false) {
      updatedDisabledSteps.push("PersonalInfoSummary");
    }

    // add to finishedSteps
    if (updatedFinishedSteps.includes("Products") === false) {
      updatedFinishedSteps.push("Products");
    }

    // remove from disabledSteps
    const findProducts = updatedDisabledSteps.indexOf("Products");
    if (findProducts !== -1) {
      updatedDisabledSteps.splice(findProducts, 1);
    }

    // remove from disabledSteps (next step)
    const findPersonalInfo = updatedDisabledSteps.indexOf("PersonalInformation");
    if (findPersonalInfo !== -1) {
      updatedDisabledSteps.splice(findPersonalInfo, 1);
    }

    const checkJoint =
      accountType === "Joint" && moment().diff(moment(jointDOB), "years") < 18
        ? {
            ...joint,
            employmentDetails: {
              ...joint?.employmentDetails,
              isEnabled: false,
            },
          }
        : { ...joint };

    addPersonalInfo({
      ...personalInfo,
      ...epfObject,
      principal: {
        ...personalInfo.principal,
        employmentDetails: { ...personalInfo.principal?.employmentDetails },
      },
      joint: checkJoint,
      ...epfObject,
      editPersonal: false,
      isAllEpf: allEpf,
      editMode: false,
    });

    updateOnboarding({ ...onboarding, finishedSteps: updatedFinishedSteps, disabledSteps: updatedDisabledSteps });

    // TODO dynamic change for EPF and Bank Currency
    const route: TypeOnboardingKey = finishedSteps.includes("EmailVerification") ? "IdentityVerification" : "EmailVerification";
    handleNextStep(route);
  };

  let screen = {
    content: (
      <ProductList
        handleCancelProducts={handleCancelProducts}
        scrollEnabled={scrollEnabled}
        setScrollEnabled={setScrollEnabled}
        withEpf={withEpf}
      />
    ),
    onPressCancel: handleCancelProducts,
    onPressSubmit: handleStartInvesting,
    labelCancel: PRODUCT_LIST.BUTTON_BACK,
    labelSubmit: PRODUCT_LIST.BUTTON_CONTINUE,
  };

  if (page === 1 && selectedFunds.length > 0) {
    screen = {
      ...screen,
      content: (
        <ProductConfirmation
          accountType={accountType!}
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
      content: (
        <ProductDetails
          fund={viewFund}
          handleBack={handleBack}
          selectedFunds={selectedFunds}
          setSelectedFund={addSelectedFund}
          setViewFund={addViewFund}
        />
      ),
      onPressSubmit: handleConfirmIdentity,
      labelSubmit: INVESTMENT.BUTTON_CONFIRM,
    };
  }

  const disableContinueInvestment = investmentDetails?.find(({ investment }) => {
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

  const disableContinue = page === 1 ? disableContinueInvestment !== undefined : selectedFunds.length === 0;

  const handleKeyboardShow = () => {
    setKeyboardIsShowing(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardIsShowing(false);
  };

  useEffect(() => {
    // this will not allow the user to press other steps when personal information is already filled up but they decided to deselect their funds
    // TODO remove product as finished step when they go back to risk assessment by pressing "Back"
    if (disabledSteps.includes("PersonalInformation") === false && selectedFunds.length === 0) {
      addPersonalInfo({ ...personalInfo, editMode: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFunds]);

  useEffect(() => {
    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
    return () => {
      keyboardWillHide.remove();
      keyboardWillShow.remove();
    };
  }, []);

  return (
    <Fragment>
      <View style={flexChild}>
        {screen.content}
        {fixedBottomShow === true && viewFund === undefined && keyboardIsShowing === false && scrollEnabled === true ? (
          <ProductsBanner
            cancelOnPress={screen.onPressCancel}
            continueDisabled={disableContinue}
            selectedFunds={selectedFunds}
            labelSubmit={screen.labelSubmit}
            label={page === 1 && selectedFunds.length > 0 ? INVESTMENT.LABEL_SUMMARY : undefined}
            submitOnPress={screen.onPressSubmit}
          />
        ) : null}
      </View>
      <ProductsPrompt handleCancel={handleCancel} handleContinue={handlePrompt} prompt={prompt} />
    </Fragment>
  );
};

export const Products = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductComponent);
