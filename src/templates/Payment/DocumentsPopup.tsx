import React, { FunctionComponent, useState } from "react";
import { Image, LayoutChangeEvent, Text, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { ActionButtons, CheckBox, CustomSpacer, Loading, RNModal, StatusBadge, TextSpaceArea } from "../../components";
import { Language } from "../../constants";
import {
  borderBottomBlue5,
  centerHV,
  colorBlack,
  colorBlue,
  colorWhite,
  flexRow,
  flexRowCC,
  flexWrap,
  fs16BoldBlack2,
  fs16RegBlack2,
  fs16RegGray6,
  fs24BoldBlue1,
  fsAlignCenter,
  fullHW,
  imageContain,
  px,
  sh16,
  sh24,
  sh32,
  sh40,
  sh403,
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

const { PAYMENT, UPLOAD_HARD_COPY_DOCUMENTS } = Language.PAGE;

interface DocumentPopupProps {
  handleBack: () => void;
  handleCancel: () => void;
  handleConfirm: () => Promise<void | true>;
  loading: boolean;
  result?: ISubmitHardCopyDocumentsResult;
  subtitle?: string;
}

export const DocumentsPopup: FunctionComponent<DocumentPopupProps> = ({
  handleBack,
  handleCancel,
  handleConfirm,
  loading,
  result,
  subtitle,
}: DocumentPopupProps) => {
  const [prompt, setPrompt] = useState<"status" | "message" | undefined>("status");
  const [toggle, setToggle] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [multipleColumn, setMultipleColumn] = useState<boolean>(false);

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
      handleCancelPrompt();
      handleBack();
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
  const illustration = LocalAssets.illustration.orderReceived;
  const orderList = result?.orders.map((eachOrder: ISubmitHardCopyResult) => eachOrder.orderNumber).join(",");

  const title =
    result?.orders !== undefined && result.orders.length > 1
      ? `${orderList} ${UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HAVE_BEEN_SUBMITTED_SUCCESSFULLY}`
      : `${orderList} ${UPLOAD_HARD_COPY_DOCUMENTS.LABEL_HAS_BEEN_SUBMITTED_SUCCESSFULLY}`;

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
                  <TextSpaceArea spaceToTop={sh16} style={{ ...fs24BoldBlue1, ...fsAlignCenter }} text={title} />
                  {subtitle !== undefined ? (
                    <TextSpaceArea spaceToTop={sh16} style={{ ...fs16RegGray6, ...fsAlignCenter }} text={subtitle} />
                  ) : null}
                </View>
              ) : (
                <View>
                  <TextSpaceArea spaceToBottom={sh8} spaceToTop={sh24} style={fs24BoldBlue1} text={PAYMENT.PROMPT_TITLE_STATUS} />
                  <View style={borderBottomBlue5} />
                  <CustomSpacer space={sh16} />
                  <View onLayout={handleLayout} style={{ maxHeight: sh403, ...flexWrap }}>
                    {result !== undefined &&
                      result.orders.map((order: ISubmitHardCopyResult, index: number) => {
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
                            <CustomSpacer space={sh24} />
                          </View>
                        );
                      })}
                  </View>
                  <View style={{ width: sw452, ...hintTextStyle }}>
                    <CustomSpacer space={sh8} />
                    <CheckBox
                      onPress={handleCheckbox}
                      label={UPLOAD_HARD_COPY_DOCUMENTS.LABEL_CHECKBOX}
                      labelStyle={fs16RegBlack2}
                      toggle={toggle}
                      style={{ width: sw400, ...hintTextStyle }}
                    />
                  </View>
                </View>
              )}
              <CustomSpacer space={sh40} />
            </View>
            <ActionButtons
              buttonContainerStyle={buttonContainer}
              continueDisabled={!toggle}
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
