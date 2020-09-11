export const SAMPLE_SUMMARY_REQUEST = {
  input: {
    clientId: "52ff9f60-f0c1-11ea-bb59-8902476a4472",
    idVerification: {
      principalHolder: {
        countryOfBirth: 0,
        expirationDate: 567477756, // TODO optional
        gender: 1,
        id: [
          // TODO not confirmed
          {
            base64: "asd",
            date: 123,
            name: "image.png",
            path: undefined,
            size: 123123123, // TODO size in bytes
            type: "application/pdf",
            url: undefined,
          },
        ],
        idNumber: "931114675676",
        idType: 1,
        mailingAddress: {
          address: "dcdctjjcjcg",
          city: "kl",
          country: 0,
          postCode: "456465", // TODO string
          state: 0,
        },
        name: "danny",
        nationality: 0,
        permanentAddress: {
          address: "dcdctjjcjcg",
          city: "kl",
          country: 0,
          postCode: "456465", // TODO string
          state: 0,
        },
        placeOfBirth: "kl",
        salutation: 0,
      },
      jointHolder: {
        idType: 1,
        idNumber: "931114675676",
        id: [
          // TODO not confirmed
          {
            base64: "asd",
            date: 123,
            name: "image.png",
            path: undefined,
            size: 123123123, // TODO size in bytes
            type: "application/pdf",
            url: undefined,
          },
        ],
        name: "danny",
        salutation: 0,
        gender: 1,
        placeOfBirth: "kl",
        countryOfBirth: 0,
        nationality: 0,
        expirationDate: 567477756, // TODO optional
        permanentAddress: {
          address: "dcdctjjcjcg",
          postCode: "456465", // TODO string
          city: "kl",
          state: 0,
          country: 0,
        },
        mailingAddress: {
          address: "dcdctjjcjcg",
          postCode: "456465", // TODO string
          city: "kl",
          state: 0,
          country: 0,
        },
      },
    },
    personalDetails: {
      principalHolder: {
        bumiputera: 0, // TODO optional
        educationLevel: 0,
        faxNumber: { mobileCode: "+60", number: "456476" }, // TODO optional, should be string
        homeNumber: { mobileCode: "+60", number: "456476" }, // TODO optional, should be string
        maritalStatus: 0,
        mobileNumber: { mobileCode: "+60", number: "456476" }, // TODO optional, should be string
        mothersMaidenName: "jane",
        officeNumber: { mobileCode: "+60", number: "456476" }, // TODO optional, should be string
        race: 0, // TODO optional
      },
      jointHolder: {
        bumiputera: 0, // TODO optional
        educationLevel: 0,
        faxNumber: { mobileCode: "+60", number: "456476" }, // TODO optional, should be string
        homeNumber: { mobileCode: "+60", number: "456476" }, // TODO optional, should be string
        maritalStatus: 0,
        mobileNumber: { mobileCode: "+60", number: "456476" }, // TODO optional, should be string
        mothersMaidenName: "jane",
        officeNumber: { mobileCode: "+60", number: "456476" }, // TODO optional, should be string
        race: 0, // TODO optional
      },
    },
    epfDetails: {
      // TODO optional only when EPF fund is selected
      principalHolder: {
        epfNumber: "54465", // TODO string
        epfType: 1,
      },
      jointHolder: {
        epfNumber: "54465", // TODO string
        epfType: 1,
      },
    },
    bankDetails: {
      incomeDistribution: 0,
      signatory: 0, // TODO only for joint
      principalHolder: {
        localBank: [
          {
            bankAccountName: "Paul",
            bankAccountNumber: "467476", // TODO string
            bankName: "SBI",
            bankSwiftCode: "dtdchyd",
            currency: [0],
          },
        ],
        foreignBank: [
          // TODO optional
          {
            bankAccountName: "Paul",
            bankAccountNumber: "467476", // TODO string
            bankLocation: 0,
            bankName: "SBI",
            bankSwiftCode: "dtdchyd",
            currency: [0],
          },
        ],
      },
      jointHolder: {
        localBank: [
          {
            bankAccountName: "Paul",
            bankAccountNumber: "467476", // TODO string
            bankName: "SBI",
            bankSwiftCode: "dtdchyd",
            currency: [0],
          },
        ],
        foreignBank: [
          // TODO optional
          {
            bankAccountName: "Paul",
            bankAccountNumber: "467476", // TODO string
            bankLocation: 0,
            bankName: "SBI",
            bankSwiftCode: "dtdchyd",
            currency: [0],
          },
        ],
      },
    },
    employmentDetails: {
      principalHolder: {
        address: "cgjcj",
        city: "hvhj",
        country: 0,
        monthlyHouseholdIncome: 0,
        nameOfEmployer: "dil",
        natureOfBusiness: 0,
        occupation: 0,
        postCode: "456465", // TODO string
        state: "kl",
      },
      jointHolder: {
        address: "",
        annualIncome: 2,
        city: "",
        country: 2,
        monthlyHouseholdIncome: 2,
        nameOfEmployer: "",
        natureOfBusiness: 3,
        occupation: 2,
        postCode: "456465", // TODO string
        state: "",
      },
    },
    fatca: {
      principalHolder: {
        certificate: {
          // TODO optional
          base64: "asd",
          date: 123,
          name: "image.png",
          path: undefined,
          size: 123123123, // TODO size in bytes
          type: "application/pdf",
          url: undefined,
        },
        noCertificate: true,
        uploadLater: true,
        usBorn: 0,
        usCitizen: 0,
        reason: "lost", // TODO optional but required when noCertificate === true
      },
      jointHolder: {
        certificate: {
          // TODO optional
          base64: "asd",
          date: 123123,
          name: "image.png",
          path: undefined,
          size: 123123123, // TODO size in bytes
          type: "application/pdf",
          url: undefined,
        },
        noCertificate: true,
        uploadLater: true,
        usBorn: 0,
        usCitizen: 0,
        reason: "lost", // TODO optional but required when noCertificate === true
      },
    },
    crs: {
      principalHolder: {
        taxResident: 1,
        tin: [
          {
            country: 0,
            tinNumber: "4565657", // TODO string
            noTin: true,
            reason: "lost", // TODO optional
          },
        ],
      },
      jointHolder: {
        taxResident: 1,
        tin: [
          {
            country: 0,
            tinNumber: "4565657", // TODO string
            noTin: true,
            reason: "lost", // TODO optional
          },
        ],
      },
    },
    fea: {
      // TODO optional, only when fund FEA Status is true. We capture this for now but no merit/bearing in the the application
      principalHolder: {
        questionOne: 0,
        questionTwo: 0,
        questionThree: 0,
      },
      jointHolder: {
        // TODO optional
        questionOne: 0,
        questionTwo: 0,
        questionThree: 0,
      },
    },
  },
  accountType: "Joint",
  investmentDetails: [
    {
      fundCode: "IUTF",
      fundPaymentMethod: "Cash",
      investmentAmount: "1000",
      salesCharge: 8.5,
      scheduledInvestment: false,
    },
    {
      fundCode: "IATF",
      fundPaymentMethod: "Cash",
      investmentAmount: "1000",
      salesCharge: 8.5,
      scheduledInvestment: true,
      scheduledInvestmentAmount: "500",
      scheduledSalesCharge: 8.5,
    },
  ],
};
