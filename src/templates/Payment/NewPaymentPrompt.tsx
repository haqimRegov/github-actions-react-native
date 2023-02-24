import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { BasicModal, CustomSpacer, Loading, NewPrompt, SubmissionSummaryPrompt } from "../../components";
import { Language } from "../../constants";
import { DICTIONARY_ORDER_STATUS } from "../../data/dictionary";
import { centerHV, colorWhite, fsAlignLeft, fullHeight, fullHW, sh16 } from "../../styles";
import { formatAmount, isArrayNotEmpty, isNotEmpty } from "../../utils";
import { SubmissionSummaryCollapsible } from "../OrderSubmission";

const { PAYMENT, SUBMISSION_SUMMARY } = Language.PAGE;

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

  const checkRerouted =
    result !== undefined &&
    result.orders.filter(
      (eachResult: ISubmitProofOfPaymentResultOrder) =>
        eachResult.status === DICTIONARY_ORDER_STATUS.reroutedBr || eachResult.status === DICTIONARY_ORDER_STATUS.reroutedHq,
    ).length > 0;
  const checkExcessRerouted =
    checkRerouted === true ? PAYMENT.PROMPT_SUBTITLE_PENDING_EXCESS_REROUTED : PAYMENT.PROMPT_SUBTITLE_PENDING_EXCESS;
  const checkPendingRerouted = checkRerouted === true ? PAYMENT.PROMPT_SUBTITLE_PENDING_REROUTED : PAYMENT.PROMPT_SUBTITLE_PENDING;
  const subtitles = result !== undefined && result.withFloating === true ? checkExcessRerouted : checkPendingRerouted;

  const checkSubtitles =
    (result !== undefined && result.withFloating === true) ||
    (result !== undefined && result.withHardcopy === true) ||
    allOrdersSubmitted === false
      ? subtitles
      : undefined;
  const checkAllOrdersSubmitted = allOrdersSubmitted === true ? PAYMENT.PROMPT_SUBTITLE_SUCCESS : checkSubtitles;

  const submissionSummary: ISubmissionSummaryOrder[] =
    result !== undefined
      ? result.orders.map((eachOrder) => {
          const amount = eachOrder.totalPayment.map((eachAmount) => `${eachAmount.currency} ${formatAmount(eachAmount.amount)}`);
          const excessAmount = eachOrder.excessAmount.map((eachAmount) =>
            isNotEmpty(eachAmount) ? `+ ${eachAmount.currency} ${formatAmount(eachAmount.amount)}` : "",
          );
          const totalPayment: ISubmissionSummaryRemarks[] =
            eachOrder.totalPayment.length === 0 ||
            (eachOrder.totalPayment.length === 1 && eachOrder.totalPayment[0].amount === null) ||
            (eachOrder.totalPayment.length === 1 && eachOrder.totalPayment[0].currency === null)
              ? []
              : [{ title: SUBMISSION_SUMMARY.TITLE_PAYMENT, otherRemarks: excessAmount, remarks: amount }];

          const findSoftcopy = eachOrder.docList.findIndex((eachDocList) => eachDocList.title === "Softcopy Documents");

          const softcopyDocList = findSoftcopy !== -1 ? eachOrder.docList[findSoftcopy] : undefined;
          let softcopyDocs: string[] = [];

          if (softcopyDocList !== undefined) {
            const principalSoftcopy: string[] = [];
            const jointSoftcopy: string[] = [];
            const bothSoftcopy: string[] = [];

            softcopyDocList.remarks.principalHolder.forEach((eachPrincipalDoc) => {
              if (softcopyDocList.remarks.jointHolder.includes(eachPrincipalDoc)) {
                // softcopy is for both
                bothSoftcopy.push(eachPrincipalDoc);
              } else {
                // softcopy is for principal
                principalSoftcopy.push(eachPrincipalDoc);
              }
            });

            softcopyDocList.remarks.jointHolder.forEach((eachJointDoc) => {
              if (softcopyDocList.remarks.principalHolder.includes(eachJointDoc)) {
                if (bothSoftcopy.includes(eachJointDoc) === false) {
                  // softcopy is for both
                  bothSoftcopy.push(eachJointDoc);
                }
              } else {
                // softcopy is for joint
                jointSoftcopy.push(eachJointDoc);
              }
            });

            const principalDocs = principalSoftcopy.map((eachDoc) =>
              isArrayNotEmpty(jointSoftcopy) ? `${SUBMISSION_SUMMARY.LABEL_PRINCIPAL} ${eachDoc}` : eachDoc,
            );
            const jointDocs = jointSoftcopy.map((eachDoc) => `${SUBMISSION_SUMMARY.LABEL_JOINT} ${eachDoc}`);
            const bothDocs = bothSoftcopy.map((eachDoc) => `${SUBMISSION_SUMMARY.LABEL_PRINCIPAL_JOINT} ${eachDoc}`);

            softcopyDocs = principalDocs.concat(jointDocs).concat(bothDocs);
          }

          const softcopyDocuments: ISubmissionSummaryRemarks[] = isArrayNotEmpty(softcopyDocs)
            ? [{ title: SUBMISSION_SUMMARY.TITLE_SOFTCOPY, remarks: softcopyDocs }]
            : [];

          const remarks: ISubmissionSummaryRemarks[] = softcopyDocuments.concat(
            eachOrder.paymentType === "Recurring" && isNotEmpty(eachOrder.totalRecurring)
              ? [{ title: SUBMISSION_SUMMARY.TITLE_RECURRING, remarks: [eachOrder.totalRecurring] }]
              : totalPayment,
          );

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
                checkbox={
                  allOrdersSubmitted === true ? { label: PAYMENT.CHECKBOX_NEW_SALES, onPress: handleCheckbox, toggle: toggle } : undefined
                }
                primary={{ disabled: allOrdersSubmitted === true && !toggle, loading: buttonLoading, onPress: handleConfirm }}
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
                subtitle={checkAllOrdersSubmitted}
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
