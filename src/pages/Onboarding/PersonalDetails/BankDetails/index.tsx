import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, OutlineButton } from "../../../../components";
import { Language } from "../../../../constants";
import { DICTIONARY_CURRENCY } from "../../../../data/dictionary";
import { colorBlue, fs12BoldBlue2, px, sh32, sh8, sw24 } from "../../../../styles";
import { ForeignBankDetails } from "./Foreign";
import { LocalBankDetails } from "./Local";

const { PERSONAL_DETAILS } = Language.PAGE;

interface IBankDetailsProps {
  foreignBankDetails: IBankDetailsState[];
  localBankDetails: IBankDetailsState[];
  setForeignBankDetails: (input: IBankDetailsState[]) => void;
  setLocalBankDetails: (input: IBankDetailsState[]) => void;
}

export const BankDetails: FunctionComponent<IBankDetailsProps> = ({
  foreignBankDetails,
  localBankDetails,
  setForeignBankDetails,
  setLocalBankDetails,
}: IBankDetailsProps) => {
  const initialLocalBankState: IBankDetailsState = {
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    bankSwiftCode: "",
    currency: [DICTIONARY_CURRENCY[0].value],
    otherBankName: "",
  };

  const initialForeignBankState: IBankDetailsState = {
    ...initialLocalBankState,
    bankLocation: "",
    currency: [""],
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
      <CustomSpacer space={spaceToButton} />
      <ForeignBankDetails bankingDetails={foreignBankDetails} setBankingDetails={setForeignBankDetails} />
      <View style={px(sw24)}>
        <OutlineButton
          buttonType="dashed"
          color={colorBlue._2}
          icon="plus"
          onPress={handleAddForeignBank}
          text={PERSONAL_DETAILS.BUTTON_ADD_FOREIGN}
          textStyle={fs12BoldBlue2}
        />
      </View>
    </View>
  );
};
