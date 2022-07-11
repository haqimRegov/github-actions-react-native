import React, { Fragment, FunctionComponent, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, RoundedButton, SafeAreaPage } from "../../../../components";
import { Language } from "../../../../constants";
import { productsInitialFilter, ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../store";
import { flexChild, flexGrow, px, sh152, sh16, sh56, sh810, sw24 } from "../../../../styles";
import { AMP, PRS, PRSDefault, UnitTrust } from "./ProductType";
import { ProductTabs } from "./Tabs";

const { PRODUCT_LIST } = Language.PAGE;

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
  handleCancelProducts,
  licenseType,
  productType,
  resetAMPFilter,
  resetPRSDefaultFilter,
  resetPRSFilter,
  resetUTFilter,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  updateProductType,
}: ProductListProps) => {
  const { accountNo, fundType, isEpf, riskScore } = accountDetails;
  // const [activeAccordion, setActiveAccordion] = useState<number[]>([]);

  // const handleShowPerformance = (item: ITableRowData) => {
  //   const newSections: number[] = [...activeAccordion];
  //   const sectionIndex = newSections.indexOf(item.index);
  //   if (sectionIndex > -1) {
  //     newSections.splice(sectionIndex, 1);
  //   } else {
  //     newSections.splice(0, 1, item.index);
  //   }
  //   setActiveAccordion(newSections);
  // };

  // const performanceColumn = {
  //   icon: {
  //     name: "caret-down",
  //   },
  //   key: [{ key: "performance" }],
  //   viewStyle: {
  //     width: 98,
  //   },
  //   title: PRODUCT_LIST.LABEL_COLUMN_PERFORMANCE,
  //   onPressItem: handleShowPerformance,
  //   withAccordion: true,
  // };
  // columns.push(performanceColumn);

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
          const epfFilterArray: string[] = accountDetails.isEpf === true ? ["Yes"] : ["No"];
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
        resetUTFilter();
    }
  };

  useEffect(() => {
    handleResetFilter();
  }, [productType]);

  useEffect(() => {
    if (accountNo !== "") {
      updateProductType(fundType);
    }
  }, []);

  return (
    <SafeAreaPage>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}>
        <View style={flexChild}>
          <View style={{ minHeight: sh810 }}>{content}</View>
          <Fragment>
            {selectedFunds.length !== 0 ? <CustomSpacer space={sh152} /> : null}
            {selectedFunds.length === 0 ? (
              <View style={px(sw24)}>
                <CustomSpacer space={sh16} />
                <RoundedButton onPress={handleCancelProducts} secondary={true} text={PRODUCT_LIST.BUTTON_CANCEL} />
                <CustomSpacer space={sh56} />
              </View>
            ) : null}
          </Fragment>
        </View>
      </ScrollView>
    </SafeAreaPage>
  );
};

export const ProductList = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductListComponent);
