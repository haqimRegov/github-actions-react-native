import React, { Fragment, FunctionComponent, useState } from "react";
import { ActivityIndicator, Image, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { ActionButtons, CheckBox, CustomSpacer, RNModal, Tag, TextSpaceArea } from "../../components";
import { Language } from "../../constants";
import {
  alignSelfStart,
  borderBottomBlack1,
  centerHV,
  colorWhite,
  flexRow,
  flexRowCC,
  flexWrap,
  fs12BoldBlack2,
  fs12RegBlack2,
  fs16BoldBlack1,
  fs16SemiBoldBlack1,
  fs24BlackBlack2,
  fs24BoldBlue2,
  fsAlignCenter,
  fullHW,
  px,
  sh16,
  sh24,
  sh32,
  sh392,
  sh4,
  sh56,
  sh8,
  sh96,
  sw10,
  sw176,
  sw218,
  sw320,
  sw328,
  sw452,
  sw5,
  sw56,
  sw565,
  sw8,
} from "../../styles";

const { PAYMENT } = Language.PAGE;

interface PaymentPopupProps {
  handleDone: () => void;
  loading: boolean;
  result?: ISubmitProofOfPaymentsResult;
}
export const PaymentPopup: FunctionComponent<PaymentPopupProps> = ({ handleDone, loading, result }: PaymentPopupProps) => {
  const [prompt, setPrompt] = useState<"status" | "message" | undefined>("status");
  const [toggle, setToggle] = useState<boolean>(false);

  const checkNonPendingOrder =
    result !== undefined && result.orders.findIndex((order) => order.status === "Completed" || order.status === "Submitted") !== -1;
  const allOrdersSubmitted =
    result !== undefined && result.orders.findIndex((order) => order.status !== "Completed" && order.status !== "Submitted") === -1;

  const handleCheckbox = () => {
    setToggle(!toggle);
  };

  const handleContinue = () => {
    if (prompt === "status") {
      return setPrompt("message");
    }
    if (prompt === "message") {
      handleDone();
      setPrompt("status");
    }
    return null;
  };

  const widthStyle = result !== undefined && result.orders.length > 5 ? { width: undefined } : {};
  const illustration = checkNonPendingOrder === true ? LocalAssets.illustration.orderReceived : LocalAssets.illustration.orderSaved;
  const submittedMessage = allOrdersSubmitted === true ? PAYMENT.PROMPT_TITLE_SUBMITTED : PAYMENT.PROMPT_TITLE_ORDER;
  const message = checkNonPendingOrder === true ? submittedMessage : PAYMENT.PROMPT_TITLE_SAVED;

  const subtitles = result?.withFloating === true ? PAYMENT.PROMPT_SUBTITLE_PENDING_FLOATING : PAYMENT.PROMPT_SUBTITLE_PENDING;
  const floatingSubtitle =
    result?.withFloating === true ? (
      <TextSpaceArea spaceToTop={sh16} style={fs12RegBlack2} text={PAYMENT.PROMPT_SUBTITLE_SUBMITTED_FLOATING} />
    ) : null;

  const modalContainer: ViewStyle = {
    backgroundColor: colorWhite._4,
    borderRadius: sw5,
    width: sw565,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._2,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
  };

  return (
    <RNModal animationType="fade" visible={loading}>
      <View style={{ ...centerHV, ...fullHW }}>
        {result !== undefined ? (
          <View style={modalContainer}>
            <View style={{ ...px(sw56) }}>
              <CustomSpacer space={sh32} />
              {prompt === "message" ? (
                <View style={{ ...centerHV, width: sw452 }}>
                  <CustomSpacer space={sh24} />
                  <Image source={illustration} style={{ height: sw176, width: sw176 }} />
                  <TextSpaceArea spaceToTop={sh8} style={{ ...fs24BoldBlue2, ...fsAlignCenter }} text={message} />
                  {checkNonPendingOrder === true && allOrdersSubmitted === true ? (
                    floatingSubtitle
                  ) : (
                    <TextSpaceArea spaceToTop={sh16} style={fs12RegBlack2} text={subtitles} />
                  )}
                </View>
              ) : (
                <View>
                  <TextSpaceArea spaceToBottom={sh8} style={fs24BlackBlack2} text={PAYMENT.PROMPT_TITLE_STATUS} />
                  <View style={borderBottomBlack1} />
                  <CustomSpacer space={sh16} />
                  <View style={{ maxHeight: sh392, ...flexWrap }}>
                    {result !== undefined &&
                      result.orders.map((order: ISubmitProofOfPaymentResultOrder, index: number) => {
                        return (
                          <View key={index} style={{ width: sw320 }}>
                            <View style={flexRow}>
                              <Text style={fs16BoldBlack1}>{order.orderNumber}</Text>
                              <CustomSpacer isHorizontal={true} space={sw8} />
                              <Tag
                                color={order.status === "Completed" || order.status === "Submitted" ? "secondary" : "warning"}
                                text={order.status === "Completed" || order.status === "Submitted" ? "Completed" : order.status}
                              />
                            </View>
                            <View>
                              {order.remarks.map((remark, remarkIndex) => {
                                return (
                                  <Text key={remarkIndex} style={fs12RegBlack2}>
                                    {remark}
                                  </Text>
                                );
                              })}
                            </View>
                            <CustomSpacer space={sh24} />
                          </View>
                        );
                      })}
                    {result !== undefined && result.account !== null ? (
                      <View style={{ width: sw320 }}>
                        <View style={flexRow}>
                          <Text style={fs16BoldBlack1}>{PAYMENT.LABEL_ACCOUNT}</Text>
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <Tag color={result.account.status === "Completed" ? "secondary" : "warning"} text={result.account.status} />
                        </View>
                        <View>
                          {result.account.remarks.map((remark, remarkIndex) => {
                            return (
                              <Text key={remarkIndex} style={fs16SemiBoldBlack1}>
                                {remark}
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                    ) : null}
                  </View>
                  {checkNonPendingOrder === true ? (
                    <Fragment>
                      <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh24} style={fs12RegBlack2} text={PAYMENT.PROMPT_HINT} />
                      <CheckBox
                        checkboxStyle={{ ...alignSelfStart, marginTop: sh4 }}
                        onPress={handleCheckbox}
                        label={PAYMENT.PROMPT_CHECKBOX_LABEL}
                        labelStyle={fs12BoldBlack2}
                        toggle={toggle}
                        style={{ width: sw328, ...widthStyle }}
                      />
                    </Fragment>
                  ) : null}
                </View>
              )}
              <CustomSpacer space={sh56} />
            </View>
            <ActionButtons
              buttonContainerStyle={buttonContainer}
              continueButtonStyle={{ width: sw218 }}
              continueDisabled={checkNonPendingOrder === true ? !toggle : false}
              handleContinue={handleContinue}
              labelContinue={prompt === "message" ? PAYMENT.BUTTON_DASHBOARD : undefined}
            />
          </View>
        ) : (
          <ActivityIndicator color={colorWhite._1} size="small" />
        )}
      </View>
    </RNModal>
  );
};
