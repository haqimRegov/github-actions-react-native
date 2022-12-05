import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { connect } from "react-redux";

import { CustomFlexSpacer, CustomSpacer, Pagination } from "../../../../../components";
import { DEFAULT_DATE_FORMAT } from "../../../../../constants";
import { getProductList } from "../../../../../network-actions";
import { ProductsMapDispatchToProps, ProductsMapStateToProps, ProductsStoreProps } from "../../../../../store";
import { borderBottomGray2, colorWhite, flexChild, flexRow, sh152, sh192, shadow12Black116, sw24 } from "../../../../../styles";
import { isNotEmpty } from "../../../../../utils";
import { ProductHeader } from "../Header";
import { ProductListView } from "../Listing";

interface PRSDefaultProps extends ProductsStoreProps {
  handleCancelOnboarding?: () => void;
  scrollEnabled: boolean;
  setScrollEnabled: (value: boolean) => void;
  shareSuccess?: boolean;
  tabsContent?: ReactNode;
}

const PRSDefaultComponent: FunctionComponent<PRSDefaultProps> = ({
  accountDetails,
  addPrsDefaultFilters,
  addPrsDefaultRecommendedFunds,
  addPrsDefaultSearch,
  addPrsDefaultSort,
  addSelectedFund,
  addViewFund,
  details,
  newSales,
  products,
  productType,
  resetSelectedFund,
  resetPRSDefaultFilter,
  scrollEnabled,
  selectedFunds,
  setScrollEnabled,
  shareSuccess,
  tabsContent,
  updateAvailableFilters,
}: PRSDefaultProps) => {
  const navigation = useNavigation<IStackNavigationProp>();
  const { transactionType } = newSales;
  const { availableFilters } = products;
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

  const absoluteHeaderSpace = filterValues.length > 0 ? sh192 : sh152;

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

  const handleResetFilter = () => {
    const prsDefaultType = transactionType === "Sales" && accountDetails.fundType === "prsDefault";
    if (prsDefaultType === true) {
      const syariahConventional = accountDetails.isSyariah === true ? { shariahApproved: ["Yes"] } : { conventional: ["Yes"] };

      addPrsDefaultFilters({
        epfApproved: [],
        fundCurrency: [],
        fundType: [],
        issuingHouse: [],
        riskCategory: [],
        shariahApproved: [],
        conventional: [],
        ...syariahConventional,
      });
    } else {
      resetPRSDefaultFilter();
    }
  };

  const handleUpdateFilter = (newFilter: IProductFilter) => {
    setFilterTemp(newFilter);
    addPrsDefaultFilters(newFilter);
  };

  const handleSelectProduct = (product: IProduct) => {
    const sectionIndex = selectedFunds.findIndex((fund) => fund.fundCode === product.fundCode);
    const newSelectedFunds = [...selectedFunds];
    if (sectionIndex === -1) {
      newSelectedFunds.push(product);
    } else if (sectionIndex > -1) {
      newSelectedFunds.splice(sectionIndex, 1);
    }
    addSelectedFund(newSelectedFunds);
  };

  const handleNext = async () => {
    if (loading === false) {
      const nextPage = parseInt(page, 10) < parseInt(pages, 10) ? parseInt(page, 10) + 1 : parseInt(pages, 10);
      handleFetchPRSDefault(nextPage.toString());
    }
  };

  const handlePrev = () => {
    if (loading === false) {
      const prevPage = parseInt(page, 10) > 1 ? parseInt(page, 10) - 1 : 1;
      handleFetchPRSDefault(prevPage.toString());
    }
  };

  const isNotFiltered =
    filters.conventional?.length === 0 &&
    filters.fundType?.length === 0 &&
    filters.issuingHouse?.length === 0 &&
    filters.riskCategory?.length === 0 &&
    filters.shariahApproved?.length === 0;

  useEffect(() => {
    // when sort, search, filter is updated
    handleFetchPRSDefault(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, filters]);

  return (
    <View style={{ ...flexChild, borderRadius: sw24, backgroundColor: colorWhite._1, margin: sw24, ...shadow12Black116 }}>
      <ProductHeader
        accountDetails={accountDetails}
        availableFilters={availableFilters}
        currentFilter={filters}
        filter={filterTemp}
        filterVisible={filterVisible}
        handleCancel={handleCancelFilter}
        handleConfirm={handleConfirmFilter}
        handleResetFilter={handleResetFilter}
        handleSearch={handleSearch}
        handleShowFilter={handleShowFilter}
        handleUpdateFilter={handleUpdateFilter}
        inputSearch={inputSearch}
        isNotFiltered={isNotFiltered}
        prevSearch={search}
        productType={productType}
        setFilter={setFilterTemp}
        setInputSearch={setInputSearch}
      />
      <CustomSpacer space={absoluteHeaderSpace} />
      {accountDetails.accountNo === "" ? (
        <View>
          <View style={flexRow}>
            {tabsContent}
            <CustomFlexSpacer />
            <Pagination onPressNext={handleNext} onPressPrev={handlePrev} page={defaultPage} totalPages={defaultPages} />
            <CustomSpacer isHorizontal={true} space={sw24} />
          </View>
          <View style={borderBottomGray2} />
        </View>
      ) : null}
      <ProductListView
        accountDetails={accountDetails}
        addFunds={addSelectedFund}
        filter={filterTemp}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleResetSelected={resetSelectedFund}
        handleSelectProduct={handleSelectProduct}
        list={loading === true ? [] : (recommended as unknown as ITableData[])}
        loading={loading}
        page={defaultPage}
        pages={defaultPages}
        productType={productType}
        search={search}
        selectedFunds={selectedFunds as unknown as ITableData[]}
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
