import React, { FunctionComponent, useState } from "react";

import { AccountSummary } from "../../../../templates";
import { structureProfile } from "../../../../utils";

declare interface AccountDetailsProps {
  data: IDashboardOrderSummary;
  setFile: (value?: FileBase64) => void;
}

export const AccountDetails: FunctionComponent<AccountDetailsProps> = ({ data, setFile }: AccountDetailsProps) => {
  const { profile, transactionDetails } = data;
  const [accountHolder, setAccountHolder] = useState<TypeAccountHolder>("Principal");

  const accountHolderIndex = accountHolder === "Principal" ? 0 : 1;
  const { accountType, accountOperationMode, registrationDate } = transactionDetails;
  const { idNumber, idType, name } = profile[accountHolderIndex];
  const updatedProfile = {
    ...profile[accountHolderIndex],
    accountType: accountType,
    registrationDate: registrationDate,
    accountOperationMode: accountOperationMode,
  };

  const structuredData = structureProfile(accountHolder, updatedProfile, setFile);

  return (
    <AccountSummary
      accountHolder={accountHolder}
      accountType={accountType}
      data={structuredData}
      idNumber={idNumber}
      idType={idType}
      name={name}
      setAccountHolder={setAccountHolder}
    />
  );
};
