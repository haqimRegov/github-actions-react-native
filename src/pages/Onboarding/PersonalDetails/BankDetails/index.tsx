import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, OutlineButton } from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_CURRENCY } from "../../../../data/dictionary";
import { px, sh32, sh8, sw24 } from "../../../../styles";
import { ForeignBankDetails } from "./Foreign";
import { LocalBankDetails } from "./Local";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IBankDetailsProps {
  foreignBankDetails: IBankingDetails[];
  localBankDetails: IBankingDetails[];
  setForeignBankDetails: (input: IBankingDetails[]) => void;
  setLocalBankDetails: (input: IBankingDetails[]) => void;
}

export const BankDetails: FunctionComponent<IBankDetailsProps> = ({
  foreignBankDetails,
  localBankDetails,
  setForeignBankDetails,
  setLocalBankDetails,
}: IBankDetailsProps) => {
  const initialLocalBankState: IBankingDetails = {
    accountName: "",
    accountNumber: "",
    bankName: "",
    currency: [DICTIONARY_CURRENCY[0].value],
    otherBankName: "",
  };

  const initialForeignBankState: IBankingDetails = {
    ...initialLocalBankState,
    currency: [""],
  };

  const handleAddLocalBank = () => {
    const bankingDetailsClone = [...localBankDetails];
    bankingDetailsClone.push(initialLocalBankState);
    setLocalBankDetails(bankingDetailsClone);
  };

  const handleAddForeignBank = () => {
    const bankingDetailsClone = [...foreignBankDetails];
    bankingDetailsClone.push(initialForeignBankState);
    setForeignBankDetails(bankingDetailsClone);
  };

  const spaceToButton = foreignBankDetails.length !== 0 ? sh32 : sh8;

  return (
    <View>
      <LocalBankDetails bankingDetails={localBankDetails} setBankingDetails={setLocalBankDetails} />
      <View style={px(sw24)}>
        <OutlineButton icon="plus" onPress={handleAddLocalBank} text={PERSONAL_DETAILS.BUTTON_ADD_LOCAL} />
      </View>
      <CustomSpacer space={spaceToButton} />
      <ForeignBankDetails bankingDetails={foreignBankDetails} setBankingDetails={setForeignBankDetails} />
      <View style={px(sw24)}>
        <OutlineButton icon="plus" onPress={handleAddForeignBank} text={PERSONAL_DETAILS.BUTTON_ADD_FOREIGN} />
      </View>
      <CustomSpacer space={sh32} />
    </View>
  );
};
