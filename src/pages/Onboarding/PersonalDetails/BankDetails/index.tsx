import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer } from "../../../../components";
import { sh32 } from "../../../../styles";
import { ForeignBankDetails } from "./Foreign";
import { LocalBankDetails } from "./Local";

interface IBankDetailsProps {
  bankNames: TypeLabelValue[];
  foreignBankDetails: IBankDetailsState[];
  localBankDetails: IBankDetailsState[];
  investmentCurrencies: string[];
  setForeignBankDetails: (input: IBankDetailsState[]) => void;
  setLocalBankDetails: (input: IBankDetailsState[]) => void;
}

export const BankDetails: FunctionComponent<IBankDetailsProps> = ({
  bankNames,
  foreignBankDetails,
  localBankDetails,
  investmentCurrencies,
  setForeignBankDetails,
  setLocalBankDetails,
}: IBankDetailsProps) => {
  const spaceToButton = foreignBankDetails.length !== 0 ? sh32 : 0;

  return (
    <View>
      <LocalBankDetails
        bankingDetails={localBankDetails}
        bankNames={bankNames}
        investmentCurrencies={investmentCurrencies}
        setBankingDetails={setLocalBankDetails}
      />
      <CustomSpacer space={spaceToButton} />
      <ForeignBankDetails
        bankingDetails={foreignBankDetails}
        bankNames={bankNames}
        investmentCurrencies={investmentCurrencies}
        setBankingDetails={setForeignBankDetails}
      />
    </View>
  );
};
