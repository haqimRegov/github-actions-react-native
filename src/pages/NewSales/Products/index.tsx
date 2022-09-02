import moment from "moment";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal, CustomSpacer, SelectionBanner } from "../../../components";
import { DEFAULT_DATE_FORMAT, Language, NunitoRegular } from "../../../constants";
import { DICTIONARY_EPF_AGE } from "../../../data/dictionary";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../store";
import { flexChild, flexCol, flexRow, fs16BoldGray6, fs16RegGray6, sh56, sw4 } from "../../../styles";
import { isArrayNotEmpty } from "../../../utils";
import { ProductDetails } from "./Details";
import { ProductList } from "./ProductList";

const { INVESTMENT, PRODUCT_LIST } = Language.PAGE;

interface ProductsProps extends ProductsStoreProps, NewSalesContentProps {
  handleNextStep: (step: TypeNewSalesRoute) => void;
  navigation: IStackNavigationProp;
  route: string;
}

export const ProductComponent: FunctionComponent<ProductsProps> = ({
  addInvestmentDetails,
  addSelectedFund,
  addViewFund,
  client,
  details,
  handleNextStep,
  global,
  investmentDetails,
  newSales,
  partialResetUTProducts,
  partialResetPRSDefaultProducts,
  partialResetPRSProducts,
  products,
  resetProducts,
  resetSelectedFund,
  riskAssessment,
  selectedFunds,
  updateNewSales,
  updateOutsideRisk,
  viewFund,
}: ProductsProps) => {
  const { accountType } = client;
  const { isMultiUtmc } = global;
  const { accountDetails, disabledSteps, riskInfo, transactionType } = newSales;
  const { accountNo, fundType, isEpf } = accountDetails;
  const { ut, prsDefault } = products;
  const [page] = useState<number>(0);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<"risk" | "cancel" | undefined>(undefined);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState<boolean>(false);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const principalClientAge = moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "months");
  const withEpf = accountType === "Individual" && principalClientAge < DICTIONARY_EPF_AGE;

  const handleProductReset = () => {
    switch (fundType) {
      case "ut": {
        const checkUtFilter = isEpf === true ? { epfApproved: ut.filters.epfApproved } : undefined;
        partialResetUTProducts(checkUtFilter);
        break;
      }
      case "prs":
        partialResetPRSProducts();
        break;
      case "prsDefault":
        partialResetPRSDefaultProducts({
          shariahApproved: prsDefault.filters.shariahApproved,
          conventional: prsDefault.filters.conventional,
        });
        break;
      case "amp":
        break;
      default: {
        const checkUt = isEpf === true ? { epfApproved: ut.filters.epfApproved } : undefined;
        partialResetUTProducts(checkUt);
        break;
      }
    }
  };

  const handleBackToAssessment = () => {
    const updatedFinishedSteps: TypeNewSalesKey[] = ["RiskSummary"];

    if (riskAssessment.isRiskUpdated === true) {
      updatedFinishedSteps.push("RiskAssessment");
    }

    // not using reducer initial state because of redux mutating issue
    const initialDisabledSteps: TypeNewSalesKey[] = [
      "RiskAssessment",
      "Products",
      "ProductsList",
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

    updateNewSales({ ...newSales, finishedSteps: updatedFinishedSteps, disabledSteps: initialDisabledSteps });

    setPrompt(undefined);
    handleNextStep("RiskSummary");
    if (accountNo === "") {
      resetProducts();
    } else {
      handleProductReset();
    }
    resetSelectedFund();
  };

  const handleCancel = () => {
    if (prompt === "risk") {
      const temp = [...selectedFunds];
      const updatedFunds: IProduct[] = [];
      temp.forEach((eachFund: IProduct) => {
        if (
          (riskInfo!.appetite.toLowerCase() === "medium" &&
            (eachFund.riskCategory.toLowerCase() === "low" || eachFund.riskCategory.toLowerCase() === "medium")) ||
          (riskInfo!.appetite.toLowerCase() === "low" && eachFund.riskCategory.toLowerCase() === "low")
        ) {
          updatedFunds.push(eachFund);
        }
      });
      addSelectedFund(updatedFunds);
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
        isNewFund: true,
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
    const findProductList = updatedDisabledSteps.indexOf("ProductsList");
    if (findProductList !== -1) {
      updatedDisabledSteps.splice(findProductList, 1);
    }

    updateNewSales({ ...newSales, disabledSteps: updatedDisabledSteps });
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
    if (riskInfo!.appetite.toLowerCase() === "medium") {
      return fundsRisk.includes("high");
    }
    if (riskInfo!.appetite.toLowerCase() === "low") {
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

  // const handleBackToListing = () => {
  //   return page === 1 ? setPage(0) : addSelectedFund([]);
  // };

  const handleCancelProducts = () => {
    setPrompt("cancel");
  };

  const handleBack = () => {
    addViewFund(undefined);
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

  const findSelectedEpfFund = selectedFunds.findIndex((eachFund) => eachFund.isEpf === "Yes");
  const selectedUtmc = findSelectedEpfFund !== -1 ? selectedFunds[findSelectedEpfFund].issuingHouse : undefined;
  const checkUtmc =
    isMultiUtmc === false &&
    transactionType === "Sales-NS" &&
    isArrayNotEmpty(selectedFunds) &&
    selectedUtmc !== undefined &&
    viewFund !== undefined
      ? viewFund.issuingHouse !== selectedUtmc
      : false;
  const selectViewFundDisabled = withEpf === false ? true : checkUtmc;

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
    continueDisabled: selectedFunds.length === 0,
    onPressCancel: handleCancelProducts,
    onPressSubmit: handleStartInvesting,
    labelSubmit: PRODUCT_LIST.BUTTON_START_INVESTING,
  };

  if (viewFund !== undefined) {
    screen = {
      ...screen,
      content: (
        <ProductDetails
          disabled={selectViewFundDisabled}
          fund={viewFund}
          handleBack={handleBack}
          handleShareDocuments={handleShareDocuments}
          selectedFunds={selectedFunds}
          setSelectedFund={addSelectedFund}
          setViewFund={addViewFund}
        />
      ),
      continueDisabled: continueDisabledInvestment !== undefined && page === 1,
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

  const bannerText =
    selectedFunds.length !== 0 ? `${utLabel}${utSuffix}${prsPrefix}${prsLabel}${prsSuffix}${ampPrefix}${ampLabel}` : INVESTMENT.LABEL_NONE;

  const handleKeyboardShow = () => {
    setKeyboardIsShowing(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardIsShowing(false);
  };

  useEffect(() => {
    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
    return () => {
      keyboardWillHide.remove();
      keyboardWillShow.remove();
    };
  }, []);
  const promptTitle = prompt === "cancel" ? PRODUCT_LIST.PROMPT_TITLE_CANCEL : PRODUCT_LIST.PROMPT_TITLE_RISK;
  const riskPromptText = prompt === "cancel" ? PRODUCT_LIST.PROMPT_LABEL_CANCEL : PRODUCT_LIST.PROMPT_LABEL_OUTSIDE_NEW;
  const promptText = prompt === "cancel" ? PRODUCT_LIST.PROMPT_LABEL_CANCEL : riskPromptText;
  const checkSelected = selectedFunds.length === 0 ? { fontFamily: NunitoRegular } : {};

  return (
    <Fragment>
      <View style={flexChild}>
        {screen.content}
        {viewFund === undefined && scrollEnabled === true && keyboardIsShowing === false ? (
          <View style={flexCol}>
            <SelectionBanner
              bottomContent={
                <View style={flexRow}>
                  <Text style={{ ...fs16BoldGray6, ...checkSelected }}>{bannerText}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text style={fs16RegGray6}>{INVESTMENT.LABEL_SELECTED}</Text>
                </View>
              }
              cancelOnPress={screen.onPressCancel}
              continueDisabled={screen.continueDisabled}
              labelCancel={INVESTMENT.BUTTON_CANCEL}
              labelSubmit={screen.labelSubmit}
              submitOnPress={screen.onPressSubmit}
              label={PRODUCT_LIST.LABEL_NEW_SALES_PRODUCT_SERVICE_SUMMARY}
            />
          </View>
        ) : null}
      </View>
      <ConfirmationModal
        handleCancel={handleCancel}
        handleContinue={handlePrompt}
        labelCancel={prompt === "risk" ? undefined : PRODUCT_LIST.BUTTON_NO}
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
