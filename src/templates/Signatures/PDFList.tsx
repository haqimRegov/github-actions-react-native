import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { ContentPage, CustomSpacer, IconText, SignatureUploadWithModal } from "../../components";
import { Language } from "../../constants";
import {
  borderBottomBlue5,
  colorBlue,
  flexChild,
  fs14BoldBlack2,
  fs14RegBlack2,
  px,
  rowCenterVertical,
  sh16,
  sh24,
  sh8,
  sw16,
  sw24,
  sw80,
} from "../../styles";
import { formatAmount, isArrayNotEmpty, isNotEmpty } from "../../utils";

const { PERSONAL_DETAILS, TERMS_AND_CONDITIONS } = Language.PAGE;

interface IPDFTemplateProps {
  accountHolder?: TypeAccountHolder;
  accountType: TypeAccountChoices;
  authorisedSignatory: string;
  declarations?: string[];
  details?: IClientDetailsState;
  handleBack: () => void;
  handleGetPDF: (receipt: IOnboardingReceiptState, index: number) => void;
  handleSubmit: () => void;
  receipts?: IOnboardingReceiptState[];
  setEditReceipt: (pdf: IOnboardingReceiptState | undefined) => void;
  transactionType: TTransactionType;
  updateReceipts: (receipts: IOnboardingReceiptState[]) => void;
}

export const PDFListTemplate: FunctionComponent<IPDFTemplateProps> = ({
  accountHolder,
  accountType,
  authorisedSignatory,
  declarations,
  details,
  handleBack,
  handleGetPDF,
  handleSubmit,
  receipts,
  setEditReceipt,
  transactionType,
  updateReceipts,
}: IPDFTemplateProps) => {
  const checkSignatory = () => {
    switch (authorisedSignatory) {
      case PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL_NEW:
      case PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL:
        return `${details!.principalHolder!.name} `;
      case PERSONAL_DETAILS.OPTION_CONTROL_BOTH_NEW:
      case PERSONAL_DETAILS.OPTION_CONTROL_BOTH:
        return `${details!.principalHolder!.name} ${TERMS_AND_CONDITIONS.LABEL_AND} ${details!.jointHolder!.name} `;
      case PERSONAL_DETAILS.OPTION_CONTROL_EITHER_NEW:
      case PERSONAL_DETAILS.OPTION_CONTROL_EITHER:
        return `${details!.principalHolder!.name} ${TERMS_AND_CONDITIONS.LABEL_OR} ${details!.jointHolder!.name} `;
      default:
        return `${details!.principalHolder!.name} `;
    }
  };

  const incompleteIndex = receipts !== undefined ? receipts.findIndex((receipt) => receipt.completed !== true) : 0;
  const buttonDisabled = incompleteIndex !== -1;

  const checkSignLabel =
    accountType === "Individual"
      ? `${details!.principalHolder!.name} `
      : `${details!.principalHolder!.name} ${TERMS_AND_CONDITIONS.LABEL_AND} ${details!.jointHolder!.name} `;

  const toSignLabel = transactionType === "Sales" ? checkSignatory() : checkSignLabel;

  const signIcon = accountType === "Individual" ? "account" : "account-joint";

  return (
    <ContentPage
      continueDisabled={buttonDisabled}
      handleCancel={handleBack}
      handleContinue={handleSubmit}
      labelContinue={TERMS_AND_CONDITIONS.BUTTON_SUBMIT}
      subheading={TERMS_AND_CONDITIONS.HEADING_SIGNATURE}
      subtitle={TERMS_AND_CONDITIONS.SUBTITLE_SIGNATURE}>
      <CustomSpacer space={sh24} />
      <View style={px(sw24)}>
        <View style={rowCenterVertical}>
          <IconText color={colorBlue._1} name={signIcon} text={toSignLabel} textStyle={fs14BoldBlack2} />
          <Text style={fs14RegBlack2}>{TERMS_AND_CONDITIONS.LABEL_TO_SIGN}</Text>
          <CustomSpacer isHorizontal={true} space={sw16} />
          <View style={{ ...borderBottomBlue5, ...flexChild }} />
        </View>
        <CustomSpacer space={sh16} />
        {isNotEmpty(receipts) &&
          receipts!.map((receipt: IOnboardingReceiptState, index: number) => {
            const handleEdit = () => {
              if (receipt.pdf === undefined) {
                handleGetPDF(receipt, index);
              } else {
                setEditReceipt(receipt);
              }
            };
            const handleRemove = () => {
              const updatedReceipts = [...receipts!];
              updatedReceipts[index] = {
                ...updatedReceipts[index],
                signedPdf: updatedReceipts[index].pdf,
                adviserSignature: undefined,
                principalSignature: undefined,
                jointSignature: undefined,
                completed: false,
              };
              updateReceipts(updatedReceipts);
            };
            const baseSignatureValid =
              "adviserSignature" in receipt &&
              receipt.adviserSignature !== undefined &&
              "principalSignature" in receipt &&
              receipt.principalSignature !== undefined;
            const completed =
              accountType === "Individual"
                ? baseSignatureValid
                : baseSignatureValid && "jointSignature" in receipt && receipt.jointSignature !== undefined;
            // const disable = receipt.completed !== true;
            // const disabled = index === 0 ? false : disabledCondition;
            const amountTitle =
              isNotEmpty(receipt) && isNotEmpty(receipt.orderTotalAmount)
                ? receipt.orderTotalAmount!.map((totalAmount) => `${totalAmount.currency} ${formatAmount(totalAmount.amount)}`).join(" + ")
                : "";
            const cashTitle = receipt.isEpf !== "true" && receipt.isScheduled !== "true" ? " Cash" : "";
            const epfTitle = receipt.isEpf === "true" ? " - EPF" : cashTitle;
            const recurringTitle = receipt.isScheduled === "true" ? " - Recurring" : "";
            const checkSubtitleRisk = accountHolder && accountHolder === "Joint" ? "" : `, ${"Risk Assessment"}`;
            const checkSubtitleDeclaration = declarations && isArrayNotEmpty(declarations) ? `, ${"Declarations"}` : "";
            const title =
              transactionType !== "CR"
                ? `${receipt.fundCount} ${receipt.fundType}${epfTitle}${recurringTitle} - ${amountTitle}`
                : `${TERMS_AND_CONDITIONS.UPLOAD_CARD_SUBTITLE}${checkSubtitleRisk}${checkSubtitleDeclaration}`;
            const fullOpacity = { opacity: 1 };

            return (
              <Fragment key={index}>
                <SignatureUploadWithModal
                  active={true}
                  buttonContainerStyle={completed === true ? undefined : { width: sw80 }}
                  completed={completed}
                  completedText={TERMS_AND_CONDITIONS.LABEL_COMPLETED}
                  disabled={false}
                  label={receipt.name}
                  onPressEdit={handleEdit}
                  onPressRemove={handleRemove}
                  onSuccess={() => {}}
                  resourceType="base64"
                  setValue={() => {}}
                  title={title}
                  tooltip={false}
                  onPress={handleEdit}
                  value={receipt.signedPdf}
                  containerStyle={fullOpacity}
                />
                <CustomSpacer space={sh8} />
              </Fragment>
            );
          })}
      </View>
    </ContentPage>
  );
};
