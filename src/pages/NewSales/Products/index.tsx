import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { Language } from "../../../constants";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../store";
import { flexChild } from "../../../styles";
import { ProductDetails, ProductsBanner, ProductsPrompt } from "../../../templates";
import { isArrayNotEmpty } from "../../../utils";
import { ProductList } from "./ProductList";

const { PRODUCT_LIST } = Language.PAGE;

interface ProductsProps extends ProductsStoreProps, NewSalesContentProps {
  handleNextStep: (step: TypeNewSalesRoute) => void;
  navigation: IStackNavigationProp;
  route: string;
}

export const ProductComponent: FunctionComponent<ProductsProps> = ({
  addInvestmentDetails,
  addSelectedFund,
  addViewFund,
  handleNextStep,
  investmentDetails,
  newSales,
  selectedFunds,
  updateNewSales,
  updateOutsideRisk,
  viewFund,
}: ProductsProps) => {
  const { disabledSteps, finishedSteps, riskInfo } = newSales;

  const [page] = useState<number>(0);
  const [prompt, setPrompt] = useState<"risk" | "cancel" | undefined>(undefined);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState<boolean>(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const disabledFundIdRef = useRef<string[] | undefined>(undefined);

  const handleDisabledFundIdRef = (value: string[] | undefined) => {
    disabledFundIdRef.current = value;
  };

  // const handleProductReset = () => {
  //   switch (fundType) {
  //     case "ut": {
  //       const checkUtFilter = isEpf === true ? { epfApproved: ut.filters.epfApproved } : undefined;
  //       partialResetUTProducts(checkUtFilter);
  //       break;
  //     }
  //     case "prs":
  //       partialResetPRSProducts();
  //       break;
  //     case "prsDefault":
  //       partialResetPRSDefaultProducts({
  //         shariahApproved: prsDefault.filters.shariahApproved,
  //         conventional: prsDefault.filters.conventional,
  //       });
  //       break;
  //     case "amp":
  //       break;
  //     default: {
  //       const checkUt = isEpf === true ? { epfApproved: ut.filters.epfApproved } : undefined;
  //       partialResetUTProducts(checkUt);
  //       break;
  //     }
  //   }
  // };

  const handleBackToAssessment = () => {
    // const updatedFinishedSteps: TypeNewSalesKey[] = ["RiskSummary"];

    // if (isNewFundPurchase === true) {
    //   updatedFinishedSteps.push("AccountList");
    // }

    // if (riskAssessment.isRiskUpdated === true) {
    //   updatedFinishedSteps.push("RiskAssessment");
    // }

    // not using reducer initial state because of redux mutating issue
    // const initialDisabledSteps: TypeNewSalesKey[] = [
    //   "RiskAssessment",
    //   "Products",
    //   "ProductsList",
    //   "ProductsConfirmation",
    //   "AccountInformation",
    //   "IdentityVerification",
    //   "AdditionalDetails",
    //   "Summary",
    //   "Acknowledgement",
    //   "OrderPreview",
    //   "TermsAndConditions",
    //   "Signatures",
    //   "Payment",
    // ];

    // updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: initialDisabledSteps });

    // setPrompt(undefined);
    handleNextStep("RiskSummary");
    // if (accountNo === "") {
    //   resetProducts();
    // } else {
    //   handleProductReset();
    // }
    // resetSelectedFund();
  };

  const handleCancel = () => {
    if (prompt === "risk") {
      const temp = [...selectedFunds];
      const updatedFunds: IProduct[] = [];
      temp.forEach((eachFund: IProduct) => {
        if (
          (riskInfo.appetite.toLowerCase() === "medium" &&
            (eachFund.riskCategory.toLowerCase() === "low" || eachFund.riskCategory.toLowerCase() === "medium")) ||
          (riskInfo.appetite.toLowerCase() === "low" && eachFund.riskCategory.toLowerCase() === "low")
        ) {
          updatedFunds.push(eachFund);
        }
      });
      addSelectedFund(updatedFunds);
      const deletedFundCount = temp.length - updatedFunds.length;
      updateNewSales({
        ...newSales,
        toast: `${deletedFundCount} ${PRODUCT_LIST.LABEL_FUND_REMOVED}`,
      });
    }
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
          isTopup: false,
          ...existingInvestmentDetails,
        },
        fundDetails: { ...item },
        masterClassList: newMasterClassList,
        isNewFund:
          investmentDetails !== undefined && findExistingInvestment !== -1 ? investmentDetails[findExistingInvestment].isNewFund : true,
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

    const updatedDisabledSteps: TypeNewSalesKey[] = [...disabledSteps];
    const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];

    // add to finishedSteps
    if (updatedFinishedSteps.includes("ProductsList") === false) {
      updatedFinishedSteps.push("ProductsList");
    }

    // remove from disabledSteps
    const findConfirmation = updatedDisabledSteps.indexOf("ProductsConfirmation");
    if (findConfirmation !== -1) {
      updatedDisabledSteps.splice(findConfirmation, 1);
    }

    updateNewSales({ ...newSales, disabledSteps: updatedDisabledSteps, finishedSteps: updatedFinishedSteps });

    handleNextStep("ProductsConfirmation");
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

  const handleCancelProducts = () => {
    // setPrompt("cancel");
    handleBackToAssessment();
  };

  const handleBack = () => {
    addViewFund(undefined);
  };

  const continueDisabledInvestment = investmentDetails?.find(({ investment }) => {
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

  let screen = {
    content: (
      <ProductList
        handleCancelProducts={handleCancelProducts}
        handleDisabledFundIdRef={handleDisabledFundIdRef}
        scrollEnabled={scrollEnabled}
        setScrollEnabled={setScrollEnabled}
      />
    ),
    continueDisabled: selectedFunds.length === 0,
    onPressCancel: handleCancelProducts,
    onPressSubmit: handleStartInvesting,
    labelSubmit: PRODUCT_LIST.BUTTON_CONTINUE,
  };

  if (viewFund !== undefined) {
    screen = {
      ...screen,
      content: (
        <ProductDetails
          disabled={disabledFundIdRef.current !== undefined && disabledFundIdRef.current.includes(viewFund.fundId)}
          fund={viewFund}
          handleBack={handleBack}
          selectedFunds={selectedFunds}
          setSelectedFund={addSelectedFund}
          setViewFund={addViewFund}
        />
      ),
      continueDisabled: continueDisabledInvestment !== undefined && page === 1,
    };
  }

  const handleKeyboardShow = () => {
    setKeyboardIsShowing(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardIsShowing(false);
  };

  useEffect(() => {
    // remove "ProductList" from finishedSteps if no selected funds
    // TODO remove product as finished step when they go back to risk assessment by pressing "Back"
    if (finishedSteps.includes("ProductsList") === true && selectedFunds.length === 0) {
      const updatedFinishedSteps: TypeNewSalesKey[] = [...finishedSteps];

      // remove from finishedSteps
      const findProductList = updatedFinishedSteps.indexOf("ProductsList");
      if (findProductList !== -1) {
        updatedFinishedSteps.splice(findProductList, 1);
      }
      const findConfirmation = updatedFinishedSteps.indexOf("ProductsConfirmation");
      if (findConfirmation !== -1) {
        updatedFinishedSteps.splice(findConfirmation, 1);
      }

      updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps });
    }

    // wipe investment if selectedFunds is empty
    if (selectedFunds.length === 0 && isArrayNotEmpty(investmentDetails)) {
      addInvestmentDetails([]);
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
        {viewFund === undefined && scrollEnabled === true && keyboardIsShowing === false ? (
          <ProductsBanner
            cancelOnPress={screen.onPressCancel}
            continueDisabled={screen.continueDisabled}
            selectedFunds={selectedFunds}
            labelSubmit={screen.labelSubmit}
            submitOnPress={screen.onPressSubmit}
          />
        ) : null}
      </View>
      <ProductsPrompt handleCancel={handleCancel} handleContinue={handlePrompt} prompt={prompt} />
    </Fragment>
  );
};

export const Products = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductComponent);
