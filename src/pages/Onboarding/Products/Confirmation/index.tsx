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
  fs10BoldGray6,
  fs16SemiBoldGray6,
  fs24BoldGray6,
  px,
  sh176,
  sh24,
  sh32,
  sh8,
  shadow16Blue112,
  sw24,
  sw8,
} from "../../../../styles";
import { Investment } from "./Investment";

const { INVESTMENT } = Language.PAGE;

export interface ProductConfirmationProps {
  accountType: TypeAccountChoices;
  investmentDetails: IProductSales[];
  selectedFunds: IProduct[];
  setFixedBottomShow: (toggle: boolean) => void;
  setInvestmentDetails: (fundSales: IProductSales[]) => void;
  setPage: (page: number) => void;
  setSelectedFund: (fund: IProduct[]) => void;
  withEpf: boolean;
}

export const ProductConfirmation: FunctionComponent<ProductConfirmationProps> = ({
  accountType,
  investmentDetails,
  selectedFunds,
  setFixedBottomShow,
  setInvestmentDetails,
  setPage,
  setSelectedFund,
  withEpf,
}: ProductConfirmationProps) => {
  useEffect(() => {
    const handleKeyboardShow = () => {
      setFixedBottomShow(false);
    };

    const handleKeyboardHide = () => {
      setFixedBottomShow(true);
    };

    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", handleKeyboardShow);
    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", handleKeyboardHide);
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [setFixedBottomShow]);

  return (
    <SafeAreaPage>
      <ScrollView contentContainerStyle={flexGrow}>
        <View style={px(sw24)}>
          <CustomSpacer space={sh32} />
          <LabeledTitle
            label={INVESTMENT.HEADING}
            labelStyle={fs24BoldGray6}
            spaceToLabel={sh8}
            title={INVESTMENT.SUBHEADING}
            titleStyle={fs16SemiBoldGray6}
          />
          <CustomSpacer space={sh24} />
          {investmentDetails.map((product: IProductSales, index: number) => {
            const { fundType, fundName, issuingHouse, prsType } = product.fundDetails;
            const type = prsType === "prsDefault" ? "PRS DEFAULT" : fundType;
            const newData = [...investmentDetails];

            const handleDelete = () => {
              const updatedProducts = [...selectedFunds];
              updatedProducts.splice(index, 1);
              if (updatedProducts.length === 0) {
                setPage(0);
              }
              const updatedDetails = [...investmentDetails];
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
              ...shadow16Blue112,
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
                      <Text style={fs10BoldGray6}>{type}</Text>
                      <CustomFlexSpacer />
                      <IcoMoon name="trash" color={colorBlue._1} onPress={handleDelete} size={sh32} suppressHighlighting={true} />
                    </View>
                    <LabeledTitle
                      label={fundName}
                      labelStyle={fs24BoldGray6}
                      spaceToLabel={sh8}
                      title={issuingHouse}
                      titleStyle={fs16SemiBoldGray6}
                    />
                  </View>
                  <CustomSpacer space={sh24} />
                  <Investment accountType={accountType} data={product} setData={updateData} withEpf={withEpf} />
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
