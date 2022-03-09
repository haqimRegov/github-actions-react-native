import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomCard, CustomSpacer, CustomTextInput, Dash, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import {
  borderBottomBlue4,
  centerVertical,
  flexChild,
  flexRow,
  fs16BoldBlack1,
  px,
  sh24,
  sh8,
  sw16,
  sw24,
  sw360,
  sw64,
} from "../../../styles";
import { parseAmount } from "../../../utils";

const { PAYMENT } = Language.PAGE;

export interface NewEPFProps {
  funds: IOrderInvestment[];
  payment: IPaymentInfo;
  setPayment: (value: IPaymentInfo) => void;
  totalAmount: IOrderAmount;
}

export const NewEPF: FunctionComponent<NewEPFProps> = ({ funds, payment, setPayment }: NewEPFProps) => {
  const { epfReferenceNo } = payment;

  // Function for multiple UTMC

  let fundsPerUtmc = {};
  funds.forEach((eachFund: IOrderInvestment) => {
    const { fundIssuer } = eachFund;
    const filteredFunds = funds.filter((eachFilter) => eachFilter.fundIssuer === fundIssuer);
    const investmentPerUtmc: number =
      filteredFunds.length > 1
        ? filteredFunds
            .map((eachFilteredFunds: IOrderInvestment) => parseAmount(eachFilteredFunds.investmentAmount))
            .reduce((total, currentValue) => total + currentValue)
        : parseAmount(filteredFunds[0].investmentAmount);
    if (!Object.keys(fundsPerUtmc).includes(fundIssuer)) {
      fundsPerUtmc = { ...fundsPerUtmc, [fundIssuer]: investmentPerUtmc };
    }
  });

  return (
    <View style={px(sw24)}>
      {Object.keys(fundsPerUtmc).map((eachKey, keyIndex: number) => {
        const tempReferenceNo = [...epfReferenceNo];
        const findIndex = tempReferenceNo.findIndex((eachReference: IEpfReferenceNo) => eachReference.utmc === eachKey);
        const referenceNo = findIndex !== -1 ? tempReferenceNo[findIndex].referenceNo : "";
        const setReferenceNumber = (value: string) => {
          const currentReferenceNumber = { utmc: eachKey, referenceNo: value, amount: fundsPerUtmc[eachKey].toString() };
          if (findIndex !== -1) {
            tempReferenceNo[findIndex] = { ...currentReferenceNumber };
          } else {
            tempReferenceNo.push(currentReferenceNumber);
          }
          setPayment({ ...payment, epfReferenceNo: tempReferenceNo });
        };

        const epfItems = [
          <LabeledTitle label={PAYMENT.LABEL_AMOUNT} title={`MYR ${fundsPerUtmc[eachKey]}`} style={{ width: sw360 }} />,
          <CustomTextInput label={PAYMENT.LABEL_EPF_REFERENCE} onChangeText={setReferenceNumber} value={referenceNo} />,
        ];
        return (
          <Fragment key={keyIndex}>
            <View style={{ ...flexRow, ...centerVertical }}>
              <Text style={fs16BoldBlack1}>{eachKey}</Text>
              <CustomSpacer isHorizontal={true} space={sw16} />
              <View style={flexChild}>
                <View style={borderBottomBlue4} />
              </View>
            </View>
            <CustomSpacer space={sh8} />
            <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={sw64} items={epfItems} />
          </Fragment>
        );
      })}
      <CustomSpacer space={sh24} />
      <Dash />
    </View>
  );
};
