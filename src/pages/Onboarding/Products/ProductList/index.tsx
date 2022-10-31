import React, { FunctionComponent, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, SafeAreaPage } from "../../../../components";
import { usePrevious } from "../../../../hooks";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../store";
import { flexChild, flexGrow, sh104, sh810 } from "../../../../styles";
import { ProductTabs } from "../../../../templates";
import { AMP, PRS, PRSDefault, UnitTrust } from "./ProductType";

interface ProductListProps extends ProductsStoreProps {
  handleCancelProducts: () => void;
  handleShareDocuments?: (fund: IProduct) => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  shareSuccess?: boolean;
  withEpf: boolean;
}

const ProductListComponent: FunctionComponent<ProductListProps> = ({
  accountType,
  licenseType,
  productType,
  resetAMPFilter,
  resetPRSDefaultFilter,
  resetPRSFilter,
  resetUTFilter,
  scrollEnabled,
  setScrollEnabled,
  updateProductType,
  withEpf,
}: ProductListProps) => {
  const previousType = usePrevious<ProductType>(productType, true);
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
    content = <AMP withEpf={withEpf} {...productTypeProps} />;
  } else {
    content = <UnitTrust {...productTypeProps} />;
  }

  const handleResetFilter = () => {
    switch (productType) {
      case "ut":
        resetUTFilter();
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
