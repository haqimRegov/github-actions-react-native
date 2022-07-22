import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { BasicModal, CustomSpacer, Loading, NewPrompt, SubmissionSummaryPrompt } from "../../components";
import { Language } from "../../constants";
import { centerHV, colorWhite, fsAlignLeft, fullHeight, fullHW, sh16 } from "../../styles";
import { formatAmount } from "../../utils";
import { SubmissionSummaryCollapsible } from "../OrderSubmission";

const { PAYMENT } = Language.PAGE;

interface NewPaymentPromptProps {
  buttonLoading: boolean;
  handleCancel: () => void;
  handleConfirm: () => Promise<void | true>;
  promptType?: "summary" | "success";
  result?: ISubmitProofOfPaymentsResult;
  visible: boolean;
}

export const NewPaymentPrompt: FunctionComponent<NewPaymentPromptProps> = ({
  buttonLoading,
  handleCancel,
  handleConfirm,
  promptType,
  result,
  visible,
}: NewPaymentPromptProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const checkNonPendingOrder =
    result !== undefined && result.orders.findIndex((order) => order.status === "Completed" || order.status === "Submitted") !== -1;
  const allOrdersSubmitted =
    result !== undefined && result.orders.findIndex((order) => order.status !== "Completed" && order.status !== "Submitted") === -1;

  const handleCheckbox = () => {
    setToggle(!toggle);
  };

  const handleCancelPrompt = () => {
    if (toggle === true) {
      setToggle(false);
    }
    handleCancel();
  };

  const illustration = checkNonPendingOrder === true ? LocalAssets.illustration.orderReceived : LocalAssets.illustration.orderSaved;
  let message = "";

  if (checkNonPendingOrder === true) {
    if (allOrdersSubmitted === true) {
      message =
        result !== undefined && result.orders.length === 1
          ? `${result.orders[0].orderNumber} ${PAYMENT.PROMPT_TITLE_SUBMITTED_SINGLE}`
          : PAYMENT.PROMPT_TITLE_SUBMITTED;
    } else {
      message = PAYMENT.PROMPT_TITLE_ORDER;
    }
  } else {
    message =
      result !== undefined && result.orders.length === 1
        ? `${result.orders[0].orderNumber} ${PAYMENT.PROMPT_TITLE_SAVED_SINGLE}`
        : PAYMENT.PROMPT_TITLE_SAVED;
  }

  const subtitles =
    result !== undefined && result.withFloating === true ? PAYMENT.PROMPT_SUBTITLE_PENDING_EXCESS : PAYMENT.PROMPT_SUBTITLE_PENDING;

  const submissionSummary: ISubmissionSummaryOrder[] =
    result !== undefined
      ? result.orders.map((eachOrder) => {
          const amount = eachOrder.totalPayment.map((eachAmount) => `${eachAmount.currency} ${formatAmount(eachAmount.amount)}`);
          const excessAmount = eachOrder.excessAmount.map((eachAmount) => `${eachAmount.currency} ${formatAmount(eachAmount.amount)}`);
          const softcopyDocuments: ISubmissionSummaryRemarks[] = eachOrder.docList.map((doc) => ({ ...doc, otherRemarks: undefined }));
          const totalPayment: ISubmissionSummaryRemarks[] =
            eachOrder.totalPayment.length === 0 ||
            (eachOrder.totalPayment.length === 1 && eachOrder.totalPayment[0].amount === null) ||
            (eachOrder.totalPayment.length === 1 && eachOrder.totalPayment[0].currency === null)
              ? []
              : [{ title: "Total Payment", otherRemarks: excessAmount, remarks: amount }];
          const remarks: ISubmissionSummaryRemarks[] = softcopyDocuments.concat(totalPayment);
          return { orderNumber: eachOrder.orderNumber, status: eachOrder.status, remarks: remarks };
        })
      : [];

  return (
    <BasicModal backdropOpacity={0.65} visible={visible}>
      <View style={{ ...centerHV, ...fullHW }}>
        {result === undefined ? (
          <Loading color={colorWhite._1} style={fullHeight} />
        ) : (
          <Fragment>
            {promptType === "summary" ? (
              <SubmissionSummaryPrompt
                checkbox={{ label: PAYMENT.CHECKBOX_NEW_SALES, onPress: handleCheckbox, toggle: toggle }}
                primary={{ disabled: !toggle, loading: buttonLoading, onPress: handleConfirm }}
                secondary={{ onPress: handleCancelPrompt }}
                title={PAYMENT.PROMPT_TITLE_STATUS_NEW}>
                <View>
                  <CustomSpacer space={sh16} />
                  <SubmissionSummaryCollapsible data={submissionSummary} />
                </View>
              </SubmissionSummaryPrompt>
            ) : (
              <NewPrompt
                illustration={illustration}
                primary={{ onPress: handleConfirm, text: PAYMENT.BUTTON_DASHBOARD }}
                subtitle={(result !== undefined && result.withHardcopy === true) || checkNonPendingOrder === false ? subtitles : undefined}
                subtitleStyle={fsAlignLeft}
                title={message}
              />
            )}
          </Fragment>
        )}
      </View>
    </BasicModal>
  );
};
