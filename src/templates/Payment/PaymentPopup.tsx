import React, { FunctionComponent, useState } from "react";
import { Image, LayoutChangeEvent, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { ActionButtons, CheckBox, CustomSpacer, Loading, RNModal, StatusBadge, TextSpaceArea } from "../../components";
import { Language } from "../../constants";
import {
  alignSelfStart,
  borderBottomBlue5,
  centerHV,
  colorBlack,
  colorBlue,
  colorWhite,
  flexRow,
  flexRowCC,
  flexWrap,
  fs10RegGray6,
  fs12RegGray6,
  fs16BoldBlack2,
  fs16RegGray6,
  fs24BoldBlue1,
  fsAlignCenter,
  fullHW,
  imageContain,
  px,
  sh16,
  sh24,
  sh32,
  sh4,
  sh403,
  sh56,
  sh8,
  sh96,
  sw10,
  sw136,
  sw320,
  sw400,
  sw452,
  sw5,
  sw56,
  sw565,
  sw588,
  sw752,
  sw8,
} from "../../styles";

const { PAYMENT } = Language.PAGE;

interface PaymentPopupProps {
  handleCancel: () => void;
  handleConfirm: () => Promise<void | true>;
  loading: boolean;
  result?: ISubmitProofOfPaymentsResult;
  withExcess?: boolean;
}

export const PaymentPopup: FunctionComponent<PaymentPopupProps> = ({
  handleCancel,
  handleConfirm,
  loading,
  result,
  withExcess,
}: PaymentPopupProps) => {
  const [prompt, setPrompt] = useState<"status" | "message" | undefined>("status");
  const [toggle, setToggle] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [multipleColumn, setMultipleColumn] = useState<boolean>(false);
  const checkNonPendingOrder =
    result !== undefined && result.orders.findIndex((order) => order.status === "Completed" || order.status === "Submitted") !== -1;
  const allOrdersSubmitted =
    result !== undefined && result.orders.findIndex((order) => order.status !== "Completed" && order.status !== "Submitted") === -1;

  const handleCheckbox = () => {
    setToggle(!toggle);
  };

  const handleCancelPrompt = () => {
    setButtonLoading(false);
    handleCancel();
  };

  const handleContinue = async () => {
    setButtonLoading(true);
    const response = await handleConfirm();
    if (prompt === "status" && response === true) {
      setButtonLoading(false);
      return setPrompt("message");
    }
    if (prompt === "message") {
      return setPrompt("status");
    }

    return null;
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height >= sh403) {
      setMultipleColumn(true);
    } else {
      setMultipleColumn(false);
    }
  };

  const widthStyle = multipleColumn === true && prompt === "status" ? { width: sw752 } : {};
  const hintTextStyle = multipleColumn === true ? { width: sw588 } : {};
  const illustration = checkNonPendingOrder === true ? LocalAssets.illustration.orderReceived : LocalAssets.illustration.orderSaved;
  const submittedMessage = allOrdersSubmitted === true ? PAYMENT.PROMPT_TITLE_SUBMITTED : PAYMENT.PROMPT_TITLE_ORDER;
  const message = checkNonPendingOrder === true ? submittedMessage : PAYMENT.PROMPT_TITLE_SAVED;

  const subtitles = withExcess === true ? PAYMENT.PROMPT_SUBTITLE_PENDING_EXCESS : PAYMENT.PROMPT_SUBTITLE_PENDING;
  const excessSubtitle =
    withExcess === true ? (
      <TextSpaceArea spaceToTop={sh16} style={{ ...fs16RegGray6, ...fsAlignCenter }} text={PAYMENT.PROMPT_SUBTITLE_SUBMITTED_EXCESS} />
    ) : null;

  const modalContainer: ViewStyle = {
    backgroundColor: colorBlue._2,
    borderRadius: sw5,
    width: sw565,
    minWidth: sw565,
    ...widthStyle,
  };

  const buttonContainer: ViewStyle = {
    ...flexRowCC,
    ...px(sw56),
    backgroundColor: colorWhite._1,
    borderBottomLeftRadius: sw10,
    borderBottomRightRadius: sw10,
    height: sh96,
  };

  const modalStyle = result !== undefined ? undefined : { backgroundColor: colorBlack._1_4 };

  return (
    <RNModal animationType="fade" style={modalStyle} visible={loading}>
      <View style={{ ...centerHV, ...fullHW }}>
        {result !== undefined ? (
          <View style={modalContainer}>
            <View style={{ ...px(sw56) }}>
              <CustomSpacer space={sh32} />
              {prompt === "message" ? (
                <View style={{ ...centerHV, width: sw452 }}>
                  <CustomSpacer space={sh24} />
                  <Image source={illustration} style={{ ...imageContain, height: sw136, width: sw136 }} />
                  <TextSpaceArea spaceToTop={sh8} style={{ ...fs24BoldBlue1, ...fsAlignCenter }} text={message} />
                  {checkNonPendingOrder === true && allOrdersSubmitted === true ? (
                    excessSubtitle
                  ) : (
                    <TextSpaceArea spaceToTop={sh16} style={fs10RegGray6} text={subtitles} />
                  )}
                </View>
              ) : (
                <View>
                  <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh24} style={fs24BoldBlue1} text={PAYMENT.PROMPT_TITLE_STATUS} />
                  <View style={borderBottomBlue5} />
                  <CustomSpacer space={sh16} />
                  <View onLayout={handleLayout} style={{ maxHeight: sh403, ...flexWrap }}>
                    {result !== undefined &&
                      result.orders.map((order: ISubmitProofOfPaymentResultOrder, index: number) => {
                        return (
                          <View key={index} style={{ width: sw320 }}>
                            <View style={flexRow}>
                              <Text style={fs16BoldBlack2}>{order.orderNumber}</Text>
                              <CustomSpacer isHorizontal={true} space={sw8} />
                              <StatusBadge
                                color={order.status === "Completed" || order.status === "Submitted" ? "complete" : "warning"}
                                text={order.status === "Completed" || order.status === "Submitted" ? "Completed" : order.status}
                              />
                            </View>
                            <CustomSpacer space={sh4} />
                            <View>
                              {order.remarks.map((remark, remarkIndex) => {
                                return (
                                  <Text key={remarkIndex} style={fs12RegGray6}>
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
                          <Text style={fs16BoldBlack2}>{PAYMENT.LABEL_ACCOUNT}</Text>
                          <CustomSpacer isHorizontal={true} space={sw8} />
                          <StatusBadge
                            color={result.account.status === "Completed" ? "complete" : "warning"}
                            text={result.account.status}
                          />
                        </View>
                        <View>
                          {result.account.remarks.map((remark, remarkIndex) => {
                            return (
                              <Text key={remarkIndex} style={fs12RegGray6}>
                                {remark}
                              </Text>
                            );
                          })}
                        </View>
                        <CustomSpacer space={sh24} />
                      </View>
                    ) : null}
                  </View>
                  {checkNonPendingOrder === true ? (
                    <View style={{ width: sw452, ...hintTextStyle }}>
                      <CustomSpacer space={sh8} />
                      <CheckBox
                        checkboxStyle={{ ...alignSelfStart, marginTop: sh4 }}
                        onPress={handleCheckbox}
                        label={PAYMENT.PROMPT_CHECKBOX_LABEL}
                        toggle={toggle}
                        style={{ width: sw400, ...hintTextStyle }}
                      />
                    </View>
                  ) : null}
                </View>
              )}
              <CustomSpacer space={checkNonPendingOrder === true ? sh56 : sh32} />
            </View>
            <ActionButtons
              buttonContainerStyle={buttonContainer}
              continueDisabled={checkNonPendingOrder === true ? !toggle : false}
              continueLoading={buttonLoading}
              handleCancel={prompt === "message" ? undefined : handleCancelPrompt}
              handleContinue={handleContinue}
              labelContinue={prompt === "message" ? PAYMENT.BUTTON_DASHBOARD : PAYMENT.BUTTON_CONFIRM}
            />
          </View>
        ) : (
          <Loading color={colorWhite._1} />
        )}
      </View>
    </RNModal>
  );
};
