import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, MultiSelectPills, NewCheckBoxDropdown, SingleSelectPills, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { FILTER_EPF_LABEL, FILTER_FUND_TYPE_AMP, FILTER_ISSUING_HOUSE, FILTER_RISK_CATEGORY, FILTER_TYPE } from "../../../data/dictionary";
import { borderBottomGray2, flexRow, fs16BoldGray6, px, sh16, sh24, sh32, sh4, sw24, sw360, sw64, sw8 } from "../../../styles";
import { isNotEmpty } from "../../../utils";

const { PRODUCT_FILTER } = Language.PAGE;
interface AMPFilterProps {
  availableFilters: IProductAvailableFilter;
  filter: IProductFilter;
  productType: ProductType;
  setFilter: (value: IProductFilter) => void;
}

export const AMPFilter: FunctionComponent<AMPFilterProps> = ({ availableFilters, filter, setFilter }: AMPFilterProps) => {
  const { epfApproved, fundType, issuingHouse, riskCategory, shariahApproved } = filter;

  const handleEpf = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...epfApproved!].includes(value) ? [] : [value];
    filterClone.epfApproved = tmp;
    setFilter(filterClone);
  };

  const handleRiskCategory = (value: string[]) => {
    setFilter({ ...filter, riskCategory: value });
  };

  const handleIssuingHouse = (value: string[]) => {
    setFilter({ ...filter, issuingHouse: value });
  };

  const handleShariah = (value: string) => {
    const filterClone = { ...filter };
    const checkConventionalExisting =
      isNotEmpty(shariahApproved) && shariahApproved!.length > 0 && shariahApproved![0] === "No" ? [] : ["No"];
    const checkConventionalType = value === "Conventional" ? checkConventionalExisting : [];
    const checkShariahExisting = isNotEmpty(shariahApproved) && shariahApproved!.length > 0 && shariahApproved![0] === "Yes" ? [] : ["Yes"];
    const checkShariah = value === "Shariah" ? checkShariahExisting : checkConventionalType;
    filterClone.shariahApproved = checkShariah;
    setFilter(filterClone);
  };

  const handleAMPCategory = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...fundType!].includes(value) ? [] : [value];
    filterClone.fundType = tmp;
    setFilter(filterClone);
  };

  const riskCategoryList = FILTER_RISK_CATEGORY.map((eachRisk: ICheckBoxWithSubLabel) => {
    return { label: eachRisk.label };
  });

  const disabledRiskCategory: string[] = FILTER_RISK_CATEGORY.map((eachRisk) => eachRisk.value).filter(
    (eachValue: string) =>
      !availableFilters.riskCategory!.some((eachContent: string) => eachContent.toLowerCase() === eachValue.toLowerCase()),
  );

  const conventionalSelected = shariahApproved![0] === "No" ? "Conventional" : "";
  const shariahSelected = shariahApproved![0] === "Yes" ? "Shariah" : conventionalSelected;
  const checkEpfValue = isNotEmpty(epfApproved) && epfApproved!.length > 0 ? epfApproved![0] : "";
  return (
    <View style={px(sw24)}>
      <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs16BoldGray6} text={PRODUCT_FILTER.LABEL_FILTER_AMP} />
      <View style={flexRow}>
        <View style={{ width: sw360 }}>
          <SingleSelectPills
            direction="row"
            header={PRODUCT_FILTER.LABEL_AMP_CATEGORY}
            labels={FILTER_FUND_TYPE_AMP}
            labelStyle={{ lineHeight: sh24 }}
            space={sw8}
            spaceToHeader={sh4}
            onSelect={handleAMPCategory}
            value={fundType![0] || ""}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <View style={{ width: sw360 }}>
          <NewCheckBoxDropdown
            disabled={true}
            handleChange={handleIssuingHouse}
            items={FILTER_ISSUING_HOUSE}
            label={PRODUCT_FILTER.LABEL_ISSUING}
            value={issuingHouse!}
          />
        </View>
      </View>
      <CustomSpacer space={sh24} />
      <View style={flexRow}>
        <View style={{ width: sw360 }}>
          <MultiSelectPills
            direction="row"
            disabledValues={disabledRiskCategory}
            header={PRODUCT_FILTER.LABEL_RISK}
            labels={riskCategoryList}
            labelStyle={{ lineHeight: sh24 }}
            onSelect={handleRiskCategory}
            space={sw8}
            spaceToHeader={sh4}
            values={riskCategory!}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <SingleSelectPills
          direction="row"
          header={PRODUCT_FILTER.LABEL_TYPE}
          labels={FILTER_TYPE}
          labelStyle={{ lineHeight: sh24 }}
          onSelect={handleShariah}
          space={sw8}
          spaceToHeader={sh4}
          value={shariahSelected}
        />
      </View>
      <CustomSpacer space={sh16} />
      <View style={borderBottomGray2} />
      <CustomSpacer space={sh16} />
      <View style={flexRow}>
        <View style={{ width: sw360 }}>
          <SingleSelectPills
            direction="row"
            header={PRODUCT_FILTER.LABEL_EPF}
            labels={FILTER_EPF_LABEL}
            labelStyle={{ lineHeight: sh24 }}
            onSelect={handleEpf}
            space={sw8}
            spaceToHeader={sh4}
            value={checkEpfValue}
          />
        </View>
      </View>
    </View>
  );
};
