import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { BottomFixedDetails, SafeAreaPage } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { SAMPLE_PRODUCTS_1 } from "../../../mocks";
import { SelectedFundMapDispatchToProps, SelectedFundMapStateToProps, SelectedFundStoreProps } from "../../../store";
import { flexChild, flexCol } from "../../../styles";
import { ProductConfirmation } from "./Confirmation";
import { ProductList } from "./ProductList";

const { PRODUCT_CONFIRMATION } = Language.PAGE;

interface ProductsProps extends SelectedFundStoreProps {
  handleNextStep: (route: TypeOnboardingRoute) => void;
}

export const ProductComponent: FunctionComponent<ProductsProps> = ({ handleNextStep, selectedFunds, addSelectedFund }: ProductsProps) => {
  const [page, setPage] = useState<number>(0);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);

  const [productList, setProductList] = useState<IFund[]>([]);

  const totalMinimumAmount: number =
    selectedFunds.length !== 0
      ? selectedFunds
          .map((product: IFund) => product.newSalesAmount.cash?.minimum!)
          .reduce((totalAmount: number, currentAmount: number) => totalAmount + currentAmount)
      : 0;

  const LABEL_FUND = selectedFunds.length === 1 ? PRODUCT_CONFIRMATION.LABEL_FUND_SELECTION : PRODUCT_CONFIRMATION.LABEL_FUNDS_SELECTION;

  const handleGoBack = () => {
    setPage(0);
  };

  const handleStartInvesting = () => {
    setPage(1);
  };

  const handleCancel = () => {
    return page === 1 ? handleGoBack() : addSelectedFund([]);
  };

  const handleConfirmIdentity = () => {
    handleNextStep(ONBOARDING_ROUTES.IdentityVerification);
  };

  let screen = {
    content: <ProductList productList={productList} selectedFunds={selectedFunds} setSelectedFunds={addSelectedFund} />,
    onPressSubmit: handleStartInvesting,
    labelSubmit: PRODUCT_CONFIRMATION.BUTTON_START_INVESTING,
  };

  if (page === 1) {
    screen = {
      ...screen,
      content: (
        <ProductConfirmation
          selectedFunds={selectedFunds}
          setFixedBottomShow={setFixedBottomShow}
          setPage={setPage}
          setSelectedFunds={addSelectedFund}
        />
      ),
      onPressSubmit: handleConfirmIdentity,
      labelSubmit: PRODUCT_CONFIRMATION.BUTTON_CONFIRM,
    };
  }

  useEffect(() => {
    // TODO integration
    setProductList(SAMPLE_PRODUCTS_1);
  }, []);

  return (
    <SafeAreaPage>
      <View style={flexChild}>
        {screen.content}
        {fixedBottomShow === true && selectedFunds.length !== 0 ? (
          <View style={flexCol}>
            <BottomFixedDetails
              amount={totalMinimumAmount.toString()}
              cancelOnPress={handleCancel}
              fundAmountText={PRODUCT_CONFIRMATION.LABEL_FUND_SELECTION_AMOUNT}
              fundSelectionText={LABEL_FUND}
              labelCancel={PRODUCT_CONFIRMATION.BUTTON_CANCEL}
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
