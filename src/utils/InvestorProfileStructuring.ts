import { Language } from "../constants/language";
import { OPTIONS_CRS_TAX_RESIDENCY } from "../data/dictionary";
import { fsTransformNone, fsUppercase, sh4, sw328 } from "../styles";
import { booleanTextChange } from "./Validator";
import { isNotEmpty } from "./Value";

const { INVESTOR_PROFILE } = Language.PAGE;

export const getStructuredInvestorProfile = (data: IInvestorAccount) => {
  const { addressInformation, contactDetails, declaration, employmentInformation, epfDetails, personalDetails, investorOverview } = data;
  const { idNumber, idType } = investorOverview[0];
  const { fatca, crs } = declaration !== null ? declaration : { fatca: null, crs: null };

  const identificationDetails: LabeledTitleProps[] = [
    { label: `${idType} ${INVESTOR_PROFILE.LABEL_ID_NUMBER}`, title: idNumber || "-", titleStyle: fsUppercase },
    {
      label: INVESTOR_PROFILE.LABEL_DATE_OF_BIRTH,
      title: personalDetails !== null && personalDetails.dateOfBirth ? personalDetails.dateOfBirth : "-",
    },
  ];

  if (idType === "Passport" && personalDetails !== null && personalDetails.countryOfBirth !== null) {
    identificationDetails.push({ label: INVESTOR_PROFILE.LABEL_COUNTRY, title: personalDetails.countryOfBirth });
  }
  if (idType === "Passport" && personalDetails !== null && personalDetails.expirationDate !== null) {
    identificationDetails.push({ label: INVESTOR_PROFILE.LABEL_EXPIRATION, title: personalDetails.expirationDate });
  }

  const personalDetailsSummary: LabeledTitleProps[] = [
    {
      label: INVESTOR_PROFILE.LABEL_SALUTATION,
      title: personalDetails !== null && personalDetails.salutation ? personalDetails.salutation : "-",
    },
    { label: INVESTOR_PROFILE.LABEL_GENDER, title: personalDetails !== null && personalDetails.gender ? personalDetails.gender : "-" },
    {
      label: INVESTOR_PROFILE.LABEL_NATIONALITY,
      title: personalDetails !== null && personalDetails.nationality ? personalDetails.nationality : "-",
    },
    {
      label: INVESTOR_PROFILE.LABEL_PLACE_OF_BIRTH,
      title: personalDetails !== null && personalDetails.placeOfBirth ? personalDetails.placeOfBirth : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: INVESTOR_PROFILE.LABEL_COUNTRY_OF_BIRTH,
      title: personalDetails !== null && personalDetails.countryOfBirth ? personalDetails.countryOfBirth : "-",
    },
    {
      label: INVESTOR_PROFILE.LABEL_EDUCATION,
      title: personalDetails !== null && personalDetails.educationLevel ? personalDetails.educationLevel : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: INVESTOR_PROFILE.LABEL_MOTHER,
      title: personalDetails !== null && personalDetails.mothersMaidenName ? personalDetails.mothersMaidenName : "-",
    },
    {
      label: INVESTOR_PROFILE.LABEL_MARITAL,
      title: personalDetails !== null && personalDetails.maritalStatus ? personalDetails.maritalStatus : "-",
    },
  ];

  if (personalDetails !== null && personalDetails.race !== null && personalDetails.bumiputera !== null && idType !== "Passport") {
    personalDetailsSummary.splice(
      2,
      0,
      {
        label: INVESTOR_PROFILE.LABEL_BUMIPUTERA,
        title: booleanTextChange(personalDetails.bumiputera),
      },
      { label: INVESTOR_PROFILE.LABEL_RACE, title: personalDetails.race },
    );
  }

  if (epfDetails !== null) {
    personalDetailsSummary.push(
      { label: INVESTOR_PROFILE.LABEL_EPF_NUMBER, title: epfDetails.epfMemberNumber || "-" },
      { label: INVESTOR_PROFILE.LABEL_EPF_ACCOUNT, title: epfDetails.epfAccountType || "-" },
    );
  }

  const contactSummary: LabeledTitleProps[] = [];

  if (contactDetails !== null && contactDetails.email !== null) {
    contactSummary.push({ label: INVESTOR_PROFILE.LABEL_EMAIL, title: contactDetails.email, titleStyle: fsTransformNone });
  }

  if (contactDetails !== null && contactDetails.mobileNumber) {
    contactSummary.push({ label: INVESTOR_PROFILE.LABEL_NUMBER_MOBILE, title: contactDetails.mobileNumber });
  }

  if (contactDetails !== null && contactDetails.homeNumber !== null) {
    contactSummary.push({ label: INVESTOR_PROFILE.LABEL_NUMBER_HOME, title: contactDetails.homeNumber });
  }
  if (contactDetails !== null && contactDetails.officeNumber !== null) {
    contactSummary.push({ label: INVESTOR_PROFILE.LABEL_NUMBER_OFFICE, title: contactDetails.officeNumber });
  }
  if (contactDetails !== null && contactDetails.faxNumber !== null) {
    contactSummary.push({ label: INVESTOR_PROFILE.LABEL_NUMBER_FAX, title: contactDetails.faxNumber });
  }

  let employmentDetails: LabeledTitleProps[] = [];
  if (employmentInformation !== null) {
    employmentDetails = [
      { label: INVESTOR_PROFILE.LABEL_OCCUPATION, title: employmentInformation.occupation, titleStyle: fsTransformNone },
      { label: INVESTOR_PROFILE.LABEL_BUSINESS_FIELD, title: employmentInformation.natureOfBusiness, titleStyle: fsTransformNone },
      { label: INVESTOR_PROFILE.LABEL_EMPLOYER_NAME, title: employmentInformation.nameOfEmployer, titleStyle: fsTransformNone },
    ];

    if (employmentInformation.annualIncome) {
      employmentDetails.splice(2, 0, {
        label: INVESTOR_PROFILE.LABEL_GROSS,
        title: employmentInformation.annualIncome,
        titleStyle: fsTransformNone,
      });
    }

    if (personalDetails !== null && personalDetails.monthlyHouseholdIncome !== null) {
      employmentDetails.splice(2, 0, {
        label: INVESTOR_PROFILE.LABEL_MONTHLY,
        title: personalDetails.monthlyHouseholdIncome,
        titleStyle: fsTransformNone,
      });
    }
  }

  let employmentAddress: LabeledTitleProps[] = [];
  if (employmentInformation !== null && employmentInformation !== undefined) {
    const employeeAddress = employmentInformation.address ? Object.values(employmentInformation.address.address!).join(" ") : "";

    employmentAddress = [
      { label: INVESTOR_PROFILE.LABEL_EMPLOYER_ADDRESS, title: employeeAddress, titleStyle: fsTransformNone },
      { label: INVESTOR_PROFILE.LABEL_POSTCODE, title: employmentInformation.address.postCode! },
      { label: INVESTOR_PROFILE.LABEL_CITY, title: employmentInformation.address.city! },
      { label: INVESTOR_PROFILE.LABEL_STATE, title: employmentInformation.address.state! },
      { label: INVESTOR_PROFILE.LABEL_COUNTRY, title: employmentInformation.address.country! },
    ];
  }

  const isTaxResident = crs !== null && crs.taxResident === OPTIONS_CRS_TAX_RESIDENCY[0].label;

  const fatcaSummary: LabeledTitleProps[] = [
    {
      label: INVESTOR_PROFILE.LABEL_CITIZENSHIP,
      title: fatca !== null && fatca.usCitizen !== null ? booleanTextChange(fatca.usCitizen as string) : "-",
    },
  ];

  const fatcaAddress = isNotEmpty(addressInformation)
    ? `${Object.values(addressInformation!.mailingAddress!.address!).join("")}, ${addressInformation!.mailingAddress!.postCode}, ${
        addressInformation!.mailingAddress!.city
      }, ${addressInformation!.mailingAddress!.state}, ${addressInformation!.mailingAddress!.country}`
    : "-";

  if (fatca !== null && fatca.usCitizen === "false") {
    fatcaSummary.splice(1, 0, { label: INVESTOR_PROFILE.LABEL_US_BORN, title: booleanTextChange(fatca.usBorn as string) });
    if (fatca.usBorn === "true") {
      fatcaSummary.push({ label: INVESTOR_PROFILE.LABEL_MALAYSIAN_ADDRESS, title: fatcaAddress, titleStyle: fsTransformNone });
      if (fatca.certificate) {
        fatcaSummary.push({
          label: INVESTOR_PROFILE.LABEL_CERTIFICATE,
          title: fatca.certificate.name!,
          titleStyle: fsTransformNone,
        });
      } else {
        fatcaSummary.push(
          { label: INVESTOR_PROFILE.LABEL_CERTIFICATE, title: "-" },
          {
            label: INVESTOR_PROFILE.LABEL_CERTIFICATE_REASON,
            title: fatca.reason || "-",
            titleStyle: fsTransformNone,
          },
        );
      }
      if (fatca.correspondenceDeclaration === "Yes") {
        fatcaSummary.splice(2, 0, {
          label: INVESTOR_PROFILE.LABEL_CORRESPONDENCE_DECLARATION,
          title: fatca.correspondenceDeclaration || "-",
          titleStyle: fsTransformNone,
        });
      }
    }
  }

  if (fatca !== null && fatca.formW9 === true) {
    fatcaSummary.push({ label: INVESTOR_PROFILE.LABEL_W9, title: "Yes" });
  }

  if (fatca !== null && fatca.formW8Ben === true) {
    fatcaSummary.push({ label: INVESTOR_PROFILE.LABEL_W8BEN, title: "Yes" });
  }

  const crsSummary: LabeledTitleProps[] = [
    {
      label: INVESTOR_PROFILE.LABEL_JURISDICTION,
      labelStyle: { width: sw328 },
      spaceToLabel: sh4,
      title: crs !== null && crs.taxResident !== null ? crs.taxResident : "-",
    },
  ];

  const crsTinSummary: LabeledTitleProps[][] = [];

  if (crs !== null && isTaxResident === false && crs.tin) {
    crs.tin.forEach((multiTin) => {
      const tinSummary: LabeledTitleProps[] = [];
      tinSummary.push(
        {
          label: INVESTOR_PROFILE.LABEL_TIN_COUNTRY,
          title: multiTin.country! || "-",
        },
        { label: `${INVESTOR_PROFILE.LABEL_TIN_NUMBER}`, title: multiTin.tinNumber || "-" },
      );

      if (multiTin.reason !== null) {
        tinSummary.push({
          label: `${INVESTOR_PROFILE.LABEL_TIN_REMARKS}`,
          title: multiTin.reason,
          titleStyle: fsTransformNone,
        });
      }
      crsTinSummary.push(tinSummary);
    });
  }

  const permanentAddressLabel =
    isNotEmpty(addressInformation) &&
    (isNotEmpty(addressInformation!.permanentAddress!.address!.line2) || isNotEmpty(addressInformation!.permanentAddress!.address!.line3))
      ? `${INVESTOR_PROFILE.LABEL_PERMANENT_ADDRESS} 1`
      : INVESTOR_PROFILE.LABEL_PERMANENT_ADDRESS;

  const permanentAddressSummary: LabeledTitleProps[] = [
    {
      label: permanentAddressLabel,
      title: isNotEmpty(addressInformation) ? addressInformation!.permanentAddress!.address!.line1! : "-",
      titleStyle: fsTransformNone,
    },
    {
      label: INVESTOR_PROFILE.LABEL_POSTCODE,
      title: isNotEmpty(addressInformation) ? addressInformation!.permanentAddress!.postCode! : "-",
    },
    { label: INVESTOR_PROFILE.LABEL_CITY, title: isNotEmpty(addressInformation) ? addressInformation!.permanentAddress!.city! : "-" },
    { label: INVESTOR_PROFILE.LABEL_STATE, title: isNotEmpty(addressInformation) ? addressInformation!.permanentAddress!.state! : "-" },
    { label: INVESTOR_PROFILE.LABEL_COUNTRY, title: isNotEmpty(addressInformation) ? addressInformation!.permanentAddress!.country! : "-" },
  ];

  if (isNotEmpty(addressInformation) && isNotEmpty(addressInformation!.permanentAddress!.address!.line2)) {
    permanentAddressSummary.splice(1, 0, {
      label: `${INVESTOR_PROFILE.LABEL_PERMANENT_ADDRESS} 2`,
      title: addressInformation!.permanentAddress!.address!.line2!,
      titleStyle: fsTransformNone,
    });
  }

  if (isNotEmpty(addressInformation) && isNotEmpty(addressInformation!.permanentAddress!.address!.line3)) {
    const index = addressInformation!.permanentAddress!.address!.line2 !== undefined ? 2 : 1;
    permanentAddressSummary.splice(index, 0, {
      label: `${INVESTOR_PROFILE.LABEL_PERMANENT_ADDRESS} 3`,
      title: addressInformation!.permanentAddress!.address!.line3!,
      titleStyle: fsTransformNone,
    });
  }

  const mailingAddressLabel =
    isNotEmpty(addressInformation) &&
    (isNotEmpty(addressInformation!.mailingAddress!.address!.line2) || isNotEmpty(addressInformation!.mailingAddress!.address!.line3))
      ? `${INVESTOR_PROFILE.LABEL_CORRESPONDENCE_ADDRESS} 1`
      : INVESTOR_PROFILE.LABEL_CORRESPONDENCE_ADDRESS;

  const mailingAddressSummary: LabeledTitleProps[] = [
    {
      label: mailingAddressLabel,
      title: isNotEmpty(addressInformation) ? addressInformation!.mailingAddress!.address!.line1! : "-",
      titleStyle: fsTransformNone,
    },
    { label: INVESTOR_PROFILE.LABEL_POSTCODE, title: isNotEmpty(addressInformation) ? addressInformation!.mailingAddress!.postCode! : "-" },
    { label: INVESTOR_PROFILE.LABEL_CITY, title: isNotEmpty(addressInformation) ? addressInformation!.mailingAddress!.city! : "-" },
    { label: INVESTOR_PROFILE.LABEL_STATE, title: isNotEmpty(addressInformation) ? addressInformation!.mailingAddress!.state! : "-" },
    { label: INVESTOR_PROFILE.LABEL_COUNTRY, title: isNotEmpty(addressInformation) ? addressInformation!.mailingAddress!.country! : "-" },
  ];

  if (isNotEmpty(addressInformation) && isNotEmpty(addressInformation!.mailingAddress!.address!.line2)) {
    mailingAddressSummary.splice(1, 0, {
      label: `${INVESTOR_PROFILE.LABEL_CORRESPONDENCE_ADDRESS} 2`,
      title: addressInformation!.mailingAddress!.address!.line2!,
      titleStyle: fsTransformNone,
    });
  }

  if (isNotEmpty(addressInformation) && isNotEmpty(addressInformation!.mailingAddress!.address!.line3)) {
    const index = addressInformation!.mailingAddress!.address!.line2 !== undefined ? 2 : 1;
    mailingAddressSummary.splice(index, 0, {
      label: `${INVESTOR_PROFILE.LABEL_CORRESPONDENCE_ADDRESS} 3`,
      title: addressInformation!.mailingAddress!.address!.line3!,
      titleStyle: fsTransformNone,
    });
  }

  const structuredData: IStructuredInvestorProfile = {
    identificationDetails: identificationDetails,
    personalDetails: personalDetailsSummary,
    contactDetails: contactSummary,
    declarations: {
      crs: crsSummary,
      crsTin: crsTinSummary,
      fatca: fatcaSummary,
    },
    employmentDetails: employmentDetails,
    employmentAddress: employmentAddress,
    permanentAddress: permanentAddressSummary,
    correspondenceAddress: mailingAddressSummary,
  };

  return structuredData;
};
