import moment from "moment";

import { LabeledTitleProps } from "../components";
import { PAYMENT_DATE_FORMAT } from "../constants";
import { Language } from "../constants/language";
import { OPTIONS_CRS_TAX_RESIDENCY } from "../data/dictionary";
import { IStructuredData } from "../pages/Dashboard/Transactions/OrderSummary/Account";
import { fsTransformNone, fsUppercase, sh16, sh4, sw200 } from "../styles";

const { DASHBOARD_PROFILE } = Language.PAGE;

export const structureProfile = (accountHolder: TypeAccountHolder, data: IOrderSummaryProfile, setFile: (value?: FileBase64) => void) => {
  const {
    idType,
    registrationDate,
    accountOperationMode,
    accountType,
    addressInformation,
    bankInformation,
    contactDetails,
    declaration,
    employmentInformation,
    epfDetails,
    personalDetails,
    uploadedDocument,
  } = data;
  const { fatca, crs } = declaration;
  const accountSummaryDetails: LabeledTitleProps[] = [
    { label: DASHBOARD_PROFILE.LABEL_DATE_OF_BIRTH, title: personalDetails.dateOfBirth },
    { label: DASHBOARD_PROFILE.LABEL_SALUTATION, title: personalDetails.salutation },
    { label: DASHBOARD_PROFILE.LABEL_GENDER, title: personalDetails.gender },
    { label: DASHBOARD_PROFILE.LABEL_NATIONALITY, title: personalDetails.nationality },
    { label: DASHBOARD_PROFILE.LABEL_RISK_PROFILE, title: personalDetails.riskProfile || "-" },
    { label: DASHBOARD_PROFILE.LABEL_PLACE_OF_BIRTH, title: personalDetails.placeOfBirth, titleStyle: fsTransformNone },
    { label: DASHBOARD_PROFILE.LABEL_COUNTRY_OF_BIRTH, title: personalDetails.countryOfBirth },
    { label: DASHBOARD_PROFILE.LABEL_MOTHERS_NAME, title: personalDetails.mothersMaidenName },
    { label: DASHBOARD_PROFILE.LABEL_MARITAL_STATUS, title: personalDetails.maritalStatus },
    { label: DASHBOARD_PROFILE.LABEL_EDUCATION_LEVEL, title: personalDetails.educationLevel, titleStyle: fsTransformNone },
    { label: DASHBOARD_PROFILE.LABEL_ACCOUNT_TYPE, title: accountType! },
    {
      label: DASHBOARD_PROFILE.LABEL_REGISTRATION,
      title: moment(registrationDate, "x").format(PAYMENT_DATE_FORMAT),
    },
  ];

  if (personalDetails.race !== null && personalDetails.bumiputera !== null) {
    accountSummaryDetails.splice(
      3,
      0,
      {
        label: DASHBOARD_PROFILE.LABEL_BUMIPUTERA,
        title: personalDetails.bumiputera,
      },
      { label: DASHBOARD_PROFILE.LABEL_RACE, title: personalDetails.race },
    );
  }

  if (accountType === "Joint") {
    accountSummaryDetails.splice(-1, 0, {
      label: DASHBOARD_PROFILE.LABEL_SIGNATURE,
      title: accountOperationMode!,
    });
  }

  if (accountType === "Joint" && accountHolder === "Principal") {
    accountSummaryDetails.splice(-1, 0, {
      label: DASHBOARD_PROFILE.LABEL_RELATIONSHIP,
      title: personalDetails.relationship,
    });
  }

  const epfSummary: LabeledTitleProps[] = [];
  if (epfDetails !== null) {
    epfSummary.push(
      { label: DASHBOARD_PROFILE.LABEL_EPF_MEMBER, title: epfDetails.epfMemberNumber },
      { label: DASHBOARD_PROFILE.LABEL_EPF_ACCOUNT_TYPE, title: epfDetails.epfAccountType },
    );
  }

  if (personalDetails.monthlyHouseholdIncome) {
    accountSummaryDetails.splice(accountSummaryDetails.length - 1, 0, {
      label: DASHBOARD_PROFILE.LABEL_MONTHLY_INCOME,
      title: personalDetails.monthlyHouseholdIncome,
      titleStyle: fsTransformNone,
    });
  }

  const contactSummary: LabeledTitleProps[] = [];

  if (contactDetails.email) {
    contactSummary.push({ label: DASHBOARD_PROFILE.LABEL_EMAIL, title: contactDetails.email, titleStyle: fsTransformNone });
  }

  if (contactDetails.mobileNumber) {
    contactSummary.push({ label: DASHBOARD_PROFILE.LABEL_MOBILE, title: contactDetails.mobileNumber });
  }

  if (contactDetails.homeNumber !== null) {
    contactSummary.push({ label: DASHBOARD_PROFILE.LABEL_HOME, title: contactDetails.homeNumber });
  }
  if (contactDetails.officeNumber !== null) {
    contactSummary.push({ label: DASHBOARD_PROFILE.LABEL_OFFICE, title: contactDetails.officeNumber });
  }
  if (contactDetails.faxNumber !== null) {
    contactSummary.push({ label: DASHBOARD_PROFILE.LABEL_FAX, title: contactDetails.faxNumber });
  }

  let employmentDetails: LabeledTitleProps[] = [];
  if (employmentInformation !== null) {
    const employmentAddress = employmentInformation.address ? Object.values(employmentInformation.address.address!).join(" ") : "";

    employmentDetails = [
      { label: DASHBOARD_PROFILE.LABEL_OCCUPATION, title: employmentInformation.occupation, titleStyle: fsTransformNone },
      { label: DASHBOARD_PROFILE.LABEL_EMPLOYER_NAME, title: employmentInformation.nameOfEmployer, titleStyle: fsTransformNone },
      { label: DASHBOARD_PROFILE.LABEL_NATURE_BUSINESS, title: employmentInformation.natureOfBusiness, titleStyle: fsTransformNone },
      { label: DASHBOARD_PROFILE.LABEL_EMPLOYER_ADDRESS, title: employmentAddress, titleStyle: fsTransformNone },
      { label: DASHBOARD_PROFILE.LABEL_POSTCODE, title: employmentInformation.address.postCode! },
      { label: DASHBOARD_PROFILE.LABEL_CITY, title: employmentInformation.address.city! },
      { label: DASHBOARD_PROFILE.LABEL_STATE, title: employmentInformation.address.state! },
      { label: DASHBOARD_PROFILE.LABEL_COUNTRY, title: employmentInformation.address.country! },
    ];

    if (employmentInformation.annualIncome) {
      employmentDetails.splice(3, 0, {
        label: DASHBOARD_PROFILE.LABEL_GROSS,
        title: employmentInformation.annualIncome,
        titleStyle: fsTransformNone,
      });
    }
  }

  const localBankDetails: LabeledTitleProps[][] = [];
  if (accountHolder === "Principal" && bankInformation.localBank !== null) {
    bankInformation.localBank.forEach((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: DASHBOARD_PROFILE.LABEL_CURRENCY, title: bank.currency.join(", "), titleStyle: fsUppercase },
        { label: DASHBOARD_PROFILE.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName },
        { label: DASHBOARD_PROFILE.LABEL_BANK_NAME, title: bank.bankName },
        { label: DASHBOARD_PROFILE.LABEL_BANK_ACCOUNT_NO, title: bank.bankAccountNumber },
      ];

      if (bank.bankLocation !== null) {
        newData.push({ label: DASHBOARD_PROFILE.LABEL_BANK_LOCATION, title: bank.bankLocation });
      }
      if (bank.bankSwiftCode !== null && bank.bankSwiftCode !== "") {
        newData.push({ label: DASHBOARD_PROFILE.LABEL_BANK_SWIFT, title: bank.bankSwiftCode, titleStyle: fsTransformNone });
      }
      return localBankDetails.push(newData);
    });
  }

  const foreignBankDetails: LabeledTitleProps[][] = [];
  if (accountHolder === "Principal" && bankInformation.foreignBank !== null) {
    bankInformation.foreignBank.forEach((bank) => {
      const newData: LabeledTitleProps[] = [
        { label: DASHBOARD_PROFILE.LABEL_CURRENCY, title: bank.currency.join(", "), titleStyle: fsUppercase },
        { label: DASHBOARD_PROFILE.LABEL_BANK_ACCOUNT_NAME, title: bank.bankAccountName, titleStyle: fsTransformNone },
        { label: DASHBOARD_PROFILE.LABEL_BANK_NAME, title: bank.bankName },
        { label: DASHBOARD_PROFILE.LABEL_BANK_ACCOUNT_NO, title: bank.bankAccountNumber },
      ];

      if (bank.bankLocation !== null) {
        newData.push({ label: DASHBOARD_PROFILE.LABEL_BANK_LOCATION, title: bank.bankLocation });
      }
      if (bank.bankSwiftCode !== null && bank.bankSwiftCode !== "") {
        newData.push({ label: DASHBOARD_PROFILE.LABEL_BANK_SWIFT, title: bank.bankSwiftCode, titleStyle: fsTransformNone });
      }
      return foreignBankDetails.push(newData);
    });
  }

  const isTaxResident = crs.taxResident === OPTIONS_CRS_TAX_RESIDENCY[0];

  const fatcaSummary: LabeledTitleProps[] = [{ label: DASHBOARD_PROFILE.LABEL_CITIZENSHIP, title: fatca.usCitizen as string }];

  // const feaSummary: LabeledTitleProps[] = [
  //   { label: DASHBOARD_PROFILE.LABEL_MALAYSIAN_RESIDENT, title: fea.resident as string },
  //   { label: DASHBOARD_PROFILE.LABEL_FACILITY, title: fea.borrowingFacility as string },
  //   { label: DASHBOARD_PROFILE.LABEL_BALANCE, title: fea.balance || "-" },
  // ];

  if (fatca.usCitizen === "No") {
    fatcaSummary.splice(1, 0, { label: DASHBOARD_PROFILE.LABEL_US_BORN, title: fatca.usBorn as string });
    if (fatca.usBorn === "Yes") {
      fatcaSummary.push({ label: DASHBOARD_PROFILE.LABEL_RESIDENT, title: fatca.confirmAddress as string });
      if (fatca.certificate) {
        fatcaSummary.push({
          label: DASHBOARD_PROFILE.LABEL_CERTIFICATE,
          title: fatca.certificate.name!,
          titleIcon: fatca.certificate.name === "-" ? undefined : "file",
          titleStyle: fsTransformNone,
          onPress: () => setFile(fatca.certificate! as FileBase64),
        });
      } else {
        fatcaSummary.push(
          { label: DASHBOARD_PROFILE.LABEL_CERTIFICATE, title: "-" },
          {
            label: DASHBOARD_PROFILE.LABEL_CERTIFICATE_REASON,
            title: fatca.reason || "-",
            titleStyle: fsTransformNone,
          },
        );
      }
      if (fatca.confirmAddress === "Yes") {
        fatcaSummary.push({
          label: DASHBOARD_PROFILE.LABEL_CORRESPONDENCE,
          title: fatca.correspondenceDeclaration || "-",
          titleStyle: fsTransformNone,
        });
      }
    }
  }

  if (fatca.formW9 === true) {
    fatcaSummary.push({ label: DASHBOARD_PROFILE.LABEL_FORM_W9, title: "Yes" });
  }

  if (fatca.formW8Ben === true) {
    fatcaSummary.push({ label: DASHBOARD_PROFILE.LABEL_FORM_W8_BEN, title: "Yes" });
  }

  const crsSummary: LabeledTitleProps[] = [
    {
      label: DASHBOARD_PROFILE.LABEL_JURISDICTION,
      labelStyle: { width: sw200, lineHeight: sh16 },
      spaceToLabel: sh4,
      title: crs.taxResident || "-",
    },
  ];

  if (isTaxResident === false && crs.tin) {
    crs.tin.forEach((multiTin, index) => {
      const countLabel = crs.tin.length > 1 ? ` ${index + 1}` : "";
      crsSummary.push(
        { label: `${DASHBOARD_PROFILE.LABEL_TIN_COUNTRY}${countLabel}`, title: multiTin.country! || "-" },
        { label: `${DASHBOARD_PROFILE.LABEL_TIN_NUMBER}${countLabel}`, title: multiTin.tinNumber || "-" },
      );

      if (multiTin.reason) {
        crsSummary.push({
          label: `${DASHBOARD_PROFILE.LABEL_TIN_REMARKS}${countLabel}`,
          title: multiTin.reason || "-",
          titleStyle: fsTransformNone,
        });
      }
    });
  }

  const uploadedDocuments: LabeledTitleProps[] = [];

  if (uploadedDocuments !== null) {
    uploadedDocument.forEach((doc, index) => {
      const handleFile = () => {
        setFile(uploadedDocument[index]);
      };
      const newData: LabeledTitleProps = {
        label: idType,
        title: doc.name,
        titleIcon: doc.name === "-" ? undefined : "file",
        titleStyle: fsTransformNone,
        onPress: handleFile,
      };

      return uploadedDocuments.push(newData);
    });
  }

  const structuredData: IStructuredData = {
    accountSummaryDetails: accountSummaryDetails,
    contactDetails: contactSummary,
    declarations: {
      crs: crsSummary,
      fatca: fatcaSummary,
      fea: [],
    },
    employmentDetails: employmentDetails,
    epfDetails: epfSummary,
    foreignBankDetails: foreignBankDetails,
    localBankDetails: localBankDetails,
    mailingAddress: addressInformation.mailingAddress,
    permanentAddress: addressInformation.permanentAddress,
    accountDocuments: uploadedDocuments,
  };

  return structuredData;
};
