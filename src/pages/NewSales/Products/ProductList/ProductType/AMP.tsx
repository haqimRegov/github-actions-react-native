import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { connect } from "react-redux";

import { FILTER_RISK } from "../../../../../data/dictionary";
import { getProductList } from "../../../../../network-actions";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { AMPTemplate } from "../../../../../templates/Products/ProductType/AMP";
import { isNotEmpty } from "../../../../../utils";

interface AMPProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  handleDisabledFundIdRef: (value: string[] | undefined) => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  tabsContent?: ReactNode;
}

const AMPComponent: FunctionComponent<AMPProps> = ({
  accountDetails,
  accountType,
  addAmpAllFunds,
  addAmpFilters,
  addAmpRecommendedFunds,
  addAmpSearch,
  addAmpSort,
  addSelectedFund,
  addViewFund,
  global,
  handleDisabledFundIdRef,
  investmentDetails,
  newSales,
  products,
  productType,
  resetAMPFilter,
  resetSelectedFund,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  tabsContent,
  updateAmpShowBy,
  updateAvailableFilters,
}: AMPProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { isMultiUtmc } = global;
  const { riskInfo } = newSales;
  const { filters, page, search, showBy, sort, totalCount } = products.amp;
  const [loading, setLoading] = useState<boolean>(false);

  const riskIndex = FILTER_RISK.findIndex((risk) => risk === riskInfo.appetite);
  const recommendedRisk = FILTER_RISK.slice(0, riskIndex + 1);
  const riskCategory =
    filters.riskCategory !== undefined && filters.riskCategory.length === 0 && showBy === "recommended"
      ? recommendedRisk
      : filters.riskCategory;

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const request: IProductListRequest = {
      accountType: accountType!.toLowerCase(),
      fundCurrency: filters.fundCurrency || [],
      fundType: filters.fundType![0] || "",
      // isConventional: filters.conventional![0], // Not used in BE
      isEpf: filters.epfApproved![0] || "",
      issuingHouse: filters.issuingHouse || [],
      isSyariah: isNotEmpty(filters.shariahApproved) && filters.shariahApproved!.length > 0 ? filters.shariahApproved![0] : "",
      page: newPage,
      recommendedRisk: riskInfo.appetite,
      riskCategory: riskCategory || [],
      search: search,
      showBy: showBy,
      sort: sort,
      tab: "amp",
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

  const handleFetchAMP = async (newPage: string) => {
    Keyboard.dismiss();
    const funds = await handleFetch(newPage);
    if (funds !== undefined) {
      if (showBy === "all") {
        addAmpAllFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            recommended: totalCount.recommended === "" ? funds.totalCount.recommended : totalCount.recommended,
          },
        });
      } else {
        addAmpRecommendedFunds({
          ...funds,
          totalCount: {
            ...funds.totalCount,
            all: totalCount.all === "" ? funds.totalCount.all : totalCount.all,
          },
        });
      }
      updateAvailableFilters(funds.filters);
    }
  };

  useEffect(() => {
    handleFetchAMP(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters, showBy]);

  return (
    <AMPTemplate
      accountDetails={accountDetails}
      addAmpAllFunds={addAmpAllFunds}
      addAmpFilters={addAmpFilters}
      addAmpRecommendedFunds={addAmpRecommendedFunds}
      addAmpSearch={addAmpSearch}
      addAmpSort={addAmpSort}
      addSelectedFund={addSelectedFund}
      addViewFund={addViewFund}
      handleDisabledFundIdRef={handleDisabledFundIdRef}
      handleFetchAMP={handleFetchAMP}
      investmentDetails={investmentDetails!}
      isMultiUtmc={isMultiUtmc === true}
      loading={loading}
      products={products}
      productType={productType}
      resetAMPFilter={resetAMPFilter}
      resetSelectedFund={resetSelectedFund}
      scrollEnabled={scrollEnabled}
      selectedFunds={selectedFunds as unknown as IProduct[]}
      setScrollEnabled={setScrollEnabled}
      tabsContent={tabsContent}
      transactionType={newSales.transactionType}
      updateAmpShowBy={updateAmpShowBy}
    />
  );
};

export const AMP = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(AMPComponent);
