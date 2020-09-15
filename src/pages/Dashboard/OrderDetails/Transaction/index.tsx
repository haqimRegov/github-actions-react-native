import moment from "moment";
import React, { Fragment, FunctionComponent, useState } from "react";

import { FileViewer, LabeledTitleProps } from "../../../../components";
import { Language, PAYMENT_DATE_FORMAT } from "../../../../constants";
import { fsTransformNone, fsUppercase } from "../../../../styles";
import { TransactionDetailsContent } from "./Details";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

declare interface TransactionDetailsProps {
  data: ITransactionDetails;
}

export const TransactionDetails: FunctionComponent<TransactionDetailsProps> = ({ data }: TransactionDetailsProps) => {
  const { transactionSummary, paymentSummary } = data;
  const [file, setFile] = useState<FileBase64>();

  const handleCloseViewer = () => {
    setFile(undefined);
  };
  const transactionSummaryDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_OMNI_REFERENCE, title: transactionSummary.omniReference },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE, title: transactionSummary.transactionDate! },
    {
      label: DASHBOARD_ORDER_DETAILS.LABEL_ADVISER_NAME_CODE,
      title: transactionSummary.adviserName,
      subtitle: transactionSummary.adviserCode,
    },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_KIB_BRANCH, title: transactionSummary.processingBranch },
  ];

  const paymentDetails: LabeledTitleProps[][] = [];
  if (paymentSummary !== undefined) {
    paymentSummary.map((payment) => {
      const handleFile = () => {
        setFile(payment.proof);
      };
      const transactionDate = moment(payment.transactionDate).format(PAYMENT_DATE_FORMAT);
      const newData: LabeledTitleProps[] = [
        { label: DASHBOARD_ORDER_DETAILS.LABEL_PAYMENT_METHOD, title: payment.paymentMethod },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_AMOUNT, title: `${payment.currency} ${payment.amount}`, titleStyle: fsUppercase },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_NAME_CODE, title: payment.bankName, subtitle: payment.bankCode },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_KIB_ACCOUNT_NO, title: payment.kibBankName, subtitle: payment.kibAccountNo },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DATE, title: transactionDate },
        {
          label: DASHBOARD_ORDER_DETAILS.LABEL_PROOF,
          title: payment.proof.name,
          titleIcon: "file",
          titleStyle: fsTransformNone,
          onPress: handleFile,
        },
      ];
      if (payment.remark !== undefined) {
        newData.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_REMARKS, title: payment.remark, titleStyle: fsTransformNone });
      }
      return paymentDetails.push(newData);
    });
  }

  return (
    <Fragment>
      <TransactionDetailsContent transactionSummary={transactionSummaryDetails} paymentSummary={paymentDetails} />
      {file !== undefined ? <FileViewer handleClose={handleCloseViewer} value={file} visible={file !== undefined} /> : null}
    </Fragment>
  );
};
