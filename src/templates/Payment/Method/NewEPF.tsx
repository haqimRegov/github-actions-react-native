import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomCard, CustomSpacer, CustomTextInput, Dash, LabeledTitle } from "../../../components";
import { Language } from "../../../constants";
import { px, sh24, sw24, sw360, sw64 } from "../../../styles";

const { PAYMENT } = Language.PAGE;

export interface NewEPFProps {
  funds: IOrderInvestment[];
  payment: IPaymentInfo;
  setPayment: (value: IPaymentInfo) => void;
  totalAmount: IOrderAmount;
}

export const NewEPF: FunctionComponent<NewEPFProps> = ({ funds, payment, setPayment, totalAmount }: NewEPFProps) => {
  const { epfReferenceNumber } = payment;

  const handleReferenceNo = (value: string) => {
    setPayment({ ...payment, amount: totalAmount.amount, epfReferenceNumber: value });
  };

  const epfItems = [
    <LabeledTitle label={PAYMENT.LABEL_AMOUNT} title={`${totalAmount.currency} ${totalAmount.amount}`} style={{ width: sw360 }} />,
    <CustomTextInput label={PAYMENT.LABEL_EPF_REFERENCE} onChangeText={handleReferenceNo} value={epfReferenceNumber} />,
  ];

  // Function for multiple UTMC

  // let fundsPerUtmc = {};
  // funds.forEach((eachFund: IOrderInvestment) => {
  //   const { fundIssuer } = eachFund;
  //   const filteredFunds = funds.filter((eachFilter) => eachFilter.fundIssuer === fundIssuer);
  //   const investmentPerUtmc: number =
  //     filteredFunds.length > 1
  //       ? (filteredFunds.reduce(
  //           (acc, currentValue) => parseInt(acc.investmentAmount, 10) + parseInt(currentValue.investmentAmount, 10),
  //         ) as unknown as number)
  //       : (parseInt(filteredFunds[0].investmentAmount, 10) as number);
  //   if (!Object.keys(fundsPerUtmc).includes(fundIssuer)) {
  //     fundsPerUtmc = { ...fundsPerUtmc, [fundIssuer]: investmentPerUtmc };
  //   }
  // });

  return (
    <View style={px(sw24)}>
      <CustomSpacer space={sh24} />
      <Dash />
      <CustomSpacer space={sh24} />
      <CustomCard spaceBetweenGroup={sh24} spaceBetweenItem={sw64} items={epfItems} />
      <CustomSpacer space={sh24} />
      <Dash />
      {/* {Object.keys(fundsPerUtmc).map((eachKey, keyIndex: number) => {
        const tempReferenceNo = [...epfReferenceNo];
        const findIndex = tempReferenceNo.findIndex((eachReference: IEpfReferenceNo) => eachReference.utmc === eachKey);
        const referenceNo = findIndex !== -1 ? tempReferenceNo[findIndex].referenceNo : "";
        const setReferenceNumber = (value: string) => {
          const currentReferenceNumber = { utmc: eachKey, referenceNo: value };
          if (findIndex !== -1) {
            tempReferenceNo[findIndex] = { ...currentReferenceNumber };
          } else {
            tempReferenceNo.push(currentReferenceNumber);
          }
          setPayment({ ...payment, epfReferenceNumber: tempReferenceNo });
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
      })} */}
    </View>
  );
};
