import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CheckBoxDropdown, CheckBoxGroup, CustomSpacer, TextSpaceArea } from "../../../../../components";
import { Language } from "../../../../../constants";
import { FILTER_EPF_LABEL, FILTER_RISK_CATEGORY, FILTER_TYPE } from "../../../../../data/dictionary";
import { centerVertical, flexRow, fs16BoldBlack1, px, sh32, sh8, sw24, sw240, sw64 } from "../../../../../styles";

const { PRODUCT_FILTER } = Language.PAGE;
interface AMPFilterProps {
  filter: IProductFilter;
  setFilter: (value: IProductFilter) => void;
}

export const AMPFilter: FunctionComponent<AMPFilterProps> = ({ filter, setFilter }: AMPFilterProps) => {
  const { epfApproved, riskCategory, shariahApproved } = filter;
  const disabledEpfApproved = [epfApproved![0] === "Yes" ? 1 : -1, epfApproved![0] === "No" ? 0 : -1];
  const shariahApprovedOnly = shariahApproved![0] === "No" ? 1 : -1;
  const disabledShariah = [shariahApproved![0] === "Yes" ? 0 : -1, shariahApprovedOnly];
  const conventionalSelected = shariahApproved![0] === "No" ? ["Conventional"] : [];
  const shariahSelected = shariahApproved![0] === "Yes" ? ["Shariah"] : conventionalSelected;

  const handleEpf = (value: string) => {
    const filterClone = { ...filter };
    const tmp = [...epfApproved!];
    tmp.splice(0, tmp.includes(value) ? 1 : 0, tmp.includes(value) ? "" : value);
    filterClone.epfApproved = tmp;
    setFilter(filterClone);
  };

  const handleRiskCategory = (value: string[]) => {
    setFilter({ ...filter, riskCategory: value });
  };

  const handleShariah = (value: string) => {
    const actualValue = value === "Conventional" ? "No" : "Yes";
    const filterClone = { ...filter };
    const tmp = [...shariahApproved!];
    tmp.splice(0, tmp.includes(actualValue) ? 1 : 0, tmp.includes(actualValue) ? "" : actualValue);
    filterClone.shariahApproved = tmp;
    setFilter(filterClone);
  };

  return (
    <View>
      <View style={{ ...px(sw24) }}>
        <View style={{ ...centerVertical, ...flexRow }}>
          <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh32} style={fs16BoldBlack1} text={PRODUCT_FILTER.LABEL_FILTER_AMP} />
        </View>
      </View>
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View style={{ width: sw240 }}>
          <CheckBoxGroup
            disabledIndex={disabledEpfApproved}
            label={PRODUCT_FILTER.LABEL_EPF}
            labels={FILTER_EPF_LABEL}
            selected={epfApproved!}
            setSelected={handleEpf}
          />
        </View>
        <View style={{ width: sw240 }}>
          <CheckBoxGroup
            disabledIndex={disabledShariah}
            label={PRODUCT_FILTER.LABEL_TYPE}
            labels={FILTER_TYPE}
            selected={shariahSelected}
            setSelected={handleShariah}
          />
        </View>
      </View>
      <CustomSpacer space={sh32} />
      <View style={px(sw24)}>
        <TextSpaceArea spaceToBottom={sh8} text={PRODUCT_FILTER.LABEL_RISK} />
        <CheckBoxDropdown handleChange={handleRiskCategory} items={FILTER_RISK_CATEGORY} value={riskCategory!} />
      </View>
      <CustomSpacer space={sw64} />
    </View>
  );
};
