import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, OutlineButton } from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_CURRENCY } from "../../../../data/dictionary";
import { fs12RegBlack2, px, sh32, sh8, sw24 } from "../../../../styles";
import { ForeignBankDetails } from "./Foreign";
import { LocalBankDetails } from "./Local";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IBankDetailsProps {
  foreignBankDetails: IBankingDetails[];
  localBankDetails: IBankingDetails[];
  setForeignBankDetails: (input: IBankingDetails[]) => void;
  setLocalBankDetails: (input: IBankingDetails[]) => void;
}

export const initialLocalBankState: IBankingDetails = {
  accountName: "",
  accountNumber: "",
  bankName: "",
  currency: [DICTIONARY_CURRENCY[0].value],
  otherBankName: "",
};

export const initialForeignBankState: IBankingDetails = {
  ...initialLocalBankState,
  currency: [""],
};

export const BankDetails: FunctionComponent<IBankDetailsProps> = ({
  foreignBankDetails,
  localBankDetails,
  setForeignBankDetails,
  setLocalBankDetails,
}: IBankDetailsProps) => {
  const handleAddLocalBank = () => {
    const bankingDetailsClone = [...localBankDetails, { ...initialLocalBankState }];
    setLocalBankDetails(bankingDetailsClone);
  };

  const handleAddForeignBank = () => {
    const bankingDetailsClone = [...foreignBankDetails, { ...initialForeignBankState }];
    setForeignBankDetails(bankingDetailsClone);
  };

  return (
    <View>
      <LocalBankDetails bankingDetails={localBankDetails} setBankingDetails={setLocalBankDetails} />
      <ForeignBankDetails bankingDetails={foreignBankDetails} setBankingDetails={setForeignBankDetails} />
      <View style={px(sw24)}>
        <OutlineButton icon="plus" onPress={handleAddLocalBank} text={PERSONAL_DETAILS.BUTTON_ADD_LOCAL} textStyle={fs12RegBlack2} />
        <CustomSpacer space={sh8} />
        <OutlineButton icon="plus" onPress={handleAddForeignBank} text={PERSONAL_DETAILS.BUTTON_ADD_FOREIGN} textStyle={fs12RegBlack2} />
      </View>
      <CustomSpacer space={sh32} />
    </View>
  );
};
