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

  if (isNotEmpty(accountDetails) && isNotEmpty(accountDetails!.operatingMode)) {
    accountDetailsSummary.push({
      label: ACCOUNT_INFORMATION.LABEL_AUTHORISED_SIGNATORY,
      title: accountDetails!.operatingMode!,
    });
  }

  const mailingAddressSummary: LabeledTitleProps[] = [];
  if (isNotEmpty(addressInformation)) {
    if (isNotEmpty(addressInformation.mailingAddress)) {
      if (isNotEmpty(addressInformation.mailingAddress.address)) {
        const mailingAddressLabel =
          isNotEmpty(addressInformation.mailingAddress.address.line2) ||
          isNotEmpty(addressInformation.mailingAddress.address.line3) ||
          isNotEmpty(addressInformation.mailingAddress.address.line4)
            ? `${ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS} 1`
            : ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS;

        mailingAddressSummary.push({
          label: mailingAddressLabel,
          title: addressInformation.mailingAddress.address.line1 || "-",
          titleStyle: fsTransformNone,
        });

        if (isNotEmpty(addressInformation.mailingAddress.address.line2)) {
          mailingAddressSummary.push({
            label: `${ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS} 2`,
            title: addressInformation.mailingAddress.address.line2 || "-",
            titleStyle: fsTransformNone,
          });
        }

        if (isNotEmpty(addressInformation.mailingAddress.address.line3)) {
          mailingAddressSummary.push({
            label: `${ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS} 3`,
            title: addressInformation.mailingAddress.address.line3! || "-",
            titleStyle: fsTransformNone,
          });
        }

        if (isNotEmpty(addressInformation.mailingAddress.address.line4)) {
          mailingAddressSummary.push({
            label: `${ACCOUNT_INFORMATION.LABEL_CORRESPONDENCE_ADDRESS} 4`,
            title: addressInformation.mailingAddress.address.line4! || "-",
            titleStyle: fsTransformNone,
          });
        }
      }
      mailingAddressSummary.push(
        { label: ACCOUNT_INFORMATION.LABEL_POSTCODE, title: addressInformation.mailingAddress.postCode },
        { label: ACCOUNT_INFORMATION.LABEL_CITY, title: addressInformation.mailingAddress.city },
        { label: ACCOUNT_INFORMATION.LABEL_STATE, title: addressInformation.mailingAddress.state },
        { label: ACCOUNT_INFORMATION.LABEL_COUNTRY, title: addressInformation.mailingAddress.country },
      );
    }
  }

  const localBankDetails: LabeledTitleProps[][] = [];
  if (bankInformation !== null && bankInformation !== undefined && bankInformation.localBank !== null) {
    bankInformation.localBank.forEach((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: ACCOUNT_INFORMATION.LABEL_CURRENCY, title: bank.currency.join(", "), titleStyle: fsUppercase },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_NAME, title: bank.bankName },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_ACCOUNT_NUMBER, title: bank.bankAccountNumber },
        {
          label: ACCOUNT_INFORMATION.LABEL_BANK_SWIFT,
          title: isNotEmpty(bank.bankSwiftCode) && bank.bankSwiftCode !== "" ? (bank.bankSwiftCode as string | undefined) : "-",
          titleStyle: fsTransformNone,
        },
      ];

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
        {
          label: ACCOUNT_INFORMATION.LABEL_BANK_SWIFT,
          title: isNotEmpty(bank.bankSwiftCode) && bank.bankSwiftCode !== "" ? (bank.bankSwiftCode as string | undefined) : "-",
          titleStyle: fsTransformNone,
        },
        { label: ACCOUNT_INFORMATION.LABEL_BANK_LOCATION, title: bank.bankLocation! },
      ];
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
