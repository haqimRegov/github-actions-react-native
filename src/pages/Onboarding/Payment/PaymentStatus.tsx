import React, { FunctionComponent, useState } from "react";
import { Image, Text, View } from "react-native";

import { LocalAssets } from "../../../assets/LocalAssets";
import { CheckBox, ConfirmationModal, CustomSpacer, Tag } from "../../../components";
import { Language } from "../../../constants";
import {
  alignSelfStart,
  borderBottomBlack1,
  centerHV,
  flexRow,
  fs16BoldBlack1,
  fs16SemiBoldBlack1,
  fs24BlackBlack2,
  fs24BoldBlue2,
  fsAlignCenter,
  sh24,
  sh32,
  sh4,
  sh56,
  sh8,
  sw176,
  sw8,
} from "../../../styles";

const { PAYMENT } = Language.PAGE;

interface PaymentStatusProps {
  handleResetOnboarding: () => void;
  result?: ISubmitProofOfPaymentsResult;
  setPaymentResult: (value?: ISubmitProofOfPaymentsResult) => void;
}
export const PaymentStatus: FunctionComponent<PaymentStatusProps> = ({
  handleResetOnboarding,
  result,
  setPaymentResult,
}: PaymentStatusProps) => {
  const [prompt, setPrompt] = useState<"status" | "message" | undefined>("status");
  const [toggle, setToggle] = useState<boolean>(false);

  const handleCheckbox = () => {
    setToggle(!toggle);
  };
  const handleCancel = () => {
    setPrompt("status");
    setPaymentResult(undefined);
  };

  const handleContinue = () => {
    if (prompt === "status") {
      return setPrompt("message");
    }
    if (prompt === "message") {
      handleResetOnboarding();
    }
    return null;
  };
  return (
    <View>
      <ConfirmationModal
        continueDisabled={!toggle}
        handleCancel={prompt === "message" ? undefined : handleCancel}
        handleContinue={handleContinue}
        labelContinue={prompt === "message" ? PAYMENT.BUTTON_DONE : undefined}
        visible={result !== undefined}>
        {prompt === "message" ? (
          <View style={centerHV}>
            <CustomSpacer space={sh24} />
            <Image source={LocalAssets.illustration.orderReceived} style={{ height: sw176, width: sw176 }} />
            <CustomSpacer space={sh8} />
            <Text style={{ ...fs24BoldBlue2, ...fsAlignCenter }}>{result?.message}</Text>
          </View>
        ) : (
          <View>
            <Text style={{ ...fs24BlackBlack2 }}>{PAYMENT.PROMPT_TITLE_STATUS}</Text>
            <View style={borderBottomBlack1} />
            <CustomSpacer space={sh24} />
            {result !== undefined &&
              result.orders.map((order: ISubmitProofOfPaymentResultOrder, index: number) => {
                return (
                  <View key={index}>
                    <View style={flexRow}>
                      <Text style={fs16BoldBlack1}>{order.orderNumber}</Text>
                      <CustomSpacer isHorizontal={true} space={sw8} />
                      <Tag color={order.status === "Completed" ? "secondary" : "warning"} text={order.status} />
                    </View>
                    <View>
                      {order.remarks.map((remark, remarkIndex) => {
                        return (
                          <Text key={remarkIndex} style={fs16SemiBoldBlack1}>
                            {remark}
                          </Text>
                        );
                      })}
                    </View>
                    {result.orders.length === 1 ? null : <CustomSpacer space={sh32} />}
                  </View>
                );
              })}
            {result !== undefined && result.account.status !== null ? (
              <View>
                <CustomSpacer space={sh32} />
                <View style={flexRow}>
                  <Text style={fs16BoldBlack1}>{PAYMENT.LABEL_ACCOUNT}</Text>
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <Tag color={result?.account.status === "Completed" ? "secondary" : "warning"} text={result!.account.status} />
                </View>
                <View>
                  {result!.account.remarks.map((remark, remarkIndex) => {
                    return (
                      <Text key={remarkIndex} style={fs16SemiBoldBlack1}>
                        {remark}
                      </Text>
                    );
                  })}
                </View>
                <CustomSpacer space={sh32} />
              </View>
            ) : null}
            <CustomSpacer space={sh56} />
            <CheckBox
              checkboxStyle={{ ...alignSelfStart, marginTop: sh4 }}
              onPress={handleCheckbox}
              label={PAYMENT.CHECKBOX_LABEL}
              toggle={toggle}
            />
          </View>
        )}
      </ConfirmationModal>
    </View>
  );
};
