import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { CustomTextInput } from "../../components/Input";
import { Language } from "../../constants/language";
import {
  circle,
  colorBlack,
  colorWhite,
  flexChild,
  flexRow,
  flexRowCC,
  fs10BoldBlack2,
  fs12BoldBlack2,
  fs16RegBlack2,
  fs24BoldBlack2,
  sh16,
  sh24,
  sh32,
  sh8,
  shadow5,
  sw12,
  sw24,
  sw32,
  sw8,
} from "../../styles";
import { RadioButtonGroup } from "../RadioButton";
import { IconButton } from "../Touchables/Icon";
import { CustomFlexSpacer, CustomSpacer, LabeledTitle } from "../Views";

const { PRODUCT_CONFIRMATION } = Language.PAGE;
const RADIO_GROUP_1 = [PRODUCT_CONFIRMATION.QUESTION_1_OPTION_1, PRODUCT_CONFIRMATION.QUESTION_1_OPTION_2];
const RADIO_GROUP_2 = [PRODUCT_CONFIRMATION.QUESTION_2_OPTION_1, PRODUCT_CONFIRMATION.QUESTION_2_OPTION_2];
const RADIO_GROUP_3 = [PRODUCT_CONFIRMATION.QUESTION_3_OPTION_1, PRODUCT_CONFIRMATION.QUESTION_3_OPTION_2];
const RADIO_GROUP_4 = [PRODUCT_CONFIRMATION.QUESTION_4_OPTION_1, PRODUCT_CONFIRMATION.QUESTION_4_OPTION_2];

interface ProductCardProps {
  handleAccountType: (text: string) => void;
  handleChannel: (text: string) => void;
  handleDelete: () => void;
  handleFundMethod: (text: string) => void;
  handleInvestmentAmount: (text: string) => void;
  handleSalesCharge: (text: string) => void;
  handleScheduledPayment: (text: string) => void;
  product: IProductConfirmation;
}

export const ProductCard: FunctionComponent<ProductCardProps> = ({
  handleAccountType,
  handleChannel,
  handleDelete,
  handleFundMethod,
  handleInvestmentAmount,
  handleSalesCharge,
  handleScheduledPayment,
  product,
}: ProductCardProps) => {
  const iconStyle: ViewStyle = { ...circle(sw24, colorWhite._1), backgroundColor: colorWhite._1, justifyContent: "center" };
  const container: ViewStyle = {
    ...flexRow,
    ...flexChild,
    ...shadow5,
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
  };

  if (product === undefined) {
    return null;
  }

  return (
    <View style={container}>
      <CustomSpacer isHorizontal={true} space={sw32} />
      <View style={flexChild}>
        <CustomSpacer space={sh32} />
        <View style={flexRowCC}>
          <Text style={fs10BoldBlack2}>{product.type}</Text>
          <CustomFlexSpacer />
          <IconButton name="trash" color={colorBlack._1} onPress={handleDelete} size={sh24} style={iconStyle} />
        </View>
        <LabeledTitle label={product.name} labelStyle={fs24BoldBlack2} spaceToLabel={0} title={product.issuer} titleStyle={fs16RegBlack2} />
        <CustomSpacer space={sh24} />
        <Text style={fs16RegBlack2}>{PRODUCT_CONFIRMATION.LABEL_QUESTION_1}</Text>
        <CustomSpacer space={sh16} />
        <RadioButtonGroup labels={RADIO_GROUP_1} selected={product.fundMethod} setSelected={handleFundMethod} space={sh16} />
        <CustomSpacer space={sh32} />
        <CustomTextInput
          inputPrefix={PRODUCT_CONFIRMATION.LABEL_AMOUNT_PREFIX}
          keyboardType="numeric"
          label={PRODUCT_CONFIRMATION.LABEL_AMOUNT}
          labelStyle={fs12BoldBlack2}
          onChangeText={handleInvestmentAmount}
          spaceToBottom={sh16}
          spaceToLabel={sh8}
          value={product.investmentAmount}
        />
        <View style={flexRow}>
          <CustomSpacer isHorizontal={true} space={sw12} />
          <RadioButtonGroup
            direction="row"
            labels={RADIO_GROUP_2}
            selected={product.scheduledPayment}
            setSelected={handleScheduledPayment}
            space={sh16}
          />
        </View>
        <CustomTextInput
          keyboardType="numeric"
          label={PRODUCT_CONFIRMATION.LABEL_SALES_CHARGE}
          labelStyle={fs12BoldBlack2}
          onChangeText={handleSalesCharge}
          spaceToBottom={sh32}
          spaceToLabel={sh8}
          spaceToTop={sh32}
          value={product.salesCharge}
        />
        <Text style={fs16RegBlack2}>{PRODUCT_CONFIRMATION.LABEL_QUESTION_2}</Text>
        <CustomSpacer space={sh16} />
        <RadioButtonGroup labels={RADIO_GROUP_3} selected={product.accountType} setSelected={handleAccountType} space={sh16} />
        <CustomSpacer space={sh32} />
        <Text style={fs16RegBlack2}>{PRODUCT_CONFIRMATION.LABEL_QUESTION_3}</Text>
        <CustomSpacer space={sh16} />
        <RadioButtonGroup labels={RADIO_GROUP_4} selected={product.channel} setSelected={handleChannel} space={sh16} />
        <CustomSpacer space={sh32} />
      </View>
      <CustomSpacer isHorizontal={true} space={sw32} />
    </View>
  );
};
