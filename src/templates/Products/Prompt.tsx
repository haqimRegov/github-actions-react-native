import React, { FunctionComponent } from "react";
import { Text } from "react-native";

import { ConfirmationModal } from "../../components";
import { Language } from "../../constants";
import { fs16RegGray6, sh56 } from "../../styles";

const { PRODUCT_LIST } = Language.PAGE;

interface ProductsPromptProps {
  handleCancel: () => void;
  handleContinue: () => void;
  prompt: "cancel" | "risk" | undefined;
}

export const ProductsPrompt: FunctionComponent<ProductsPromptProps> = ({ handleCancel, handleContinue, prompt }: ProductsPromptProps) => {
  const promptTitle = prompt === "cancel" ? PRODUCT_LIST.PROMPT_TITLE_CANCEL : PRODUCT_LIST.PROMPT_TITLE_RISK;
  const riskPromptText = prompt === "cancel" ? PRODUCT_LIST.PROMPT_LABEL_CANCEL : PRODUCT_LIST.PROMPT_LABEL_OUTSIDE_NEW;
  const promptText = prompt === "cancel" ? PRODUCT_LIST.PROMPT_LABEL_CANCEL : riskPromptText;
  return (
    <ConfirmationModal
      handleCancel={handleCancel}
      handleContinue={handleContinue}
      labelCancel={prompt === "risk" ? undefined : PRODUCT_LIST.BUTTON_NO}
      labelContinue={PRODUCT_LIST.BUTTON_YES}
      spaceToTitle={prompt === "cancel" ? undefined : sh56}
      title={promptTitle}
      visible={prompt !== undefined}>
      <Text style={fs16RegGray6}>{promptText}</Text>
    </ConfirmationModal>
  );
};
