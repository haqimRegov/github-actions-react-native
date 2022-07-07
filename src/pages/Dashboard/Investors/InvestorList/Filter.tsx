import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { MultiSelectPills, TextSpaceArea } from "../../../../components";
import { Language } from "../../../../constants";
import { FILTER_RISK_CATEGORY } from "../../../../data/dictionary";
import { flexRow, fs16BoldGray6, px, sh16, sh24, sh32, sh4, sw24, sw8 } from "../../../../styles";

const { DASHBOARD_INVESTORS_LIST } = Language.PAGE;
interface AllInvestorsFilterProps {
  filter: IInvestorsFilter;
  setFilter: (value: IInvestorsFilter) => void;
}

export const InvestorListFilter: FunctionComponent<AllInvestorsFilterProps> = ({ filter, setFilter }: AllInvestorsFilterProps) => {
  const { riskProfile } = filter;

  const riskCategoryList = FILTER_RISK_CATEGORY.map((eachRisk: ICheckBoxWithSubLabel) => {
    return { label: eachRisk.label };
  });

  const handleRisk = (values: string[]) => {
    setFilter({ ...filter, riskProfile: values });
  };

  return (
    <View>
      <TextSpaceArea
        spaceToBottom={sh16}
        spaceToTop={sh32}
        style={{ ...fs16BoldGray6, ...px(sw24) }}
        text={DASHBOARD_INVESTORS_LIST.LABEL_FILTER_INVESTOR_BY}
      />
      <TextSpaceArea spaceToBottom={sh4} style={px(sw24)} text={DASHBOARD_INVESTORS_LIST.LABEL_FILTER_INVESTOR_RISK_PROFILE} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <MultiSelectPills
          direction="row"
          labels={riskCategoryList}
          labelStyle={{ lineHeight: sh24 }}
          space={sw8}
          onSelect={handleRisk}
          values={riskProfile}
        />
      </View>
    </View>
  );
};
