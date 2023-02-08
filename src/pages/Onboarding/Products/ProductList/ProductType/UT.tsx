import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { connect } from "react-redux";

import { FILTER_RISK } from "../../../../../data/dictionary";
import { getProductList } from "../../../../../network-actions";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { UnitTrustTemplate } from "../../../../../templates";
import { isNotEmpty } from "../../../../../utils";

interface UnitTrustProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  tabsContent?: ReactNode;
}

const UnitTrustComponent: FunctionComponent<UnitTrustProps> = ({
  addSelectedFund,
  addUtAllFunds,
  addUtFilters,
  addUtRecommendedFunds,
  addUtSearch,
  addUtSort,
  addViewFund,
  // details,
  newSales,
  products,
  productType,
  resetSelectedFund,
  riskScore,
  resetUTFilter,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  tabsContent,
  updateUtShowBy,
  updateAvailableFilters,
}: UnitTrustProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { filters, page, search, showBy, sort, totalCount } = products.ut;
  const [loading, setLoading] = useState<boolean>(false);

  const riskIndex = FILTER_RISK.findIndex((risk) => risk === riskScore.appetite);
  const recommendedRisk = FILTER_RISK.slice(0, riskIndex + 1);
  const riskCategory =
    filters.riskCategory !== undefined && filters.riskCategory.length === 0 && showBy === "recommended"
      ? recommendedRisk
      : filters.riskCategory;

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const request: IProductListRequest = {
      fundCurrency: filters.fundCurrency || [],
      fundType: filters.fundType![0] || "",
      // isConventional: filters.conventional![0], // Not used in BE
      isEpf: filters.epfApproved![0] || "",
      issuingHouse: filters.issuingHouse || [],
      isSyariah: isNotEmpty(filters.shariahApproved) && filters.shariahApproved!.length > 0 ? filters.shariahApproved![0] : "",
      netWorth: riskScore.netWorth,
      page: newPage,
      recommendedRisk: riskScore.appetite,
      riskCategory: riskCategory || [],
      search: search,
      showBy: showBy,
      sort: sort,
      tab: "ut",
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

  const handleFetchUT = async (newPage: string) => {
    Keyboard.dismiss();
    const funds = await handleFetch(newPage);
    if (funds !== undefined) {
      if (showBy === "all") {
        addUtAllFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            recommended: totalCount.recommended === "" ? funds.totalCount.recommended : totalCount.recommended,
          },
        });
      } else {
        addUtRecommendedFunds({
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
    handleFetchUT(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters, showBy]);

  return (
    <UnitTrustTemplate
      // recommendedRisk={showBy === "recommended" ? recommendedRisk : undefined}
      addSelectedFund={addSelectedFund}
      addUtAllFunds={addUtAllFunds}
      addUtFilters={addUtFilters}
      addUtRecommendedFunds={addUtRecommendedFunds}
      addUtSearch={addUtSearch}
      addUtSort={addUtSort}
      addViewFund={addViewFund}
      handleFetchUT={handleFetchUT}
      isMultiUtmc={undefined}
      loading={loading}
      newSales={newSales}
      products={products}
      productType={productType}
      resetSelectedFund={resetSelectedFund}
      resetUTFilter={resetUTFilter}
      scrollEnabled={scrollEnabled}
      selectedFunds={selectedFunds as unknown as IProduct[]}
      setScrollEnabled={setScrollEnabled}
      tabsContent={tabsContent}
      updateUtShowBy={updateUtShowBy}
    />
  );
};

export const UnitTrust = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(UnitTrustComponent);
