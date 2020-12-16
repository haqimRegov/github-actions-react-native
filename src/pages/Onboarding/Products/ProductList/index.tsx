import React, { Fragment, FunctionComponent, useState } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer, RoundedButton } from "../../../../components";
import { Language } from "../../../../constants";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../store";
import { flexChild, flexGrow, fsUppercase, px, py, sh152, sh56, sh810, sw136, sw24, sw323, sw56, sw88, sw96 } from "../../../../styles";
import { AMP, PRS, PRSDefault, UnitTrust } from "./ProductType";
import { ProductTabs } from "./Tabs";

const { PRODUCT_LIST } = Language.PAGE;

interface ProductListProps extends ProductsStoreProps {
  handleCancelProducts: () => void;
  handleShareDocuments?: (fund: IProduct) => void;
  shareSuccess?: boolean;

  // setSelectedFunds: (product: IProduct[]) => void;
}

const ProductListComponent: FunctionComponent<ProductListProps> = ({
  // handleShareDocuments,
  handleCancelProducts,
  selectedFunds,
  productType,
  updateProductType,
}: // shareSuccess,
// products,
ProductListProps) => {
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [filterVisible] = useState<boolean>(false);

  // const [productList, setProductList] = useState<ProductType>("ut");
  // const [, setShowBy] = useState<ProductListShowByType>();
  // const showByRef = useRef<ProductListShowByType>("recommended");
  // const currentProduct = products[productList];
  // const { filters, page, pages, search } = currentProduct;
  // const list = currentProduct[showByRef.current];

  const columns: ITableColumn[] = [
    {
      icon: {
        name: "caret-down",
      },
      key: [{ key: "fundAbbr", textStyle: fsUppercase }],
      viewStyle: {
        width: sw136,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_FUND_CODE,
    },
    {
      key: [{ key: "fundName", textStyle: fsUppercase }],
      icon: {
        name: "arrow-down",
      },
      viewStyle: {
        width: sw323,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_NAME,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: [{ key: "riskCategory" }],
      viewStyle: {
        width: sw96,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_RISK,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: [{ key: "isEpf" }],
      viewStyle: {
        width: sw56,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_EPF,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: [{ key: "isSyariah" }],
      viewStyle: {
        width: sw88,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_SHARIAH,
    },
  ];

  const handleShowPerformance = (item: ITableRowData) => {
    const newSections: number[] = [...activeAccordion];
    const sectionIndex = newSections.indexOf(item.index);
    if (sectionIndex > -1) {
      newSections.splice(sectionIndex, 1);
    } else {
      newSections.splice(0, 1, item.index);
    }
    setActiveAccordion(newSections);
  };

  const performanceColumn = {
    icon: {
      name: "caret-down",
    },
    key: [{ key: "performance" }],
    viewStyle: {
      width: 98,
    },
    title: PRODUCT_LIST.LABEL_COLUMN_PERFORMANCE,
    onPressItem: handleShowPerformance,
    withAccordion: true,
  };

  columns.push(performanceColumn);

  const scrollEnabled = !filterVisible || filterVisible;

  let content = <UnitTrust />;
  if (productType === "prs") {
    content = <PRS />;
  } else if (productType === "prsDefault") {
    content = <PRSDefault />;
  } else if (productType === "amp") {
    content = <AMP />;
  } else {
    content = <UnitTrust />;
  }

  return (
    <ScrollView
      contentContainerStyle={flexGrow}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}>
      <View style={flexChild}>
        <View style={{ minHeight: sh810 }}>
          <ProductTabs productType={productType} setProductType={updateProductType} />
          {content}
        </View>
        {filterVisible ? null : (
          <Fragment>
            {selectedFunds.length !== 0 ? <CustomSpacer space={sh152} /> : null}
            {selectedFunds.length === 0 ? (
              <View style={{ ...px(sw24), ...py(sh56) }}>
                <RoundedButton onPress={handleCancelProducts} secondary={true} text={PRODUCT_LIST.BUTTON_CANCEL} />
              </View>
            ) : null}
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
};

export const ProductList = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(ProductListComponent);
