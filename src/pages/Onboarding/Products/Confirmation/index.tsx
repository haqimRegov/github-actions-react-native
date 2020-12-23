import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Keyboard, ScrollView, Text, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, LabeledTitle, SafeAreaPage } from "../../../../components";
import { Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  centerVertical,
  colorBlue,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fs10BoldBlack2,
  fs16SemiBoldBlack2,
  fs24BoldBlack2,
  px,
  sh176,
  sh24,
  sh32,
  sh8,
  shadowBlue5,
  sw24,
  sw8,
} from "../../../../styles";
import { Investment } from "./Investment";

const { INVESTMENT } = Language.PAGE;

export interface ProductConfirmationProps {
  investmentDetails: IProductSales[];
  selectedFunds: IProduct[];
  setFixedBottomShow: (toggle: boolean) => void;
  setInvestmentDetails: (fundSales: IProductSales[]) => void;
  setPage: (page: number) => void;
  setSelectedFund: (fund: IProduct[]) => void;
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
    <SafeAreaPage>
      <ScrollView contentContainerStyle={flexGrow}>
        <View style={px(sw24)}>
          <CustomSpacer space={sh32} />
          <LabeledTitle
            label={INVESTMENT.HEADING}
            labelStyle={fs24BoldBlack2}
            spaceToLabel={sh8}
            title={INVESTMENT.SUBHEADING}
            titleStyle={fs16SemiBoldBlack2}
          />
          <CustomSpacer space={sh24} />
          {investmentDetails!.map((product: IProductSales, index: number) => {
            const { fundType, fundName, issuingHouse } = product.fundDetails;
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

            const updateData = (updatedData: IProductSales) => {
              newData[index] = updatedData;
              setInvestmentDetails(newData);
            };

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
                  <CustomSpacer space={sh24} />
                  <View style={px(sw24)}>
                    <View style={{ ...centerVertical, ...flexRow }}>
                      <Text style={fs10BoldBlack2}>{fundType}</Text>
                      <CustomFlexSpacer />
                      <IcoMoon name="trash" color={colorBlue._2} onPress={handleDelete} size={sh32} />
                    </View>
                    <LabeledTitle
                      label={fundName}
                      labelStyle={fs24BoldBlack2}
                      spaceToLabel={sh8}
                      title={issuingHouse}
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
    </SafeAreaPage>
  );
};
