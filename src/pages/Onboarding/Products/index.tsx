import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { connect } from "react-redux";

import { ConfirmationModal, SelectionBanner } from "../../../components";
import { Language, ONBOARDING_KEYS, ONBOARDING_ROUTES } from "../../../constants";
import { RNShareApi } from "../../../integrations";
import { SAMPLE_PDF_1 } from "../../../mocks";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../store";
import { flexChild, flexCol, fs16BoldBlack2, fs16SemiBoldBlack2 } from "../../../styles";
import { ProductConfirmation } from "./Confirmation";
import { ProductDetails } from "./Details";
import { ProductList } from "./ProductList";

const { INVESTMENT, ONBOARDING } = Language.PAGE;

interface ProductsProps extends ProductsStoreProps, OnboardingContentProps {}

export const ProductComponent: FunctionComponent<ProductsProps> = ({
  addInvestmentDetails,
  addPersonalInfo,
  addSelectedFund,
  addViewFund,
  finishedSteps,
  handleNextStep,
  investmentDetails,
  resetProducts,
  selectedFunds,
  updateFinishedSteps,
  viewFund,
}: ProductsProps) => {
  const [page, setPage] = useState<number>(0);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [cancelProduct, setCancelProduct] = useState<boolean>(false);
  const [keyboardIsShowing, setKeyboardIsShowing] = useState<boolean>(false);

  // const [productList, setProductList] = useState<IFund[]>([]);

  // const totalMinimumAmount: number =
  //   selectedFunds.length !== 0
  //     ? selectedFunds
  //         .map((product: IFund) => product.newSalesAmount.cash?.minimum!)
  //         .reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount)
  //     : 0;

  const handleBackToAssessment = () => {
    setCancelProduct(false);
    handleNextStep("RiskAssessment");
    resetProducts();
  };

  const handleCancel = () => {
    setCancelProduct(!cancelProduct);
  };

  const handleStartInvesting = () => {
    const initialStateArray: IProductSales[] = [];
    selectedFunds.map((item: IProduct) => {
      let newMasterClassList: IProductClasses = {};
      item.masterList.forEach((list: IProductMasterList) => {
        const classIndex = newMasterClassList !== {} ? Object.keys(newMasterClassList).indexOf(list.class) : -1;
        if (classIndex === -1) {
          newMasterClassList = { ...newMasterClassList, [list.class]: [list] };
        } else {
          newMasterClassList[list.class].push(list);
        }
      });
      const newState: IProductSales = {
        investment: {
          fundPaymentMethod: "Cash",
          investmentAmount: "",
          investmentSalesCharge: "",
          fundCurrency: item.masterList[0].currency,
          fundClass: item.masterList[0].class,
          scheduledInvestment: false,
        },
        fundDetails: { ...item },
        masterClassList: newMasterClassList,
      };

      return initialStateArray.push(newState);
    });
    addInvestmentDetails(initialStateArray);
    setPage(1);
  };

  const handleBackToListing = () => {
    return page === 1 ? setPage(0) : addSelectedFund([]);
  };

  const handleBack = () => {
    addViewFund(undefined);
  };

  const handleConfirmIdentity = () => {
    const isEpfInvestment = investmentDetails!.findIndex(({ investment }) => investment.fundPaymentMethod === "EPF");
    if (isEpfInvestment !== -1) {
      addPersonalInfo({ epfInvestment: true });
    }
    handleNextStep(ONBOARDING_ROUTES.EmailVerification);
    const updatedSteps: TypeOnboardingKey[] = [...finishedSteps];
    updatedSteps.push(ONBOARDING_KEYS.Products);
    updateFinishedSteps(updatedSteps);
  };

  const handleShareDocuments = async () => {
    // TODO integration
    const response = [SAMPLE_PDF_1, SAMPLE_PDF_1];
    const documents = response.map((file: FileBase64) => `data:${file.type};base64,${file.base64}`);
    const share = await RNShareApi.filesBase64(documents);
    if (share !== undefined) {
      setShareSuccess(true);
    }
  };

  let screen = {
    content: <ProductList handleCancelProducts={handleCancel} handleShareDocuments={handleShareDocuments} />,
    onPressCancel: handleCancel,
    onPressSubmit: handleStartInvesting,
    labelSubmit: INVESTMENT.BUTTON_START_INVESTING,
  };

  if (page === 1) {
    screen = {
      ...screen,
      content: (
        <ProductConfirmation
          investmentDetails={investmentDetails!}
          selectedFunds={selectedFunds}
          setFixedBottomShow={setFixedBottomShow}
          setInvestmentDetails={addInvestmentDetails}
          setPage={setPage}
          setSelectedFund={addSelectedFund}
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
    if (fund.fundType === "UT") {
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
      investment.scheduledAmountError !== undefined
    );
  });

  const handleKeyboardShow = () => {
    setKeyboardIsShowing(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardIsShowing(false);
  };

  useEffect(() => {
    Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
    Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
    return () => {
      Keyboard.removeListener("keyboardWillHide", handleKeyboardHide);
      Keyboard.removeListener("keyboardWillShow", handleKeyboardShow);
    };
  }, []);

  return (
    <Fragment>
      <View style={flexChild}>
        {screen.content}
        {fixedBottomShow === true && selectedFunds.length !== 0 && viewFund === undefined && keyboardIsShowing === false ? (
          <View style={flexCol}>
            <SelectionBanner
              bottomContent={<Text style={fs16SemiBoldBlack2}>{bannerText}</Text>}
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
        handleContinue={handleBackToAssessment}
        labelCancel={ONBOARDING.BUTTON_NO}
        labelContinue={ONBOARDING.BUTTON_YES}
        title={ONBOARDING.CANCEL_PRODUCT_TITLE}
        visible={cancelProduct}>
        <Text style={fs16BoldBlack2}>{ONBOARDING.CANCEL_PRODUCT_LABEL}</Text>
      </ConfirmationModal>
    </Fragment>
  );
};

export const Products = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductComponent);
