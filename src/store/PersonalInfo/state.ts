import { Language } from "../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY, DICTIONARY_MOBILE_CODE } from "../../data/dictionary";
import { NO_TIN_OPTIONS } from "../../pages/Onboarding/Declaration/CRS/TaxIdentificationNumber";

const { PERSONAL_DETAILS, DECLARATION } = Language.PAGE;

export type PersonalInfoState = IPersonalInfoState;

export const personalInfoInitialState: PersonalInfoState = {
  cancelOnboarding: false,
  editMode: false,
  epfInvestment: false,
  incomeDistribution: PERSONAL_DETAILS.OPTION_DISTRIBUTION_PAYOUT,
  signatory: PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL,
  principal: {
    addressInformation: {
      mailingAddress: {
        address: "",
        city: "",
        country: "",
        postCode: "",
        state: "",
      },
      permanentAddress: {
        address: "",
        city: "",
        country: "",
        postCode: "",
        state: "",
      },
    },
    bankSummary: {
      localBank: [
        {
          bankAccountName: "",
          bankAccountNumber: "",
          bankLocation: DICTIONARY_COUNTRIES[133].value,
          bankName: "",
          bankSwiftCode: "",
          currency: [DICTIONARY_CURRENCY[0].value],
          otherBankName: "",
        },
      ],
      foreignBank: [],
    },
    contactDetails: {
      emailAddress: "",
      contactNumber: [
        {
          code: DICTIONARY_MOBILE_CODE[0].value,
          label: PERSONAL_DETAILS.LABEL_MOBILE_NUMBER,
          value: "",
        },
      ],
    },
    declaration: {
      crs: {
        taxResident: DECLARATION.OPTION_MALAYSIAN_TAX,
        tin: [
          {
            country: "",
            explanation: "",
            tinNumber: "",
            noTin: false,
            reason: NO_TIN_OPTIONS[0].value,
          },
        ],
      },
      fatca: {
        acknowledgement: false,
        certificate: undefined,
        noCertificate: false,
        reason: "",
        uploadLater: false,
        usBorn: DECLARATION.OPTION_US_BORN_NO,
        usCitizen: DECLARATION.OPTION_US_CITIZEN_NO,
      },
    },
    epfDetails: {
      epfAccountType: "",
      epfMemberNumber: "",
    },
    employmentDetails: {
      businessNature: "",
      employerName: "",
      grossIncome: "",
      monthlyHouseholdIncome: "",
      occupation: "",
      address: "",
      city: "",
      country: DICTIONARY_COUNTRIES[133].value,
      postCode: "",
      state: "",
    },
    personalDetails: {
      bumiputera: PERSONAL_DETAILS.OPTION_BUMIPUTERA_NO,
      countryOfBirth: "",
      dateOfBirth: undefined,
      educationLevel: "",
      expirationDate: undefined,
      gender: "",
      id: {
        frontPage: undefined,
        secondPage: undefined,
      },
      idNumber: "",
      idType: "",
      maritalStatus: "",
      mothersMaidenName: "",
      name: "",
      nationality: "",
      otherEducationLevel: "",
      otherRelationship: "",
      placeOfBirth: "",
      race: "",
      relationship: "",
      riskProfile: "",
      salutation: "",
    },
  },
  joint: {
    addressInformation: {
      mailingAddress: {
        address: "",
        city: "",
        country: "",
        postCode: "",
        state: "",
      },
      permanentAddress: {
        address: "",
        city: "",
        country: "",
        postCode: "",
        state: "",
      },
    },
    bankSummary: {
      localBank: [
        {
          bankAccountName: "",
          bankAccountNumber: "",
          bankLocation: "",
          bankName: "",
          bankSwiftCode: "",
          currency: [DICTIONARY_CURRENCY[0].value],
          otherBankName: "",
        },
      ],
      foreignBank: [],
    },
    contactDetails: {
      emailAddress: "",
      contactNumber: [
        {
          code: DICTIONARY_MOBILE_CODE[0].value,
          label: PERSONAL_DETAILS.LABEL_MOBILE_NUMBER,
          value: "",
        },
      ],
    },
    declaration: {
      crs: {
        taxResident: DECLARATION.OPTION_MALAYSIAN_TAX,
        tin: [],
      },
      fatca: {
        certificate: undefined,
        noCertificate: false,
        reason: "",
        uploadLater: false,
        usBorn: DECLARATION.OPTION_US_BORN_NO,
        usCitizen: DECLARATION.OPTION_US_CITIZEN_NO,
      },
    },
    epfDetails: {
      epfAccountType: "",
      epfMemberNumber: "",
    },
    employmentDetails: {
      businessNature: "",
      employerName: "",
      grossIncome: "",
      monthlyHouseholdIncome: "",
      occupation: "",
      address: "",
      city: "",
      country: DICTIONARY_COUNTRIES[133].value,
      postCode: "",
      state: "",
    },
    personalDetails: {
      bumiputera: PERSONAL_DETAILS.OPTION_BUMIPUTERA_NO,
      countryOfBirth: "",
      dateOfBirth: undefined,
      educationLevel: "",
      expirationDate: undefined,
      gender: "",
      id: {
        frontPage: undefined,
        secondPage: undefined,
      },
      idNumber: "",
      idType: "",
      maritalStatus: "",
      mothersMaidenName: "",
      name: "",
      nationality: "",
      otherEducationLevel: "",
      otherRelationship: "",
      placeOfBirth: "",
      race: "",
      riskProfile: "",
      salutation: "",
    },
  },
};
