import moment from "moment";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { CustomSpacer } from "../../../../../components";
import { DEFAULT_DATE_FORMAT } from "../../../../../constants";
import { getProductList } from "../../../../../network-actions/products";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { colorWhite, flexChild, sh248, sh296, shadowBlack116, sw24 } from "../../../../../styles";
import { ProductHeader } from "../Header";
import { ProductListView } from "../Listing";

interface PRSDefaultProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  shareSuccess?: boolean;
}

const PRSDefaultComponent: FunctionComponent<PRSDefaultProps> = ({
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
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  shareSuccess,
}: PRSDefaultProps) => {
  const { filters, page, pages, recommended, search, sort, totalCount } = products.prsDefault;
  const [loading, setLoading] = useState<boolean>(false);
  const [filterTemp, setFilterTemp] = useState<IProductFilter>(filters);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [inputSearch, setInputSearch] = useState<string>(search);
  const defaultPage = page !== "" ? parseInt(page, 10) : 0;
  const defaultPages = pages !== "" ? parseInt(pages, 10) : 0;

  const filterValues = Object.values(filters)
    .flat(1)
    .filter((value) => value !== "");

  const absoluteHeaderSpace = filterValues.length > 0 ? sh296 : sh248;

  const handleFetch = async (newPage: string) => {
    setLoading(true);
    const req = {
      age: moment().diff(moment(details!.principalHolder!.dateOfBirth, DEFAULT_DATE_FORMAT), "years").toString(),
      tab: "prsdefault",
      fundType: filters.fundType![0] || "",
      fundCurrency: filters.fundCurrency || [],
      isEpf: filters.epfApproved![0] || "",
      isSyariah: filters.shariahApproved![0] || "",
      riskCategory: filters.riskCategory || [],
      issuingHouse: filters.issuingHouse || [],
      isConventional: filters.conventional![0],
      page: newPage,
      sort: sort,
      showBy: "recommended",
      search: search,
    };
    // eslint-disable-next-line no-console
    console.log("productList", req);
    const productListResponse: IProductListResponse = await getProductList(req);
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
    }
  };

  const handleShowFilter = () => {
    if (filterVisible === false) {
      setFilterTemp(filters);
    }
    setFilterVisible(!filterVisible);
    setScrollEnabled(!scrollEnabled);
  };

  const handleSearch = () => {
    if (filterVisible === false) {
      addPrsDefaultSearch(inputSearch);
    }
  };

  const handleConfirmFilter = () => {
    addPrsDefaultFilters(filterTemp);
    addPrsDefaultSearch(inputSearch);
  };

  const handleCancelFilter = () => {
    setFilterTemp(filters);
  };

  const handleUpdateFilter = (newFilter: IProductFilter) => {
    setFilterTemp(newFilter);
    addPrsDefaultFilters(newFilter);
  };

  const handleSelectProduct = (product: IProduct) => {
    const sectionIndex = selectedFunds.findIndex((fund) => fund.fundId === product.fundId);
    const newSelectedFunds = [...selectedFunds];
    if (sectionIndex === -1) {
      newSelectedFunds.push(product);
    } else if (sectionIndex > -1) {
      newSelectedFunds.splice(sectionIndex, 1);
    }
    addSelectedFund(newSelectedFunds);
  };

  const handleNext = async () => {
    const nextPage = parseInt(page, 10) < parseInt(pages, 10) ? parseInt(page, 10) + 1 : parseInt(pages, 10);
    handleFetchPRSDefault(nextPage.toString());
  };

  const handlePrev = () => {
    const prevPage = parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : 1;
    handleFetchPRSDefault(prevPage.toString());
  };

  useEffect(() => {
    // when sort, search, filter is updated
    handleFetchPRSDefault(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters]);

  return (
    <View style={{ ...flexChild, borderRadius: sw24, backgroundColor: colorWhite._1, margin: sw24, ...shadowBlack116 }}>
      <ProductHeader
        filter={filterTemp}
        filterVisible={filterVisible}
        handleCancel={handleCancelFilter}
        handleConfirm={handleConfirmFilter}
        handleSearch={handleSearch}
        handleShowFilter={handleShowFilter}
        handleUpdateFilter={handleUpdateFilter}
        inputSearch={inputSearch}
        productType={productType}
        setFilter={setFilterTemp}
        setInputSearch={setInputSearch}
      />
      <CustomSpacer space={absoluteHeaderSpace} />
      <ProductListView
        filter={filterTemp}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleResetSelected={resetSelectedFund}
        handleSelectProduct={handleSelectProduct}
        list={loading === true ? [] : recommended}
        loading={loading}
        page={defaultPage}
        pages={defaultPages}
        productType={productType}
        search={search}
        selectedFunds={selectedFunds}
        setViewFund={addViewFund}
        shareSuccess={shareSuccess}
        sort={sort}
        totalCount={totalCount}
        updateFilter={handleUpdateFilter}
        updateSort={addPrsDefaultSort}
      />
    </View>
  );
};

export const PRSDefault = connect(ProductsMapStateToProps, ProductsMapDispatchToProps)(PRSDefaultComponent);
