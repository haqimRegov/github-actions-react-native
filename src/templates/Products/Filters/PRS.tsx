import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, MultiSelectPills, NewCheckBoxDropdown, SingleSelectPills, TextSpaceArea } from "../../../components";
import { Language } from "../../../constants";
import { FILTER_FUND_TYPE_NEW, FILTER_ISSUING_HOUSE, FILTER_RISK_CATEGORY, FILTER_TYPE } from "../../../data/dictionary";
import { flexRow, fs16BoldGray6, px, sh16, sh24, sh32, sh4, sw24, sw360, sw64, sw8 } from "../../../styles";
import { isNotEmpty } from "../../../utils";

const { PRODUCT_FILTER } = Language.PAGE;
interface PRSFilterProps {
  accountDetails?: INewSalesAccountDetails;
  availableFilters: IProductAvailableFilter;
  filter: IProductFilter;
  productType: ProductType;
  setFilter: (value: IProductFilter) => void;
}

export const PRSFilter: FunctionComponent<PRSFilterProps> = ({ accountDetails, availableFilters, filter, setFilter }: PRSFilterProps) => {
  const { fundType, issuingHouse, riskCategory, shariahApproved } = filter;

  const handleShariah = (value: string) => {
    const filterClone = { ...filter };
    const checkConventionalType = value === "Conventional" ? ["No"] : [];
    const checkShariah = value === "Shariah" ? ["Yes"] : checkConventionalType;
    filterClone.shariahApproved = checkShariah;
    setFilter(filterClone);
  };

  const handleFundType = (value: string[]) => {
    setFilter({ ...filter, fundType: value });
  };

  const handleIssuingHouse = (value: string[]) => {
    setFilter({ ...filter, issuingHouse: value });
  };

  const handleRiskCategory = (value: string[]) => {
    setFilter({ ...filter, riskCategory: value });
  };

  const riskCategoryList = FILTER_RISK_CATEGORY.map((eachRisk: ICheckBoxWithSubLabel) => {
    return { label: eachRisk.label };
  });

  const disabledFundTypes: string[] = FILTER_FUND_TYPE_NEW.map((eachFundType) => eachFundType.value).filter(
    (eachValue: string) =>
      !availableFilters.fundCategory!.some((eachContent: string) => eachContent.toLowerCase() === eachValue.toLowerCase()),
  );
  const disabledIssuingHouse: string[] = FILTER_ISSUING_HOUSE.map((eachIssuingHouse) => eachIssuingHouse.value).filter(
    (eachValue: string) =>
      !availableFilters.issuingHouse!.some((eachContent: string) => eachContent.toLowerCase() === eachValue.toLowerCase()),
  );
  const disabledRiskCategory: string[] = FILTER_RISK_CATEGORY.map((eachRisk) => eachRisk.value).filter(
    (eachValue: string) =>
      !availableFilters.riskCategory!.some((eachContent: string) => eachContent.toLowerCase() === eachValue.toLowerCase()),
  );

  const conventionalSelected = shariahApproved![0] === "No" ? "Conventional" : "";
  const shariahSelected = shariahApproved![0] === "Yes" ? "Shariah" : conventionalSelected;
  return (
    <View style={px(sw24)}>
      <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs16BoldGray6} text={PRODUCT_FILTER.LABEL_FILTER_PRS} />
      <View style={flexRow}>
        <View style={{ width: sw360 }}>
          <NewCheckBoxDropdown
            disabledValues={disabledFundTypes}
            handleChange={handleFundType}
            items={FILTER_FUND_TYPE_NEW}
            label={PRODUCT_FILTER.LABEL_FUND_CATEGORY}
            value={fundType!}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <NewCheckBoxDropdown
          disabledValues={disabledIssuingHouse}
          handleChange={handleIssuingHouse}
          items={FILTER_ISSUING_HOUSE}
          label={PRODUCT_FILTER.LABEL_ISSUING}
          value={issuingHouse!}
        />
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
        <View>
          <SingleSelectPills
            direction="row"
            disabled={isNotEmpty(accountDetails) && accountDetails!.fundType === "prsDefault"}
            header={PRODUCT_FILTER.LABEL_TYPE}
            labels={FILTER_TYPE}
            labelStyle={{ lineHeight: sh24 }}
            onSelect={handleShariah}
            space={sw8}
            spaceToHeader={sh4}
            value={shariahSelected}
          />
        </View>
      </View>
    </View>
  );
};
