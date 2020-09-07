import React, { Fragment, FunctionComponent, useState } from "react";
import { Alert, ScrollView, View, ViewStyle } from "react-native";

import { AdvanceTable, CustomFlexSpacer, CustomSpacer, Pagination, Tab } from "../../../../components";
import { Language } from "../../../../constants";
import {
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  sh15,
  sh152,
  sh153,
  sh16,
  sh32,
  sh40,
  shadow5,
  sw102,
  sw109,
  sw234,
  sw24,
  sw72,
  sw83,
  sw90,
} from "../../../../styles";
import { ProductGraph } from "./Graph";
import { ProductHeader } from "./Header";
import { ProductOptions } from "./Options";

const { PRODUCT_LIST } = Language.PAGE;

interface ProductListProps {
  handleShareDocuments: (fund: IFund) => void;
  productList: IFund[];
  selectedFunds: IFund[];
  setSelectedFunds: (product: IFund[]) => void;
  setViewFund: (product: IFund) => void;
  shareSuccess?: boolean;
}

export const ProductList: FunctionComponent<ProductListProps> = ({
  handleShareDocuments,
  productList,
  selectedFunds,
  setSelectedFunds,
  setViewFund,
  shareSuccess,
}: ProductListProps) => {
  const [activeAccordion, setActiveAccordion] = useState<number[]>([]);
  const [allFunds, setAllFunds] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(true);
  const [inputSearch, setInputSearch] = useState<string>("");

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleViewDetails = (fund: IFund) => {
    setViewFund(fund);
  };

  const handleNext = () => {
    Alert.alert("handlePress");
  };

  const handlePrev = () => {
    Alert.alert("handlePress");
  };

  const handleRecommendedFunds = () => {
    setAllFunds(false);
  };

  const handleAllFunds = () => {
    setAllFunds(true);
  };

  const handleSelectProduct = (product: ITableData[]) => {
    let newSelected = product === productList ? product : [...selectedFunds];
    if (product.length === 0) {
      newSelected = [];
    }
    if (product.length === 1) {
      const sectionIndex = newSelected.indexOf(product[0]);
      if (sectionIndex > -1) {
        newSelected.splice(sectionIndex, 1);
      } else {
        newSelected.push(product[0]);
      }
    }
    setSelectedFunds(newSelected as IFund[]);
  };

  const handleShowPerformance = (item: IColumnItemAccordion) => {
    const newSections: number[] = [...activeAccordion];
    const sectionIndex = newSections.indexOf(item.index);
    if (sectionIndex > -1) {
      newSections.splice(sectionIndex, 1);
    } else {
      newSections.splice(0, 1, item.index);
    }
    setActiveAccordion(newSections);
  };

  const columns: ITableColumn[] = [
    {
      key: "name",
      icon: {
        name: "caret-down",
      },
      viewStyle: {
        width: sw234,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_NAME,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: "fundType",
      viewStyle: {
        width: sw83,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_PRODUCT,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: "riskCategory",
      viewStyle: {
        width: sw102,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_RISK,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: "isEpf",
      viewStyle: {
        width: sw72,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_EPF,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: "isShariah",
      viewStyle: {
        width: sw90,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_SHARIAH,
    },
    {
      icon: {
        name: "caret-down",
      },
      key: "performanceOverview",
      viewStyle: {
        width: sw109,
      },
      title: PRODUCT_LIST.LABEL_COLUMN_PERFORMANCE,
      onPressItem: handleShowPerformance,
      withAccordion: true,
    },
  ];
  const tableAccordion = (item: ITableData) => {
    return (
      <Fragment>
        <ProductGraph fund={item as IFund} />
        <CustomSpacer space={sh40} />
      </Fragment>
    );
  };

  const renderAccordion = productList.length !== 0 ? tableAccordion : undefined;

  const tableContainer: ViewStyle = { backgroundColor: colorWhite._2, borderBottomRightRadius: sw24, borderBottomLeftRadius: sw24 };

  return (
    <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled" scrollEnabled={filter}>
      <View style={flexChild}>
        <ProductHeader
          filter={filter}
          handleFilter={handleFilter}
          handleNext={handleNext}
          handlePrev={handlePrev}
          inputSearch={inputSearch}
          setInputSearch={setInputSearch}
        />
        <View style={{ ...shadow5, margin: sw24, backgroundColor: colorWhite._1, borderRadius: sw24 }}>
          <CustomSpacer space={sh153} />
          <CustomSpacer space={sh16} />
          <View style={flexRow}>
            <Tab onPress={handleRecommendedFunds} selected={!allFunds} text={PRODUCT_LIST.LABEL_RECOMMENDED} />
            <Tab onPress={handleAllFunds} selected={allFunds} text={PRODUCT_LIST.LABEL_ALL_FUNDS} />
            <CustomFlexSpacer />
            <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={1} totalItems={36} itemsPerPage={20} />
            <CustomSpacer isHorizontal={true} space={sw24} />
          </View>
          <CustomSpacer space={sh15} />
          <View style={tableContainer}>
            <AdvanceTable
              activeAccordion={activeAccordion}
              columns={columns}
              data={productList}
              rowSelection={selectedFunds}
              onRowSelect={handleSelectProduct}
              RenderAccordion={renderAccordion}
              RenderOptions={(props: ITableOptions) => (
                <ProductOptions
                  {...props}
                  handleShareDocuments={handleShareDocuments}
                  handleShowPerformance={handleShowPerformance}
                  handleViewDetails={handleViewDetails}
                  shareSuccess={shareSuccess}
                />
              )}
              rowSelectionLabel={PRODUCT_LIST.LABEL_COLUMN_BUY}
            />
            <CustomSpacer space={sh32} />
          </View>
        </View>
      </View>
      {selectedFunds.length !== 0 ? <CustomSpacer space={sh152} /> : null}
    </ScrollView>
  );
};