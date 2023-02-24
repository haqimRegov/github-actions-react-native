import { Language } from "../../constants";
import { DICTIONARY_COUNTRIES, DICTIONARY_CURRENCY, DICTIONARY_MOBILE_CODE } from "../../data/dictionary";
import { PersonalInfoAction } from "./actions";
import { personalInfoInitialState, PersonalInfoState } from "./state";

const { PERSONAL_DETAILS } = Language.PAGE;
export function personalInfoReducer(state = personalInfoInitialState, action: PersonalInfoAction): PersonalInfoState {
  switch (action.type) {
    case "personalInfo/ADD_PERSONAL_INFO":
      return {
        ...state,
        ...action.payload,
        principal: { ...state.principal, ...action.payload.principal },
        joint: { ...state.joint, ...action.payload.joint },
      };

    case "personalInfo/RESET_PERSONAL_INFO":
      return {
        cancelOnboarding: false,
        editMode: false,
        editPersonal: false,
        editDeclaration: false,
        emailOtpSent: false,
        emailTimestamp: undefined,
        epfInvestment: false,
        epfShariah: false,
        incomeDistribution: PERSONAL_DETAILS.OPTION_DISTRIBUTION_REINVEST,
        isAllEpf: false,
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
            sameAddress: true,
          },
          bankSummary: {
            localBank: [
              {
                bankAccountName: "",
                bankAccountNumber: "",
                // bankLocation: DICTIONARY_COUNTRIES[0].value,
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
                id: DICTIONARY_MOBILE_CODE[0].id,
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
            grossIncome: "",
            isOptional: false,
            monthlyHouseholdIncome: "",
            occupation: "",
            othersOccupation: "",
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
            countryOfIssuance: undefined,
            dateOfBirth: undefined,
            educationLevel: "",
            enableBankDetails: false,
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
            sameAddress: true,
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
                id: DICTIONARY_MOBILE_CODE[0].id,
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
            isEnabled: true,
            isOptional: false,
            grossIncome: "",
            monthlyHouseholdIncome: "",
            occupation: "",
            othersOccupation: "",
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
          personalDetails: {
            bumiputera: PERSONAL_DETAILS.OPTION_BUMIPUTERA_NO,
            countryOfBirth: "",
            countryOfIssuance: undefined,
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

    default:
      return state;
  }
}
