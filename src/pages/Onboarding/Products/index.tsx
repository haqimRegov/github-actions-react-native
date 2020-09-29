import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { BottomFixedDetails, SafeAreaPage } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { RNShareApi } from "../../../integrations";
import { SAMPLE_PDF_1, SAMPLE_PRODUCTS_1 } from "../../../mocks";
import { SelectedFundMapDispatchToProps, SelectedFundMapStateToProps, SelectedFundStoreProps } from "../../../store";
import { flexChild, flexCol } from "../../../styles";
import { ProductConfirmation } from "./Confirmation";
import { ProductDetails } from "./Details";
import { ProductList } from "./ProductList";

const { INVESTMENT } = Language.PAGE;

interface ProductsProps extends SelectedFundStoreProps, OnboardingContentProps {}

export const ProductComponent: FunctionComponent<ProductsProps> = ({
  addFilters,
  addInvestmentDetails,
  addPersonalInfo,
  addSelectedFund,
  filters,
  finishedSteps,
  handleCancelOnboarding,
  handleNextStep,
  investmentDetails,
  selectedFunds,
  setFinishedSteps,
}: ProductsProps) => {
  const [page, setPage] = useState<number>(0);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [viewFund, setViewFund] = useState<IFund | undefined>(undefined);

  const [productList, setProductList] = useState<IFund[]>([]);

  const totalMinimumAmount: number =
    selectedFunds.length !== 0
      ? selectedFunds
          .map((product: IFund) => product.newSalesAmount.cash?.minimum!)
          .reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount)
      : 0;

  const LABEL_FUND = selectedFunds.length === 1 ? INVESTMENT.LABEL_FUND_SELECTION : INVESTMENT.LABEL_FUNDS_SELECTION;

  const handleStartInvesting = () => {
    const initialStateArray: IFundSales[] = [];
    selectedFunds.map((item: IFund) => {
      const newState: IFundSales = {
        fundPaymentMethod: "Cash",
        investmentAmount: `${item.newSalesAmount.cash?.minimum}`,
        salesCharge: item.salesCharge.cash?.minimum!,
        scheduledInvestment: false,
        fund: { ...item },
      };

      return initialStateArray.push(newState);
    });
    addInvestmentDetails(initialStateArray);
    setPage(1);
  };

  const handleCancel = () => {
    return page === 1 ? setPage(0) : addSelectedFund([]);
  };

  const handleBack = () => {
    setViewFund(undefined);
  };

  const handleConfirmIdentity = () => {
    const isEpfInvestment = investmentDetails!.findIndex((investment) => investment.fundPaymentMethod === "EPF");
    if (isEpfInvestment !== -1) {
      addPersonalInfo({ epfInvestment: true });
    }
    handleNextStep(ONBOARDING_ROUTES.EmailVerification);
    const updatedSteps: TypeOnboardingRoute[] = [...finishedSteps];
    updatedSteps.push(ONBOARDING_ROUTES.ProductRecommendation);
    setFinishedSteps(updatedSteps);
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
    content: (
      <ProductList
        handleCancelOnboarding={handleCancelOnboarding!}
        handleShareDocuments={handleShareDocuments}
        productList={productList}
        selectedFilter={filters}
        selectedFunds={selectedFunds}
        setSelectedFunds={addSelectedFund}
        setViewFund={setViewFund}
        shareSuccess={shareSuccess}
        setSelectedFilter={addFilters}
      />
    ),
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

  useEffect(() => {
    // TODO integration
    setProductList(SAMPLE_PRODUCTS_1);
  }, []);

  return (
    <SafeAreaPage>
      <View style={flexChild}>
        {screen.content}
        {fixedBottomShow === true && selectedFunds.length !== 0 && viewFund === undefined ? (
          <View style={flexCol}>
            <BottomFixedDetails
              amount={totalMinimumAmount.toString()}
              cancelOnPress={handleCancel}
              fundAmountText={INVESTMENT.LABEL_FUND_SELECTION_AMOUNT}
              fundSelectionText={LABEL_FUND}
              labelCancel={INVESTMENT.BUTTON_CANCEL}
              labelSubmit={screen.labelSubmit}
              numberOfFunds={selectedFunds.length}
              submitOnPress={screen.onPressSubmit}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaPage>
  );
};

export const Products = connect(SelectedFundMapStateToProps, SelectedFundMapDispatchToProps)(ProductComponent);
