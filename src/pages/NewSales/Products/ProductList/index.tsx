import React, { FunctionComponent, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, SafeAreaPage } from "../../../../components";
import { usePrevious } from "../../../../hooks";
import { productsInitialFilter, ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../store";
import { flexChild, flexGrow, sh104, sh810 } from "../../../../styles";
import { AMP, PRS, PRSDefault, UnitTrust } from "./ProductType";
import { ProductTabs } from "./Tabs";

interface ProductListProps extends ProductsStoreProps {
  handleCancelProducts: () => void;
  handleShareDocuments?: (fund: IProduct) => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  shareSuccess?: boolean;
}

const ProductListComponent: FunctionComponent<ProductListProps> = ({
  accountDetails,
  accountType,
  addUtFilters,
  licenseType,
  productType,
  resetAMPFilter,
  resetPRSDefaultFilter,
  resetPRSFilter,
  resetUTFilter,
  scrollEnabled,
  setScrollEnabled,
  updateProductType,
}: ProductListProps) => {
  const previousType = usePrevious<ProductType>(productType, true);
  const { accountNo } = accountDetails;

  const handleProductType = (type: ProductType) => {
    setScrollEnabled(true);
    updateProductType(type);
  };

  const tabsContent = (
    <ProductTabs accountType={accountType} licenseType={licenseType} productType={productType} setProductType={handleProductType} />
  );

  const productTypeProps = { scrollEnabled: scrollEnabled, setScrollEnabled: setScrollEnabled, tabsContent };
  let content: JSX.Element;
  if (productType === "prs") {
    content = <PRS {...productTypeProps} />;
  } else if (productType === "prsDefault") {
    content = <PRSDefault {...productTypeProps} />;
  } else if (productType === "amp") {
    content = <AMP {...productTypeProps} />;
  } else {
    content = <UnitTrust {...productTypeProps} />;
  }

  const handleResetFilter = () => {
    switch (productType) {
      case "ut":
        if (accountNo !== "") {
          const epfFilterArray: string[] = accountDetails.isEpf === true ? ["Yes"] : [];
          addUtFilters({ ...productsInitialFilter, epfApproved: epfFilterArray });
        } else {
          resetUTFilter();
        }
        break;
      case "prs":
        resetPRSFilter();
        break;
      case "prsDefault":
        resetPRSDefaultFilter();
        break;
      case "amp":
        resetAMPFilter();
        break;
      default:
    }
  };

  useEffect(() => {
    if (previousType !== productType) {
      handleResetFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productType]);

  return (
    <SafeAreaPage>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}>
        <View style={flexChild}>
          <View style={{ minHeight: sh810 }}>{content}</View>
          <CustomSpacer space={sh104} />
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
};

export const ProductList = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductListComponent);
