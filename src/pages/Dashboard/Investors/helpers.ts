import moment from "moment";

import { DEFAULT_DATE_FORMAT, Language } from "../../../constants";
import { fsTransformNone, fsUppercase } from "../../../styles";
import { isNotEmpty } from "../../../utils";

const { ACCOUNT_INFORMATION } = Language.PAGE;

export const getStructuredAccountInformation = (account: IInvestorAccount) => {
  const { accountDetails, addressInformation, bankInformation } = account;

  const accountOpeningDate =
    accountDetails !== null && accountDetails.registrationDate !== null && accountDetails.registrationDate !== undefined
      ? moment(accountDetails.registrationDate, "x").format(DEFAULT_DATE_FORMAT)
      : "-";

  const accountDetailsSummary: LabeledTitleProps[] = [
    {
      label: ACCOUNT_INFORMATION.LABEL_ACCOUNT_TYPE,
      title: accountDetails !== null && accountDetails.accountType !== null ? accountDetails.accountType : "-",
    },
    {
      label: ACCOUNT_INFORMATION.LABEL_ACCOUNT_NUMBER,
      title:
        accountDetails !== null &&
        accountDetails.accountNumber !== undefined &&
        accountDetails.accountNumber !== null &&
        accountDetails.accountNumber?.length > 0
          ? accountDetails.accountNumber[0]
          : "-",
      titleStyle: fsTransformNone,
    },
    { label: ACCOUNT_INFORMATION.LABEL_ACCOUNT_OPENING, title: accountOpeningDate },
    {
      label: ACCOUNT_INFORMATION.LABEL_DISTRIBUTION,
      title: accountDetails !== null && accountDetails.distributionInstruction !== null ? accountDetails.distributionInstruction : "-",
    },
  ];

  const mailingAddressLabel =
    addressInformation!.mailingAddress!.address!.line2 !== undefined || addressInformation!.mailingAddress!.address!.line3 !== undefined
      ? `${ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS} 1`
      : ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS;

  const mailingAddressSummary: LabeledTitleProps[] = [
    { label: mailingAddressLabel, title: addressInformation!.mailingAddress!.address!.line1!, titleStyle: fsTransformNone },
    { label: ACCOUNT_INFORMATION.LABEL_POSTCODE, title: addressInformation!.mailingAddress!.postCode! },
    { label: ACCOUNT_INFORMATION.LABEL_CITY, title: addressInformation!.mailingAddress!.city! },
    { label: ACCOUNT_INFORMATION.LABEL_STATE, title: addressInformation!.mailingAddress!.state! },
    { label: ACCOUNT_INFORMATION.LABEL_COUNTRY, title: addressInformation!.mailingAddress!.country! },
  ];

  if (isNotEmpty(addressInformation!.mailingAddress!.address!.line2)) {
    mailingAddressSummary.splice(1, 0, {
      label: `${ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS} 2`,
      title: addressInformation!.mailingAddress!.address!.line2!,
      titleStyle: fsTransformNone,
    });
  }

  if (isNotEmpty(addressInformation!.mailingAddress!.address!.line3)) {
    const index = addressInformation!.mailingAddress!.address!.line2 !== undefined ? 2 : 1;
    mailingAddressSummary.splice(index, 0, {
      label: `${ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS} 3`,
      title: addressInformation!.mailingAddress!.address!.line3!,
      titleStyle: fsTransformNone,
    });
  }

  const localBankDetails: LabeledTitleProps[][] = [];
  if (bankInformation !== null && bankInformation !== undefined && bankInformation.localBank !== null) {
    bankInformation.localBank.forEach((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: ACCOUNT_INFORMATION.LABEL_CURRENCY, title: bank.currency.join(", "), titleStyle: fsUppercase },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_NAME, title: bank.bankName },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
      ];

      if (bank.bankSwiftCode !== null && bank.bankSwiftCode !== "") {
        newData.push({ label: ACCOUNT_INFORMATION.LABEL_BANK_SWIFT_OPTIONAL, title: bank.bankSwiftCode, titleStyle: fsTransformNone });
      }
      return localBankDetails.push(newData);
    });
  }

  const foreignBankDetails: LabeledTitleProps[][] = [];
  if (bankInformation !== null && bankInformation !== undefined && bankInformation.foreignBank !== null) {
    bankInformation.foreignBank.forEach((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: ACCOUNT_INFORMATION.LABEL_CURRENCY, title: bank.currency.join(", "), titleStyle: fsUppercase },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName, titleStyle: fsTransformNone },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_NAME, title: bank.bankName },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
      ];

      if (bank.bankLocation !== null) {
        newData.push({ label: ACCOUNT_INFORMATION.LABEL_BANK_LOCATION, title: bank.bankLocation });
      }
      if (bank.bankSwiftCode !== null && bank.bankSwiftCode !== "") {
        newData.push({ label: ACCOUNT_INFORMATION.LABEL_BANK_SWIFT, title: bank.bankSwiftCode, titleStyle: fsTransformNone });
      }
      return foreignBankDetails.push(newData);
    });
  }

  const localBankSection: ISummaryColorCardSection = {
    data: localBankDetails,
    iconName: "bank-new",
    text: ACCOUNT_INFORMATION.SECTION_LOCAL_BANK,
  };

  const foreignBankSection: ISummaryColorCardSection = {
    data: foreignBankDetails,
    iconName: "bank-new",
    text: ACCOUNT_INFORMATION.SECTION_FOREIGN_BANK,
    textWithCount: true,
  };

  const structuredData: IStructuredAccountInformation = {
    accountDetails: accountDetailsSummary,
    foreignBank: foreignBankSection,
    localBank: localBankSection,
    correspondenceAddress: mailingAddressSummary,
  };

  return structuredData;
};
