import React, { FunctionComponent, useState } from "react";
import { TextInput, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Collapsible from "react-native-collapsible";

import { ActionButtons, CustomSpacer, IconButton, IconInput } from "../../../../components";
import { Language } from "../../../../constants";
import {
  centerHorizontal,
  centerHV,
  centerVertical,
  circleBorder,
  colorBlack,
  colorBlue,
  colorGray,
  colorWhite,
  flexRow,
  fs16SemiBoldBlack2,
  fullWidth,
  sh120,
  sh24,
  sh32,
  sh48,
  shadowBlack5,
  sw1,
  sw100,
  sw2,
  sw218,
  sw24,
  sw40,
  sw44,
} from "../../../../styles";
import { ProductFilter, ProductFilterProps } from "./Filter";

const { PRODUCT_LIST, PRODUCT_FILTER } = Language.PAGE;
interface ProductHeaderProps extends ProductFilterProps {
  filterVisible: boolean;
  handleShowFilter: () => void;
  handleCancel: () => void;
  handleConfirm: () => void;
  handleSearch: () => void;
  inputSearch: string;
  setInputSearch: (value: string) => void;
}

export const ProductHeader: FunctionComponent<ProductHeaderProps> = ({
  handleShowFilter,
  filterVisible,
  handleCancel,
  handleConfirm,
  handleSearch,
  inputSearch,
  setInputSearch,
  ...filterProps
}: ProductHeaderProps) => {
  // const [showMore, setShowMore] = useState<{ active: boolean; number: number }>({ active: false, number: 0 });
  const [searchInputRef, setSearchInputRef] = useState<TextInput | null>(null);
  // const [showMorePills, setShowMorePills] = useState<boolean>(false);
  // const [filter, setFilter] = useState<IProductFilter>();
  // const [filterLabelShow, setFilterLabelShow] = useState<boolean>(true);

  // const inputSearch = products[productList].search;

  // const setInputSearch = (value: string) => {
  //   const newProducts = { ...products };
  //   newProducts[productList].search = value;
  //   updateProducts(newProducts);
  // };

  // const filterValues = Object.values(selectedFilter)
  //   .flat(1)
  //   .filter((value) => value !== "");

  const handlePressFilter = () => {
    if (searchInputRef !== null) {
      searchInputRef.blur();
    }
    handleShowFilter();
  };

  // const handleFilterLabel = () => {
  //   setFilterLabelShow(!filterLabelShow);
  // };

  // const handleShowAllFilter = () => {
  //   setShowMorePills(!showMorePills);
  // };

  // const handleRemoveFilter = (index: number) => {
  //   const keys = Object.keys(selectedFilter);
  //   const [deletedKey] = keys.filter((key: string) => selectedFilter[key].includes(filterValues[index]));
  //   const filterClone: ProductFilterType = { ...selectedFilter };
  //   const updatedFilter = filterClone[deletedKey].filter((filterValue: string) => filterValue !== filterValues[index]);
  //   filterClone[deletedKey] = updatedFilter;
  //   const values = Object.values(updatedFilter);
  //   if (values.flat(1).length === 0) {
  //     setShowMorePills(false);
  //   }
  //   setSelectedFilter(filterClone);
  // };

  const handleCancelFilter = () => {
    // Alert.alert("cancel");
    handleCancel();
    // setFilter(products[productList].filters);
    handleShowFilter();
  };

  // const handleSaveFilter = () => {
  //   Alert.alert("save");
  //   // const newProducts = { ...products };
  //   // newProducts[productList].filters = filter;
  //   // updateProducts(newProducts);
  //   // handleFilter();
  // };

  // const filterTags = Object.values(filterProps.filter).flat();

  // const handlePills = async () => {
  //   const count = await CalculateCount(filterTags, 688, 32);
  //   setShowMore({ ...showMore, number: count });
  // };

  const handleApplyFilter = () => {
    handleConfirm();
    handleShowFilter();
    // handlePills();
  };

  // const overlay = filterVisible ? fullHeight : {};
  // const overflow: ViewStyle = showMorePills ? {} : { height: sh48, overflow: "hidden" };

  const container: ViewStyle = {
    ...shadowBlack5,
    ...fullWidth,
    backgroundColor: colorWhite._1,
    marginBottom: sh24,
    borderBottomLeftRadius: sw24,
    borderBottomRightRadius: sw24,
    position: "absolute",
    top: sh120,
    zIndex: 1,
  };

  const filterBGColor = filterVisible ? colorBlue._2 : colorWhite._1;
  const filterBorderColor = filterVisible ? colorBlue._2 : colorGray._3;
  const filterColor = filterVisible ? colorWhite._1 : colorBlue._2;

  const filterContainer: ViewStyle = { ...centerHV, ...circleBorder(sw40, sw1, filterBorderColor), backgroundColor: filterBGColor };
  const inputStyle: TextStyle = { ...fs16SemiBoldBlack2, letterSpacing: -0.39 };

  // const showLabel = showMorePills ? PRODUCT_FILTER.LABEL_SHOW_LESS : PRODUCT_FILTER.LABEL_SHOW_ALL;

  // useEffect(() => {
  //   // setFilter(selectedFilter);
  //   const filterTimer = setTimeout(() => {
  //     setFilterLabelShow(false);
  //   }, 3000);
  //   return () => {
  //     clearTimeout(filterTimer);
  //   };
  // }, []);

  // const handleWidth = async (event: LayoutChangeEvent) => {
  //   const { height, width } = event.nativeEvent.layout;
  //   if (showMore.active === false) {
  //     if (width >= 826) {
  //       setShowMore({ ...showMore, active: true });
  //     }
  //   } else if ((height < sh24 && showMore.active === true) || width < 826) {
  //     setShowMore({ ...showMore, active: false, number: 0 });
  //   }
  // };
  // const showMoreText = `+${showMore.number} More`;
  // console.log("showMore", showMore);
  // useEffect(() => {
  //   handlePills();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <View style={container}>
      <CustomSpacer space={sh32} />
      <View style={{ ...centerVertical, ...flexRow }}>
        <CustomSpacer isHorizontal={true} space={sw24} />
        <IconInput
          autoCorrect={false}
          icon="search"
          iconInputRef={searchInputRef}
          onChangeText={setInputSearch}
          onSubmitEditing={handleSearch}
          placeholder={PRODUCT_LIST.INPUT_SEARCH_PLACEHOLDER}
          placeholderTextColor={colorBlack._2_5}
          returnKeyType="search"
          setIconInputRef={setSearchInputRef}
          style={inputStyle}
          value={inputSearch}
          viewStyle={{ borderRadius: sw100, height: sh48 }}
        />
        {/* <CustomTooltip
          color={colorWhite._1}
          topAdjustment={32}
          contentStyle={{ ...px(0), ...py(0), height: sh28, width: sw84, ...centerHV }}
          showChild={false}
          overlayColor={colorTransparent}
          tooltipStyle={shadow}
          isVisible={false}
          content={<Text style={{ ...fs12RegBlue2, letterSpacing: -sw033 }}>Filter</Text>}
          placement="top"
          onClose={handleFilterLabel}> */}
        <View style={{ ...centerVertical, ...flexRow }}>
          <CustomSpacer isHorizontal={true} space={sw44} />
          <TouchableWithoutFeedback onPress={handlePressFilter}>
            <IconButton color={filterColor} onPress={handlePressFilter} name="filter" size={sh24} style={filterContainer} />
          </TouchableWithoutFeedback>
          <CustomSpacer isHorizontal={true} space={sw44} />
        </View>
        {/* </CustomTooltip> */}
        <CustomSpacer isHorizontal={true} space={sw2} />
      </View>
      {/* <View>
        <CustomSpacer space={sh16} />
        <View style={{ ...px(sw24), ...flexRow, width: 826, ...flexWrap }} onLayout={handleWidth}>
          {filterTags.slice(0, filterTags.length - showMore.number).map((tag, index) => (
            <View>
              <View style={flexRow}>
                {index === 0 ? null : <CustomSpacer isHorizontal={true} space={sw8} />}
                <Tag color="secondary" icon="close" text={tag} />
              </View>
              <CustomSpacer space={sh16} />
            </View>
          ))}
          {showMore.active === true && showMore.number > 0 ? (
            <Fragment>
              <CustomSpacer isHorizontal={true} space={sw4} />
              <Tag color="secondary" text={showMoreText} />
            </Fragment>
          ) : null}
        </View>
      </View> */}
      <Collapsible collapsed={!filterVisible} duration={300}>
        <ProductFilter {...filterProps} />
        <CustomSpacer space={sh32} />
        <ActionButtons
          buttonContainerStyle={centerHorizontal}
          cancelButtonStyle={{ width: sw218 }}
          continueButtonStyle={{ width: sw218 }}
          labelContinue={PRODUCT_FILTER.BUTTON_APPLY}
          handleCancel={handleCancelFilter}
          handleContinue={handleApplyFilter}
        />
        <CustomSpacer space={sh32} />
      </Collapsible>
      <CustomSpacer space={sh24} />
    </View>
  );
};
