import moment from "moment";
import React, { Fragment, FunctionComponent } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { AdvanceToggleButton, CustomSpacer, NewDatePicker, TextSpaceArea } from "../../../../components";
import { Language, NunitoBold, NunitoRegular } from "../../../../constants";
import { FILTER_RISK_CATEGORY } from "../../../../data/dictionary";
import { IcoMoon } from "../../../../icons";
import {
  centerHV,
  centerVertical,
  colorBlue,
  colorRed,
  colorWhite,
  flexRow,
  fs12BoldGray6,
  fs16BoldGray6,
  px,
  sh143,
  sh16,
  sh24,
  sh32,
  sh4,
  sw1,
  sw12,
  sw16,
  sw24,
  sw326,
  sw64,
  sw8,
} from "../../../../styles";
import { IToggleButtonCustomContent } from "../../../../types/toggle-button";

const { DASHBOARD_FILTER, DASHBOARD_EDD } = Language.PAGE;
interface AllInvestorsFilterProps {
  filter: IInvestorsFilter;
  setFilter: (value: IInvestorsFilter) => void;
}

export const InvestorListFilter: FunctionComponent<AllInvestorsFilterProps> = ({ filter, setFilter }: AllInvestorsFilterProps) => {
  const { riskProfile, startDate, endDate } = filter;

  const riskCategoryList = FILTER_RISK_CATEGORY.map((eachRisk: ICheckBoxWithSubLabel) => {
    return { label: eachRisk.label };
  });

  const handleStartDate = (value?: Date) => {
    if (value !== undefined && endDate !== undefined) {
      const updatedDate = value < endDate ? value : endDate;
      setFilter({ ...filter, startDate: updatedDate });
    }
  };

  const handleEndDate = (value?: Date) => {
    setFilter({ ...filter, endDate: value });
  };

  const handleRisk = (value: number) => {
    setFilter({ ...filter, riskProfile: riskCategoryList[value].label });
  };

  const riskIndex = riskCategoryList.findIndex((eachRiskCategory) => eachRiskCategory.label === riskProfile);

  return (
    <View>
      <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={{ ...fs16BoldGray6, ...px(sw24) }} text={DASHBOARD_EDD.TITLE} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <AdvanceToggleButton
          buttonStyle={{ borderRadius: sw12, height: sw24, width: sw24 }}
          CustomContent={({
            buttonStyle,
            disabledBackground,
            disabledStyle,
            iconSize,
            label,
            labelStyle,
            mainLabelStyle,
            selected,
          }: IToggleButtonCustomContent) => {
            const handleRiskChange = () => {
              const findIndex = riskCategoryList.findIndex((eachCategory) => eachCategory.label === label);
              handleRisk(findIndex);
            };
            const selectedStyle: ViewStyle =
              selected === true ? { borderColor: colorRed._1, backgroundColor: colorRed._1 } : { borderColor: colorBlue._1 };
            const selectedTextStyle: TextStyle = selected === true ? { color: colorWhite._1 } : { color: colorBlue._1 };
            const containerStyle: ViewStyle = {
              ...centerHV,
              ...px(sw16),
              borderRadius: sw24,
              borderWidth: sw1,
              height: sh32,
              ...selectedStyle,
            };
            return (
              <TouchableWithoutFeedback onPress={handleRiskChange}>
                <View style={{ ...centerVertical, ...disabledStyle }}>
                  <View style={{ ...flexRow, ...containerStyle }}>
                    {selected === true ? (
                      <Fragment>
                        <View style={{ ...centerHV, ...disabledBackground, ...buttonStyle }}>
                          <IcoMoon name="success" size={iconSize || sw12} color={colorWhite._1} />
                        </View>
                      </Fragment>
                    ) : null}
                    <Text
                      style={{
                        ...fs12BoldGray6,
                        fontFamily: selected === true ? NunitoBold : NunitoRegular,
                        maxWidth: sw326,
                        ...mainLabelStyle,
                        ...labelStyle,
                        ...selectedTextStyle,
                      }}>
                      {label}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          direction="row"
          labels={riskCategoryList}
          labelStyle={{ lineHeight: sh24 }}
          space={sw8}
          onSelect={handleRisk}
          value={riskIndex!}
        />
      </View>
      <CustomSpacer space={sh24} />
      <View style={{ ...flexRow, ...px(sw24) }}>
        <View>
          <TextSpaceArea spaceToBottom={sh4} text={DASHBOARD_FILTER.LABEL_START_DATE} />
          <NewDatePicker
            datePickerStyle={{ height: sh143 }}
            maximumDate={endDate || moment().toDate()}
            mode="date"
            setValue={handleStartDate}
            value={startDate}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <View>
          <TextSpaceArea spaceToBottom={sh4} text={DASHBOARD_FILTER.LABEL_END_DATE} />
          <NewDatePicker
            datePickerStyle={{ height: sh143 }}
            maximumDate={moment().toDate()}
            minimumDate={startDate}
            mode="date"
            setValue={handleEndDate}
            value={endDate}
          />
        </View>
      </View>
      <CustomSpacer space={sh24} />
    </View>
  );
};
