import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

import { BottomFixedDetails, SafeAreaPage } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { SAMPLE_PRODUCTS } from "../../../mocks";
import { flexChild, flexCol } from "../../../styles";
import { IdentityConfirmation } from "../IdentityVerification/IdentityConfirmation";
import { ProductConfirmation } from "./Confirmation";
import { ProductList } from "./ProductList";

const { PRODUCT_CONFIRMATION } = Language.PAGE;

interface ProductsProps {
  handleNextStep: (route: string) => void;
}

export const Products: FunctionComponent<ProductsProps> = ({ handleNextStep }: ProductsProps) => {
  const [page, setPage] = useState<number>(0);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);

  const [productList, setProductList] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct[]>([]);

  const amount = selectedProduct.length * 1000;
  const LABEL_FUND = selectedProduct.length === 1 ? PRODUCT_CONFIRMATION.LABEL_FUND_SELECTION : PRODUCT_CONFIRMATION.LABEL_FUNDS_SELECTION;

  const handleGoBack = () => {
    setPage(0);
  };

  const handleStartInvesting = () => {
    setPage(1);
  };

  const handleCancel = () => {
    return page === 1 ? handleGoBack() : setSelectedProduct([]);
  };

  const handleConfirmIdentity = () => {
    handleNextStep(ONBOARDING_ROUTES.IdentityVerification);
  };

  let screen = {
    content: <ProductList productList={productList} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />,
    onPressSubmit: handleStartInvesting,
    labelSubmit: PRODUCT_CONFIRMATION.BUTTON_START_INVESTING,
  };

  if (page === 1) {
    screen = {
      ...screen,
      content: (
        <ProductConfirmation
          selectedProduct={selectedProduct}
          setFixedBottomShow={setFixedBottomShow}
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
        />
      ),
      onPressSubmit: handleConfirmIdentity,
      labelSubmit: PRODUCT_CONFIRMATION.BUTTON_CONFIRM,
    };
  }

  if (page === 2) {
    screen = {
      ...screen,
      content: <IdentityConfirmation handleNextStep={handleNextStep} />,
      onPressSubmit: handleConfirmIdentity,
    };
  }

  useEffect(() => {
    // TODO integration
    setProductList(SAMPLE_PRODUCTS);
  }, []);

  return (
    <SafeAreaPage>
      <View style={flexChild}>
        {screen.content}
        {fixedBottomShow === true && selectedProduct.length !== 0 ? (
          <View style={flexCol}>
            <BottomFixedDetails
              amount={amount.toString()}
              cancelOnPress={handleCancel}
              fundAmountText={PRODUCT_CONFIRMATION.LABEL_FUND_SELECTION_AMOUNT}
              fundSelectionText={LABEL_FUND}
              labelCancel={PRODUCT_CONFIRMATION.BUTTON_CANCEL}
              labelSubmit={screen.labelSubmit}
              numberOfFunds={selectedProduct.length}
              submitOnPress={screen.onPressSubmit}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaPage>
  );
};
