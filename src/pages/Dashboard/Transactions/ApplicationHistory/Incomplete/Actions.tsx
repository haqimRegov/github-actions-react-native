import React, { FunctionComponent } from "react";
import { View, ViewStyle } from "react-native";

import { IconText } from "../../../../../components";
import { Language } from "../../../../../constants/language";
import { borderBottomGray2, fs12BoldBlue1, px, sh48, sw16, sw200, sw8 } from "../../../../../styles";
import { isNotEmpty } from "../../../../../utils";

const { DASHBOARD_HOME } = Language.PAGE;

interface PendingOrderActionsProps extends ITableOptions {
  handleSelectOrder: (order: IDashboardOrder) => void;
  handleResubmitOrder: (orderNumber: string) => void;
  setScreen: (route: TransactionsPageType) => void;
  setCurrentOrder: (order: IDashboardOrder) => void;
}

export const PendingOrderActions: FunctionComponent<PendingOrderActionsProps> = ({
  data,
  handleSelectOrder,
  handleResubmitOrder,
  onClose,
  setCurrentOrder,
  setScreen,
}: PendingOrderActionsProps) => {
  const { canProceed, isScheduled, orderNumber, reason, remark, status, withHardcopy } = data.rawData as unknown as IDashboardOrder;

  const canSubmitHardcopy = isScheduled === true ? canProceed === true : true;

  const handlePrintSubmissionSummary = () => {
    onClose();
    setTimeout(() => {
      handleSelectOrder(data.rawData as unknown as IDashboardOrder);
    }, 300);
  };

  const handleResubmit = () => {
    handleResubmitOrder(orderNumber);
    onClose();
  };

  const handleViewOrder = () => {
    setCurrentOrder(data.rawData as unknown as IDashboardOrder);
    setScreen("OrderSummary");
    onClose();
  };

  const handleUploadDocs = () => {
    setCurrentOrder(data.rawData as unknown as IDashboardOrder);
    setScreen("UploadDocuments");
    onClose();
  };

  const handleSubmitHardCopy = () => {
    setCurrentOrder(data.rawData as unknown as IDashboardOrder);
    setScreen("UploadHardCopy");
    onClose();
  };

  const handleUploadPayment = () => {
    setCurrentOrder(data.rawData as unknown as IDashboardOrder);
    setScreen("DashboardPayment");
    onClose();
  };

  const itemStyle: ViewStyle = {
    ...borderBottomGray2,
    ...fs12BoldBlue1,
    ...px(sw16),
    height: sh48,
    width: sw200,
  };

  const labelUploadPayment = isScheduled ? DASHBOARD_HOME.LABEL_UPLOAD_RECURRING : DASHBOARD_HOME.LABEL_UPLOAD_PROOF;

  const findPaymentReason =
    isNotEmpty(reason) === true
      ? reason.findIndex((eachReason) => eachReason.title === "Invalid Proof of Payment:" && eachReason.isSubmitted === true)
      : -1;

  const isReroutedPaymentSubmitted = findPaymentReason !== -1;

  return (
    <View style={{ borderRadius: sw8 }}>
      <IconText name="eye-show" onPress={handleViewOrder} style={itemStyle} text="View Details" />
      {status === "Pending Payment" ||
      status === "Pending Doc & Payment" ||
      ((status === "BR - Rerouted" || status === "HQ - Rerouted") &&
        remark &&
        remark.findIndex((eachRemark) => eachRemark.label === "Payment" || eachRemark.label === "Others") !== -1 &&
        isReroutedPaymentSubmitted === false) ? (
        <IconText name="upload" onPress={handleUploadPayment} style={itemStyle} text={labelUploadPayment} />
      ) : null}
      {status === "Pending Doc" ||
      status === "Pending Doc & Payment" ||
      ((status === "BR - Rerouted" || status === "HQ - Rerouted") &&
        remark &&
        remark.findIndex((eachRemark) => eachRemark.label === "Document" || eachRemark.label === "Others") !== -1) ? (
        <IconText name="upload" onPress={handleUploadDocs} style={itemStyle} text={DASHBOARD_HOME.LABEL_UPLOAD} />
      ) : null}
      {status === "Pending Physical Doc" && canSubmitHardcopy === true ? (
        <IconText name="file" onPress={handleSubmitHardCopy} style={itemStyle} text={DASHBOARD_HOME.LABEL_SUBMIT_PHYSICAL} />
      ) : null}
      {/* <IconText
        name="print"
        onPress={handlePrintAccountOpening}
        style={itemStyle}
        text={DASHBOARD_HOME.LABEL_PRINT_ACCOUNT_OPENING}
      /> */}
      {status === "Submitted" && withHardcopy === true ? (
        <IconText
          name="print"
          onPress={handlePrintSubmissionSummary}
          style={itemStyle}
          text={DASHBOARD_HOME.LABEL_PRINT_SUBMISSION_SUMMARY}
        />
      ) : null}
      {status === "BR - Rerouted" || status === "HQ - Rerouted" ? (
        <IconText name="print" onPress={handleResubmit} style={itemStyle} text={DASHBOARD_HOME.LABEL_RESUBMIT_ORDER} />
      ) : null}
    </View>
  );
};
