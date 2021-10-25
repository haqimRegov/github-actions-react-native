import React, { Fragment, FunctionComponent, useState } from "react";

import { LabeledTitleProps } from "../../../../../components";
import { structureProfile } from "../../../../../utils/ProfileStructuring";
import { AccountDetailsContent } from "./Details";

declare interface AccountDetailsProps {
  data: IDashboardOrderSummary;
  setFile: (value?: FileBase64) => void;
}

export interface IStructuredData {
  accountDocuments: LabeledTitleProps[];
  accountSummaryDetails: LabeledTitleProps[];
  contactDetails: LabeledTitleProps[];
  employmentDetails: LabeledTitleProps[];
  epfDetails: LabeledTitleProps[];
  declarations: {
    crs: LabeledTitleProps[];
    fatca: LabeledTitleProps[];
    fea: LabeledTitleProps[];
  };
  foreignBankDetails: LabeledTitleProps[][];
  localBankDetails: LabeledTitleProps[][];
  mailingAddress: IAddressState;
  permanentAddress: IAddressState;
  profilePic?: FileBase64;
  showJointToggle?: boolean;
}

export const AccountDetails: FunctionComponent<AccountDetailsProps> = ({ data, setFile }: AccountDetailsProps) => {
  const { profile, transactionDetails } = data;
  const [accountHolder, setAccountHolder] = useState<TypeAccountHolder>("Principal");

  const accountHolderIndex = accountHolder === "Principal" ? 0 : 1;
  const { accountType, accountOperationMode, registrationDate } = transactionDetails;
  const { idNumber, idType, name, uploadedDocument } = profile[accountHolderIndex];
  const updatedProfile = {
    ...profile[accountHolderIndex],
    accountType: accountType,
    registrationDate: registrationDate,
    accountOperationMode: accountOperationMode,
  };

  const structuredData = structureProfile(accountHolder, updatedProfile, setFile);

  const handleViewId = () => {
    setFile(uploadedDocument[0]);
  };

  return (
    <Fragment>
      <AccountDetailsContent
        accountHolder={accountHolder}
        accountType={accountType}
        data={structuredData}
        handleViewId={handleViewId}
        idNumber={idNumber}
        idType={idType}
        name={name}
        setAccountHolder={setAccountHolder}
      />
    </Fragment>
  );
};
