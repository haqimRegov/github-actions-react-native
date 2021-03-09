import { Language } from "../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY, DICTIONARY_MOBILE_CODE } from "../../data/dictionary";

const { PERSONAL_DETAILS } = Language.PAGE;

export type PersonalInfoState = IPersonalInfoState;

export const personalInfoInitialState: PersonalInfoState = {
  cancelOnboarding: false,
  editMode: false,
  editPersonal: false,
  editDeclaration: false,
  emailOtpSent: false,
  epfInvestment: false,
  epfShariah: false,
  incomeDistribution: PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST,
  signatory: PERSONAL_DETAILS.OPTION_CONTROL_PRINCIPAL,
  principal: {
    addressInformation: {
      mailingAddress: {
        address: {
          line1: "",
          line2: undefined,
          line3: undefined,
        },
        city: "",
        country: "",
        postCode: "",
        state: "",
      },
      permanentAddress: {
        address: {
          line1: "",
          line2: undefined,
          line3: undefined,
        },
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
          bankLocation: DICTIONARY_COUNTRIES[0].value,
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
        acceptCrs: false,
        taxResident: -1,
        tin: [
          {
            country: "",
            explanation: "",
            explanationSaved: true,
            noTin: false,
            reason: -1,
            tinNumber: "",
          },
        ],
      },
      fatca: {
        acceptFatca: false,
        formW9: false,
        formW8Ben: false,
        confirmAddress: -1,
        certificate: undefined,
        explanation: "",
        explanationSaved: true,
        noCertificate: false,
        reason: -1,
        uploadLater: false,
        usBorn: -1,
        usCitizen: -1,
      },
      fea: {
        acceptFea: false,
        balance: "",
        facility: -1,
        resident: -1,
      },
    },
    epfDetails: {
      epfAccountType: "",
      epfMemberNumber: "",
    },
    employmentDetails: {
      businessNature: "",
      employerName: "",
      occupation: "",
      address: {
        line1: "",
        line2: undefined,
        line3: undefined,
      },
      city: "",
      country: DICTIONARY_COUNTRIES[0].value,
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
      monthlyHouseholdIncome: "",
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
        address: {
          line1: "",
          line2: undefined,
          line3: undefined,
        },
        city: "",
        country: "",
        postCode: "",
        state: "",
      },
      permanentAddress: {
        address: {
          line1: "",
          line2: undefined,
          line3: undefined,
        },
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
        acceptCrs: false,
        taxResident: -1,
        tin: [
          {
            country: "",
            explanation: "",
            explanationSaved: true,
            noTin: false,
            reason: -1,
            tinNumber: "",
          },
        ],
      },
      fatca: {
        acceptFatca: false,
        formW9: false,
        formW8Ben: false,
        certificate: undefined,
        confirmAddress: -1,
        explanation: "",
        explanationSaved: true,
        noCertificate: false,
        reason: -1,
        uploadLater: false,
        usBorn: -1,
        usCitizen: -1,
      },
      fea: {
        acceptFea: false,
        balance: "",
        facility: -1,
        resident: -1,
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
      occupation: "",
      address: {
        line1: "",
        line2: undefined,
        line3: undefined,
      },
      city: "",
      country: DICTIONARY_COUNTRIES[0].value,
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
      monthlyHouseholdIncome: "",
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
