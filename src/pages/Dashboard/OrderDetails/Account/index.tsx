import React, { Fragment, FunctionComponent, useState } from "react";

import { FileViewer, LabeledTitleProps } from "../../../../components";
import { Language } from "../../../../constants";
import { fsTransformNone, fsUppercase } from "../../../../styles";
import { AccountDetailsContent } from "./Details";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

declare interface AccountDetailsProps {
  data: IAccountDetails;
}

export interface IStructuredData {
  accountSummaryDetails: LabeledTitleProps[];
  contactDetails: LabeledTitleProps[];
  employmentDetails: LabeledTitleProps[];
  epfDetails: LabeledTitleProps[];
  fatcaCrsDetails: LabeledTitleProps[];
  foreignBankDetails: LabeledTitleProps[][];
  id: string;
  idProof: FileBase64;
  isJoint: boolean;
  localBankDetails: LabeledTitleProps[][];
  mailingAddress: IAddress;
  name: string;
  permanentAddress: IAddress;
  profilePic?: FileBase64;
  uploadDocuments: LabeledTitleProps[];
}

export const AccountDetails: FunctionComponent<AccountDetailsProps> = ({ data }: AccountDetailsProps) => {
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const [toggle, setToggle] = useState<boolean>(false);

  const accountHolder = toggle === true && data.joint !== undefined ? data.joint : data.principal;
  const { accountSummary, contactDetails, addressInfo, epfDetails, employmentInfo, bankSummary, fatcaCRS, uploads } = accountHolder;

  const handleCertificate = () => {
    setFile(fatcaCRS.fatcaProof);
  };

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const accountSummaryDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_DOB, title: accountSummary.dob },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_SALUTATION, title: accountSummary.salutation },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_GENDER, title: accountSummary.gender },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_NATIONALITY, title: accountSummary.nationality },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_RISK_PROFILE, title: accountSummary.riskProfile },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_BIRTH_PLACE, title: accountSummary.birthPlace },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_BIRTH_COUNTRY, title: accountSummary.birthCountry },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_MOTHERS_NAME, title: accountSummary.motherName },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_MARITAL_STATUS, title: accountSummary.maritalStatus },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_EDUCATION_LEVEL, title: accountSummary.educationLevel },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_VIEW_ACCESS, title: accountSummary.viewAccess! },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_REGISTER_DATE, title: accountSummary.registrationDate },
  ];

  const indexUpdate = accountSummary.nationality === "Malaysia" ? 2 : 0;

  if (accountSummary.race !== undefined) {
    accountSummaryDetails.splice(4 + indexUpdate, 0, {
      label: DASHBOARD_ORDER_DETAILS.LABEL_BUMIPUTERA,
      title: accountSummary.bumiputera!,
    });
    accountSummaryDetails.splice(5 + indexUpdate, 0, { label: DASHBOARD_ORDER_DETAILS.LABEL_RACE, title: accountSummary.race });
  }
  if (accountSummary.accountType !== undefined) {
    accountSummaryDetails.splice(10 + indexUpdate, 0, {
      label: DASHBOARD_ORDER_DETAILS.LABEL_ACCOUNT_TYPE,
      title: accountSummary.accountType,
    });
  }
  if (accountSummary.operationMode !== undefined) {
    accountSummaryDetails.splice(11 + indexUpdate, 0, {
      label: DASHBOARD_ORDER_DETAILS.LABEL_OPERATION_MODE,
      title: accountSummary.operationMode,
    });
  }
  if (accountSummary.relationWithJoint !== undefined) {
    accountSummaryDetails.splice(12 + indexUpdate, 0, {
      label: DASHBOARD_ORDER_DETAILS.LABEL_RELATION_WITH_JOINT,
      title: accountSummary.relationWithJoint,
    });
  }

  const permanentAddressInfo: IAddress = {
    address: addressInfo.permanentAddress.address,
    postCode: addressInfo.permanentAddress.postCode,
    city: addressInfo.permanentAddress.city,
    state: addressInfo.permanentAddress.state,
    country: addressInfo.permanentAddress.country,
  };

  const mailingAddressInfo: IAddress = {
    address: addressInfo.mailingAddress.address,
    postCode: addressInfo.mailingAddress.postCode,
    city: addressInfo.mailingAddress.city,
    state: addressInfo.mailingAddress.state,
    country: addressInfo.mailingAddress.country,
  };

  const epfSummary: LabeledTitleProps[] = [];
  if (epfDetails !== undefined) {
    epfSummary.push(
      { label: DASHBOARD_ORDER_DETAILS.LABEL_EPF_NUMBER, title: epfDetails.epfNumber },
      { label: DASHBOARD_ORDER_DETAILS.LABEL_EPF_ACCOUNT_TYPE, title: epfDetails.epfAccountType },
    );
  }

  const contactSummary: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_EMAIL, title: contactDetails.email },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_MOBILE, title: contactDetails.mobile },
  ];

  if (contactDetails.home !== undefined) {
    contactSummary.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_HOME, title: contactDetails.home });
  }
  if (contactDetails.office !== undefined) {
    contactSummary.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_OFFICE, title: contactDetails.office });
  }
  if (contactDetails.fax !== undefined) {
    contactSummary.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_FAX, title: contactDetails.fax });
  }

  const employmentDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_OCCUPATION, title: employmentInfo.occupation },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_EMPLOYER_NAME, title: employmentInfo.employerName },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_NATURE_BUSINESS, title: employmentInfo.businessNature },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_MONTHLY_INCOME, title: employmentInfo.monthlyIncome },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_EMPLOYER_ADDRESS, title: employmentInfo.employerAddress },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_POST_CODE, title: employmentInfo.postCode },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_CITY, title: employmentInfo.city },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_STATE, title: employmentInfo.state },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_COUNTRY, title: employmentInfo.country },
  ];

  if (employmentInfo.grossAnnualIncome !== undefined) {
    employmentDetails.splice(4, 0, { label: DASHBOARD_ORDER_DETAILS.LABEL_GROSS_INCOME, title: employmentInfo.grossAnnualIncome });
  }

  const localBankDetails: LabeledTitleProps[][] = [];
  if (bankSummary.localBank !== undefined) {
    bankSummary.localBank.map((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: DASHBOARD_ORDER_DETAILS.LABEL_CURRENCY, title: bank.currency, titleStyle: fsUppercase },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NAME, title: bank.accountName },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_NAME_CODE, title: bank.bankName, subtitle: bank.bankCode },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NO, title: bank.accountNo },
      ];
      if (bank.swiftCode !== undefined) {
        newData.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_SWIFT_CODE, title: bank.swiftCode });
      }
      if (bank.location !== undefined) {
        newData.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_LOCATION, title: bank.location });
      }
      return localBankDetails.push(newData);
    });
  }

  const foreignBankDetails: LabeledTitleProps[][] = [];
  if (bankSummary.foreignBank !== undefined) {
    bankSummary.foreignBank.map((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: DASHBOARD_ORDER_DETAILS.LABEL_CURRENCY, title: bank.currency, titleStyle: fsUppercase },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NAME, title: bank.accountName },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_NAME_CODE, title: bank.bankName, subtitle: bank.bankCode },
        { label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_ACCOUNT_NO, title: bank.accountNo },
      ];
      if (bank.swiftCode !== undefined) {
        newData.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_SWIFT_CODE, title: bank.swiftCode });
      }
      if (bank.location !== undefined) {
        newData.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_BANK_LOCATION, title: bank.location });
      }
      return foreignBankDetails.push(newData);
    });
  }

  const fatcaCrs: LabeledTitleProps[] = [
    { label: DASHBOARD_ORDER_DETAILS.LABEL_US_CITIZEN, title: fatcaCRS.usCitizen },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_US_BORN, title: fatcaCRS.usBorn },
    { label: DASHBOARD_ORDER_DETAILS.LABEL_RESIDENT, title: fatcaCRS.malaysiaResident },
  ];

  if (fatcaCRS.fatcaProof !== undefined) {
    fatcaCrs.push({
      label: DASHBOARD_ORDER_DETAILS.LABEL_CERTIFICATE_NATIONALITY,
      title: fatcaCRS.fatcaProof!.name,
      titleIcon: "file",
      titleStyle: fsTransformNone,
      onPress: handleCertificate,
    });
  } else if (fatcaCRS.fatcaReason !== undefined) {
    fatcaCrs.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_CERTIFICATE_REASON, title: fatcaCRS.fatcaReason });
  }

  fatcaCrs.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_CRS, title: fatcaCRS.crs });

  if (fatcaCRS.tin !== undefined) {
    fatcaCRS.tin.map((tin) => {
      if (tin.tinResidence !== undefined) {
        fatcaCrs.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_TIN_RESIDENCE, title: tin.tinResidence });
      }
      if (tin.tinNo !== undefined) {
        fatcaCrs.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_TIN, title: tin.tinNo });
      }
      if (tin.tinReasons !== undefined) {
        fatcaCrs.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_TIN_REASON, title: tin.tinReasons });
      }
      if (tin.tinRemark !== undefined) {
        fatcaCrs.push({ label: DASHBOARD_ORDER_DETAILS.LABEL_TIN_REMARKS, title: tin.tinRemark });
      }
      return fatcaCrs;
    });
  }

  const uploadDocuments: LabeledTitleProps[] = [];

  if (uploads !== undefined) {
    Object.keys(uploads).map((key) => {
      const handleFile = () => {
        setFile(uploads![key]);
      };
      const newData: LabeledTitleProps = {
        label: key,
        title: uploads![key].name,
        titleIcon: "file",
        titleStyle: fsTransformNone,
        onPress: handleFile,
      };

      return uploadDocuments.push(newData);
    });
  }

  const profilePic = accountHolder.profilePic !== undefined ? accountHolder.profilePic : undefined;
  const structuredData: IStructuredData = {
    accountSummaryDetails: accountSummaryDetails,
    contactDetails: contactSummary,
    employmentDetails: employmentDetails,
    epfDetails: epfSummary,
    fatcaCrsDetails: fatcaCrs,
    foreignBankDetails: foreignBankDetails,
    id: accountHolder.id,
    idProof: accountHolder.idProof,
    isJoint: data.joint !== undefined,
    localBankDetails: localBankDetails,
    mailingAddress: mailingAddressInfo,
    name: accountHolder.name,
    permanentAddress: permanentAddressInfo,
    profilePic: profilePic,
    uploadDocuments: uploadDocuments,
  };

  return (
    <Fragment>
      <AccountDetailsContent data={structuredData} handleFile={setFile} handleToggle={handleToggle} toggle={toggle} />
      {file !== undefined ? <FileViewer handleClose={handleCloseViewer} value={file} visible={file !== undefined} /> : null}
    </Fragment>
  );
};
