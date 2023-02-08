import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { connect } from "react-redux";

import { FILTER_RISK } from "../../../../../data/dictionary";
import { getProductList } from "../../../../../network-actions";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { PRSTemplate } from "../../../../../templates/Products/ProductType/PRS";
import { isNotEmpty } from "../../../../../utils";

interface PRSProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  tabsContent?: ReactNode;
}

const PRSComponent: FunctionComponent<PRSProps> = ({
  accountDetails,
  addPrsFilters,
  addPrsRecommendedFunds,
  addPrsAllFunds,
  addPrsSearch,
  addPrsSort,
  addSelectedFund,
  addViewFund,
  newSales,
  products,
  productType,
  resetSelectedFund,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  resetPRSFilter,
  updateAvailableFilters,
  updatePrsShowBy,
  tabsContent,
}: PRSProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { riskInfo } = newSales;
  const { filters, page, search, showBy, sort, totalCount } = products.prs;
  const [loading, setLoading] = useState<boolean>(false);

  const riskIndex = FILTER_RISK.findIndex((risk) => risk === riskInfo.appetite);
  const recommendedRisk = FILTER_RISK.slice(0, riskIndex + 1);
  const riskCategory =
    filters.riskCategory !== undefined && filters.riskCategory.length === 0 && showBy === "recommended"
      ? recommendedRisk
      : filters.riskCategory;

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const request = {
      tab: "prs",
      fundType: filters.fundType![0] || "",
      fundCurrency: filters.fundCurrency || [],
      isEpf: filters.epfApproved![0] || "",
      isSyariah: isNotEmpty(filters.shariahApproved) && filters.shariahApproved!.length > 0 ? filters.shariahApproved![0] : "",
      recommendedRisk: riskInfo.appetite,
      riskCategory: riskCategory || [],
      issuingHouse: filters.issuingHouse || [],
      // isConventional: filters.conventional![0], // Not used in BE
      page: newPage,
      sort: sort,
      showBy: showBy,
      search: search,
    };
    const productListResponse: IProductListResponse = await getProductList(request, navigation, setLoading);
    setLoading(false);
    if (productListResponse !== undefined) {
      const { data, error } = productListResponse;
      if (error === null && data !== null) {
        return data.result;
      }
      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
    return undefined;
  };

  const handleFetchPRS = async (newPage: string) => {
    Keyboard.dismiss();
    const funds = await handleFetch(newPage);
    if (funds !== undefined) {
      if (showBy === "all") {
        addPrsAllFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            recommended: totalCount.recommended === "" ? funds.totalCount.recommended : totalCount.recommended,
          },
        });
      } else {
        addPrsRecommendedFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            all: totalCount.all === "" ? funds.totalCount.all : totalCount.all,
          },
        });
      }
      const updatedFilters: IProductAvailableFilter = { ...funds.filters };
      if (funds.filters.fundCategory!.includes("BALANCE")) {
        const updatedFundCategory = [...funds.filters.fundCategory!];
        const findBalanceIndex = funds.filters.fundCategory!.findIndex((eachCategory: string) => eachCategory === "BALANCE");
        updatedFundCategory.splice(findBalanceIndex, 1, "BALANCED");
        updatedFilters.fundCategory = updatedFundCategory;
      }
      updateAvailableFilters(updatedFilters);
    }
  };

  useEffect(() => {
    // when sort, search, filter is updated
    handleFetchPRS(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters, showBy]);

  return (
    <PRSTemplate
      accountDetails={accountDetails}
      addPrsAllFunds={addPrsAllFunds}
      addPrsFilters={addPrsFilters}
      addPrsRecommendedFunds={addPrsRecommendedFunds}
      addPrsSearch={addPrsSearch}
      addPrsSort={addPrsSort}
      addSelectedFund={addSelectedFund}
      addViewFund={addViewFund}
      handleFetchPrs={handleFetchPRS}
      loading={loading}
      products={products}
      productType={productType}
      resetPrsFilter={resetPRSFilter}
      resetSelectedFund={resetSelectedFund}
      scrollEnabled={scrollEnabled}
      selectedFunds={selectedFunds as unknown as IProduct[]}
      setScrollEnabled={setScrollEnabled}
      tabsContent={tabsContent}
      updatePrsShowBy={updatePrsShowBy}
    />
  );
};

export const PRS = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(PRSComponent);
