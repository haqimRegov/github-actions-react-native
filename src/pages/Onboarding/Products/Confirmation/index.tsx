import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Keyboard, ScrollView, Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, IconButton, LabeledTitle } from "../../../../components";
import { Language } from "../../../../constants";
import {
  circle,
  colorBlack,
  colorWhite,
  flexChild,
  flexGrow,
  flexRowCC,
  fs10BoldBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlack2,
  px,
  sh176,
  sh24,
  sh32,
  sh40,
  sh56,
  sh8,
  shadowBlue5,
  sw24,
  sw8,
} from "../../../../styles";
import { Investment } from "./Investment";

const { INVESTMENT } = Language.PAGE;

export interface ProductConfirmationProps {
  investmentDetails: IFundSales[];
  selectedFunds: IFund[];
  setFixedBottomShow: (toggle: boolean) => void;
  setInvestmentDetails: (fundSales: IFundSales[]) => void;
  setPage: (page: number) => void;
  setSelectedFund: (fund: IFund[]) => void;
}

export const ProductConfirmation: FunctionComponent<ProductConfirmationProps> = ({
  investmentDetails,
  selectedFunds,
  setFixedBottomShow,
  setInvestmentDetails,
  setPage,
  setSelectedFund,
}: ProductConfirmationProps) => {
  useEffect(() => {
    const keyboardWillShow = () => {
      setFixedBottomShow(false);
    };

    const keyboardWillHide = () => {
      setFixedBottomShow(true);
    };

    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
    };
  }, [setFixedBottomShow]);

  return (
    <ScrollView contentContainerStyle={flexGrow} keyboardShouldPersistTaps="handled">
      <View style={px(sw24)}>
        <CustomSpacer space={sh56} />
        <LabeledTitle
          label={INVESTMENT.HEADING}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          title={INVESTMENT.SUBHEADING}
          titleStyle={fs16SemiBoldBlack2}
        />
        <CustomSpacer space={sh40} />
        {investmentDetails!.map((product: IFundSales, index: number) => {
          const newData = [...investmentDetails!];

          const handleDelete = () => {
            const updatedProducts = [...selectedFunds];
            updatedProducts.splice(index, 1);
            if (updatedProducts.length === 0) {
              setPage(0);
            }
            const updatedDetails = [...investmentDetails!];
            updatedDetails.splice(index, 1);
            if (updatedDetails.length === 0) {
              setPage(0);
            }

            setInvestmentDetails(updatedDetails);
            setSelectedFund(updatedProducts);
          };

          const updateData = (updatedData: IFundSales) => {
            newData[index] = updatedData;
            setInvestmentDetails(newData);
          };

          const iconStyle: ViewStyle = { ...circle(sw24, colorWhite._1), backgroundColor: colorWhite._1, justifyContent: "center" };
          const container: ViewStyle = {
            ...flexChild,
            ...shadowBlue5,
            backgroundColor: colorWhite._1,
            borderRadius: sw8,
          };

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer space={sh24} />}
              <View style={container}>
                <CustomSpacer space={sh32} />
                <View style={px(sw24)}>
                  <View style={flexRowCC}>
                    <Text style={fs10BoldBlack2}>{product.fund.fundCategory}</Text>
                    <CustomFlexSpacer />
                    <IconButton name="trash" color={colorBlack._1} onPress={handleDelete} size={sh24} style={iconStyle} />
                  </View>
                  <LabeledTitle
                    label={product.fund.name}
                    labelStyle={fs24BoldBlack2}
                    spaceToLabel={0}
                    title={product.fund.issuer}
                    titleStyle={fs16SemiBoldBlack2}
                  />
                </View>
                <CustomSpacer space={sh24} />
                <Investment data={product} setData={updateData} />
              </View>
            </Fragment>
          );
        })}
        <CustomSpacer space={sh176} />
      </View>
    </ScrollView>
  );
};
