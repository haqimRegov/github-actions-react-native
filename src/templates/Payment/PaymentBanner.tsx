import React, { Fragment } from "react";
import { ImageStyle, Text, View } from "react-native";
import { Image } from "react-native-animatable";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { CustomSpacer } from "../../components";
import { Language } from "../../constants/language";
import {
  centerHV,
  centerVertical,
  colorBlue,
  colorYellow,
  flexRow,
  fs10BoldWhite1,
  fs16BoldGray6,
  fs16RegGray6,
  fsAlignCenter,
  imageContain,
  px,
  rowCenterVertical,
  sh16,
  sw100,
  sw16,
  sw4,
  sw8,
} from "../../styles";
import { formatAmount } from "../../utils";

const { PAYMENT } = Language.PAGE;

declare interface IPaymentBannerContentProps {
  balancePayments: IOrderAmount[];
  excessPayments: IOrderAmount[];
  grandTotal: IOrderAmount[];
  grandTotalRecurring?: IOrderAmount;
  paymentType?: TypePaymentType;
}

export const PaymentBannerContent = ({
  balancePayments,
  excessPayments,
  grandTotal,
  grandTotalRecurring,
  paymentType,
}: IPaymentBannerContentProps) => {
  const iconWarningStyle: ImageStyle = { ...imageContain, width: sw16, height: sh16 };
  return (
    <View>
      <View style={rowCenterVertical}>
        {grandTotal.length > 0 &&
          grandTotal.map((totalAmount: IOrderAmount, index: number) => {
            return (
              <View key={index} style={{ ...centerVertical, ...flexRow }}>
                {index !== 0 ? (
                  <Text style={{ ...fs16RegGray6, ...px(sw4) }}>+</Text>
                ) : (
                  <Text style={fs16RegGray6}>{`${PAYMENT.LABEL_GRAND_TOTAL} `}</Text>
                )}
                <Text style={fs16BoldGray6}>{`${totalAmount.currency} ${formatAmount(totalAmount.amount)}`}</Text>
              </View>
            );
          })}
      </View>
      {grandTotalRecurring !== null && grandTotalRecurring !== undefined ? (
        <View style={rowCenterVertical}>
          <Text style={fs16RegGray6}>{`${PAYMENT.LABEL_TOTAL_RECURRING} `}</Text>
          <Text style={fs16BoldGray6}>{`${grandTotalRecurring.currency} ${formatAmount(grandTotalRecurring.amount)}`}</Text>
        </View>
      ) : null}
      {paymentType !== undefined && paymentType === "Cash" ? (
        <Fragment>
          {balancePayments.length > 0 ? (
            <View style={rowCenterVertical}>
              {balancePayments.map((eachBalancePayment: IOrderAmount, index: number) => {
                return (
                  <View key={index} style={{ ...centerVertical, ...flexRow }}>
                    {index !== 0 ? (
                      <Text style={{ ...fs16RegGray6, ...px(sw4) }}>+</Text>
                    ) : (
                      <View style={flexRow}>
                        <View style={centerHV}>
                          <View style={{ width: sw16, height: sw16, ...centerHV, borderRadius: sw100, backgroundColor: colorBlue._1 }}>
                            <Text style={{ ...fs10BoldWhite1, ...fsAlignCenter }}>i</Text>
                          </View>
                        </View>
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={fs16RegGray6}>{`${PAYMENT.LABEL_AVAILABLE_BALANCE} `}</Text>
                      </View>
                    )}
                    <Text style={fs16BoldGray6}>{`${eachBalancePayment.currency} ${formatAmount(eachBalancePayment.amount)}`}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}
          {excessPayments.length > 0 ? (
            <View style={rowCenterVertical}>
              {excessPayments.map((eachBalancePayment: IOrderAmount, index: number) => {
                return (
                  <View key={index} style={{ ...centerVertical, ...flexRow }}>
                    {index !== 0 ? (
                      <Text style={{ ...fs16RegGray6, ...px(sw4), color: colorYellow._2 }}>+</Text>
                    ) : (
                      <View style={flexRow}>
                        <View style={centerHV}>
                          <Image source={LocalAssets.icon.iconWarning} style={iconWarningStyle} />
                        </View>
                        <CustomSpacer isHorizontal={true} space={sw8} />
                        <Text style={{ ...fs16BoldGray6, color: colorYellow._2 }}>{`${PAYMENT.LABEL_EXCESS} `}</Text>
                      </View>
                    )}
                    <Text style={{ ...fs16BoldGray6, color: colorYellow._2 }}>{`${eachBalancePayment.currency} ${formatAmount(
                      eachBalancePayment.amount,
                    )}`}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </Fragment>
      ) : null}
    </View>
  );
};
