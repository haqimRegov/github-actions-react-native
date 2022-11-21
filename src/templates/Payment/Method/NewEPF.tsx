import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomCard, CustomSpacer, CustomTextInput, Dash, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import {
  borderBottomBlue4,
  centerVertical,
  DEVICE,
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
import { formatAmount, parseAmount } from "../../../utils";
import { scaledSpaceBetween } from "../helpers";

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
      fundsPerUtmc = { ...fundsPerUtmc, [fundIssuer]: formatAmount(investmentPerUtmc) };
    }
  });

  const scaledSpace = DEVICE.SCREEN.WIDTH !== 1080 ? scaledSpaceBetween() : sw64;

  return (
    <View style={px(sw24)}>
      {Object.keys(fundsPerUtmc).map((eachKey, keyIndex: number) => {
        const tempReferenceNo = [...epfReferenceNo];
        const findIndex = tempReferenceNo.findIndex((eachReference: IEpfReferenceNo) => eachReference.utmc === eachKey);
        const referenceNo = findIndex !== -1 ? tempReferenceNo[findIndex].referenceNo : "";
        const error = findIndex !== -1 ? tempReferenceNo[findIndex].error : undefined;
        const setReferenceNumber = (value: string) => {
          const currentReferenceNumber = { utmc: eachKey, referenceNo: value, amount: fundsPerUtmc[eachKey] };
          if (findIndex !== -1) {
            tempReferenceNo[findIndex] = { ...currentReferenceNumber };
          } else {
            tempReferenceNo.push(currentReferenceNumber);
          }
          const checkDuplicate = tempReferenceNo.filter(
            (eachRefNo: IEpfReferenceNo) => eachRefNo.referenceNo === currentReferenceNumber.referenceNo,
          );
          const checkIndex = findIndex !== -1 ? findIndex : 0;
          const checkError =
            checkDuplicate.length > 1 && tempReferenceNo[checkIndex].referenceNo !== ""
              ? { error: PAYMENT.LABEL_SAME_EPF_REFERENCE_NO }
              : {};
          tempReferenceNo[checkIndex] = { ...tempReferenceNo[checkIndex], ...checkError };
          setPayment({ ...payment, epfReferenceNo: tempReferenceNo });
        };

        const validateReferenceNumber = () => {
          const currentReferenceNumber = tempReferenceNo[keyIndex];
          const checkDuplicate = tempReferenceNo.filter(
            (eachRefNo: IEpfReferenceNo) =>
              currentReferenceNumber !== undefined && eachRefNo.referenceNo === currentReferenceNumber.referenceNo,
          );
          let updatedRefNo = [...tempReferenceNo];
          const checkDuplicateNumberExist = [...new Set(tempReferenceNo.map((eachRef: IEpfReferenceNo) => eachRef.referenceNo))];
          if (checkDuplicateNumberExist.length === tempReferenceNo.length) {
            updatedRefNo = tempReferenceNo.map((eachRef: IEpfReferenceNo) => {
              return { ...eachRef, error: undefined };
            });
          }
          if (checkDuplicate.length > 1) {
            updatedRefNo[keyIndex] = { ...updatedRefNo[keyIndex], error: PAYMENT.LABEL_SAME_EPF_REFERENCE_NO };
          } else {
            updatedRefNo[keyIndex] = { ...updatedRefNo[keyIndex], error: undefined };
          }
          if (updatedRefNo[keyIndex].referenceNo !== "" && updatedRefNo[keyIndex].referenceNo !== undefined) {
            setPayment({ ...payment, epfReferenceNo: updatedRefNo });
          }
        };

        const epfItems = [
          <LabeledTitle label={PAYMENT.LABEL_AMOUNT} title={`MYR ${fundsPerUtmc[eachKey]}`} style={{ width: sw360 }} />,
          <CustomTextInput
            error={error}
            label={PAYMENT.LABEL_EPF_REFERENCE}
            onChangeText={setReferenceNumber}
            onBlur={validateReferenceNumber}
            value={referenceNo}
          />,
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
            <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={scaledSpace} items={epfItems} />
          </Fragment>
        );
      })}
      <CustomSpacer space={sh24} />
      <Dash />
    </View>
  );
};
