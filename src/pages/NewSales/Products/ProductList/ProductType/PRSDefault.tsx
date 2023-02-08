import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { connect } from "react-redux";

import { DEFAULT_DATE_FORMAT } from "../../../../../constants";
import { getProductList } from "../../../../../network-actions";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { PRSDefaultTemplate } from "../../../../../templates/Products/ProductType/PRSDefault";
import { isNotEmpty } from "../../../../../utils";

interface PRSDefaultProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  tabsContent?: ReactNode;
}

const PRSDefaultComponent: FunctionComponent<PRSDefaultProps> = ({
  accountDetails,
  addPrsDefaultAllFunds,
  addPrsDefaultFilters,
  addPrsDefaultRecommendedFunds,
  addPrsDefaultSearch,
  addPrsDefaultSort,
  addSelectedFund,
  addViewFund,
  details,
  products,
  productType,
  resetSelectedFund,
  resetPRSDefaultFilter,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  tabsContent,
  updatePrsDefaultShowBy,
  updateAvailableFilters,
}: PRSDefaultProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { filters, page, search, sort } = products.prsDefault;
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const request = {
      age: moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "years").toString(),
      tab: "prsdefault",
      fundType: filters.fundType![0] || "",
      fundCurrency: filters.fundCurrency || [],
      isEpf: filters.epfApproved![0] || "",
      isSyariah: isNotEmpty(filters.shariahApproved) && filters.shariahApproved!.length > 0 ? filters.shariahApproved![0] : "",
      riskCategory: filters.riskCategory || [],
      issuingHouse: filters.issuingHouse || [],
      // isConventional: filters.conventional![0], // Not used in BE
      page: newPage,
      sort: sort,
      showBy: "recommended",
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

  const handleFetchPRSDefault = async (newPage: string) => {
    Keyboard.dismiss();
    const funds = await handleFetch(newPage);
    if (funds !== undefined) {
      addPrsDefaultRecommendedFunds(funds);
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
    handleFetchPRSDefault(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters]);

  return (
    <PRSDefaultTemplate
      accountDetails={accountDetails}
      addPrsDefaultAllFunds={addPrsDefaultAllFunds}
      addPrsDefaultFilters={addPrsDefaultFilters}
      addPrsDefaultRecommendedFunds={addPrsDefaultRecommendedFunds}
      addPrsDefaultSearch={addPrsDefaultSearch}
      addPrsDefaultSort={addPrsDefaultSort}
      addSelectedFund={addSelectedFund}
      addViewFund={addViewFund}
      handleFetchPrsDefault={handleFetchPRSDefault}
      loading={loading}
      products={products}
      productType={productType}
      resetPrsDefaultFilter={resetPRSDefaultFilter}
      resetSelectedFund={resetSelectedFund}
      scrollEnabled={scrollEnabled}
      selectedFunds={selectedFunds as unknown as IProduct[]}
      setScrollEnabled={setScrollEnabled}
      tabsContent={tabsContent}
      updatePrsDefaultShowBy={updatePrsDefaultShowBy}
    />
  );
};

export const PRSDefault = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(PRSDefaultComponent);
