import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";

import { CustomSpacer, LabeledTitle, ProductCard } from "../../../components";
import { Language } from "../../../constants";
import { flexGrow, fs16RegBlack2, fs24BoldBlack2, px, sh176, sh24, sh40, sh56, sh8, sw24 } from "../../../styles";

const { PRODUCT_CONFIRMATION } = Language.PAGE;

export interface ProductConfirmationProps {
  selectedProduct: IProduct[];
  setFixedBottomShow: (toggle: boolean) => void;
  setProductConfirmShow: (toggle: boolean) => void;
  setSelectedProduct: (product: IProduct[]) => void;
}

const initialState: IProductConfirmation = {
  accountType: PRODUCT_CONFIRMATION.QUESTION_3_OPTION_1,
  channel: PRODUCT_CONFIRMATION.QUESTION_4_OPTION_1,
  currency: "MYR",
  epf: "",
  fundMethod: PRODUCT_CONFIRMATION.QUESTION_1_OPTION_1,
  fundType: "",
  graph: "",
  investmentAmount: "",
  issuer: "",
  name: "",
  performance: "",
  risk: "",
  salesCharge: "",
  scheduledPayment: PRODUCT_CONFIRMATION.QUESTION_2_OPTION_1,
  shariah: "",
  type: "",
};

export const ProductConfirmation: FunctionComponent<ProductConfirmationProps> = ({
  selectedProduct,
  setFixedBottomShow,
  setProductConfirmShow,
  setSelectedProduct,
}: ProductConfirmationProps) => {
  const [data, setData] = useState<IProductConfirmation[]>([]);

  useEffect(() => {
    const initialStateArray: IProductConfirmation[] = [];
    selectedProduct.map((item: any) => {
      const newState: IProductConfirmation = {
        ...initialState,
        ...item,
      };

      return initialStateArray.push(newState);
    });

    const keyboardWillShow = () => {
      setFixedBottomShow(false);
    };

    const keyboardWillHide = () => {
      setFixedBottomShow(true);
    };

    setData(initialStateArray);

    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
    };
  }, [selectedProduct, setFixedBottomShow]);

  return (
    <ScrollView contentContainerStyle={flexGrow}>
      <View style={px(sw24)}>
        <CustomSpacer space={sh56} />
        <LabeledTitle
          label={PRODUCT_CONFIRMATION.HEADING}
          labelStyle={fs24BoldBlack2}
          spaceToLabel={sh8}
          title={PRODUCT_CONFIRMATION.SUBHEADING}
          titleStyle={fs16RegBlack2}
        />
        <CustomSpacer space={sh40} />
        {data.map((card: IProductConfirmation, index: number) => {
          const newData = [...data];

          const handleDelete = () => {
            const updatedProducts = [...selectedProduct];
            updatedProducts.splice(index, 1);
            if (updatedProducts.length === 0) {
              setProductConfirmShow(false);
            }

            setData(data);
            setSelectedProduct(updatedProducts);
          };

          const handleInvestmentAmount = (text: string) => {
            newData[index].investmentAmount = text;
            setData(newData);
          };

          const handleFundMethod = (text: string) => {
            newData[index].fundMethod = text;
            setData(newData);
          };

          const handleScheduledPayment = (text: string) => {
            newData[index].scheduledPayment = text;
            setData(newData);
          };

          const handleChannel = (text: string) => {
            newData[index].channel = text;
            setData(newData);
          };

          const handleSalesCharge = (text: string) => {
            newData[index].salesCharge = text;
            setData(newData);
          };

          const handleAccountType = (text: string) => {
            newData[index].accountType = text;
            setData(newData);
          };

          return (
            <Fragment key={index}>
              {index === 0 ? null : <CustomSpacer space={sh24} />}
              <ProductCard
                handleDelete={handleDelete}
                handleInvestmentAmount={handleInvestmentAmount}
                handleFundMethod={handleFundMethod}
                handleScheduledPayment={handleScheduledPayment}
                handleSalesCharge={handleSalesCharge}
                handleChannel={handleChannel}
                handleAccountType={handleAccountType}
                product={card}
              />
            </Fragment>
          );
        })}
        <CustomSpacer space={sh176} />
      </View>
    </ScrollView>
  );
};
