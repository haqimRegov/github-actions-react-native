import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";

import { BottomFixedDetails, SafeAreaPage } from "../../../components";
import { Language, ONBOARDING_ROUTES } from "../../../constants";
import { SAMPLE_PRODUCTS } from "../../../mocks";
import { flexChild, flexCol } from "../../../styles";
import { ProductConfirmation } from "./Confirmation";
import { ProductList } from "./ProductList";

const { PRODUCT_CONFIRMATION } = Language.PAGE;

interface ProductsProps {
  handleNextStep: (route: string) => void;
}

export const Products: FunctionComponent<ProductsProps> = ({ handleNextStep }: ProductsProps) => {
  const [productConfirmShow, setProductConfirmShow] = useState<boolean>(false);
  const [fixedBottomShow, setFixedBottomShow] = useState<boolean>(true);

  const [productList, setProductList] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct[]>([]);

  const handleCancel = () => {
    return productConfirmShow ? setProductConfirmShow(false) : setSelectedProduct([]);
  };

  const handleSubmit = () => {
    if (productConfirmShow === true) {
      handleNextStep(ONBOARDING_ROUTES.PersonalDetails);
    }
    setProductConfirmShow(true);
  };

  const amount = selectedProduct.length * 1000;
  const LABEL_FUND = selectedProduct.length === 1 ? PRODUCT_CONFIRMATION.LABEL_FUND_SELECTION : PRODUCT_CONFIRMATION.LABEL_FUNDS_SELECTION;

  useEffect(() => {
    // TODO integration
    setProductList(SAMPLE_PRODUCTS);
  }, []);

  return (
    <SafeAreaPage>
      <View style={flexChild}>
        {productConfirmShow === true && selectedProduct.length !== 0 ? (
          <ProductConfirmation
            selectedProduct={selectedProduct}
            setFixedBottomShow={setFixedBottomShow}
            setProductConfirmShow={setProductConfirmShow}
            setSelectedProduct={setSelectedProduct}
          />
        ) : (
          <ProductList productList={productList} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
        )}
        {fixedBottomShow === true && selectedProduct.length !== 0 ? (
          <View style={flexCol}>
            <BottomFixedDetails
              amount={amount.toString()}
              cancelOnPress={handleCancel}
              fundAmountText={PRODUCT_CONFIRMATION.LABEL_FUND_SELECTION_AMOUNT}
              fundSelectionText={LABEL_FUND}
              labelCancel={PRODUCT_CONFIRMATION.BUTTON_CANCEL}
              labelSubmit={PRODUCT_CONFIRMATION.BUTTON_START_INVESTING}
              numberOfFunds={selectedProduct.length}
              submitOnPress={handleSubmit}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaPage>
  );
};
