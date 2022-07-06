export const INVESTOR_PROFILE_DUMMY_RESPONSE: IInvestorAccount = {
  accountDetails: null,
  addressInformation: {
    mailingAddress: {
      address: {
        line1: "NO 33A KIPARK SRI UTARA JALAN 2/3C VILLA MAS 2",
        line2: undefined, // null
        line3: undefined, // null
      },
      city: "Kuala Lumpur",
      country: "Malaysia",
      postCode: "88100",
      state: "Wilayah Persekutuan",
    },
    permanentAddress: {
      address: {
        line1: "NO 33A KIPARK SRI UTARA JALAN 2/3C VILLA MAS 2",
        line2: undefined, // null
        line3: undefined, // null
      },
      city: "Kuala Lumpur",
      country: "Malaysia",
      postCode: "88100",
      state: "Wilayah Persekutuan",
    },
  },
  bankInformation: null,
  contactDetails: {
    email: "aldrin.castro@regovtech.com",
    faxNumber: null,
    homeNumber: null,
    mobileNumber: "+60 11111",
    officeNumber: null,
  },
  declaration: {
    crs: {
      taxResident: "Malaysian Tax Resident",
      tin: [
        {
          country: null,
          reason: null,
          tinNumber: null,
        },
      ],
    },
    fatca: {
      certificate: {
        name: "KIB IMG 2022-06-20 at 12:59:19 PM.jpeg",
        type: "image/jpeg",
        url: "https://tinyurl.com/2za743sd",
      },
      confirmAddress: "Yes",
      correspondenceDeclaration: "Yes",
      formW8Ben: {
        name: "KIB IMG 2022-06-20 at 1:06:35 PM.jpeg",
        type: "image/jpeg",
        url: "https://tinyurl.com/2za743sd",
      },
      formW9: null,
      reason: null,
      usBorn: "Yes",
      usCitizen: "No",
    },
    fea: null,
  },
  documentSummary: {
    accountType: "Individual",
    hardcopy: {
      accDocs: [
        {
          mainHeader: "Hay Ho",
          subHeader: "Principal Account Holder",
          documents: [
            {
              label: "form",
              name: "KIB IMG 2022-06-20 at 1:06:35 PM.jpeg",
              title: "W-8BEN Form",
              type: "image/jpeg",
              url: "https://tinyurl.com/2za743sd",
            },
          ],
        },
      ],
      required: true,
      utmcDocs: [],
    },
    softcopy: {
      documents: [
        {
          documents: [
            {
              label: "id",
              name: "KIB IMG 2022-06-20 at 12:22:19 PM.jpeg",
              title: "Front of NRIC",
              type: "image/jpeg",
              url: "https://tinyurl.com/2za743sd",
            },
            {
              label: "id",
              name: "KIB IMG 2022-06-20 at 12:22:24 PM.jpeg",
              title: "Back of NRIC",
              type: "image/jpeg",
              url: "https://tinyurl.com/2za743sd",
            },
            {
              label: "form",
              name: "KIB IMG 2022-06-20 at 12:59:19 PM.jpeg",
              title: "Certificate of Loss of Nationality",
              type: "image/jpeg",
              url: "https://tinyurl.com/2za743sd",
            },
          ],
          mainHeader: "Hay Ho",
          subHeader: "Principal Account Holder",
        },
      ],
      required: true,
    },
  },
  employmentInformation: {
    address: {
      address: {
        line1: "Asd",
        line2: undefined, // null
        line3: undefined, // null
      },
      city: "Asdasd",
      country: "Malaysia",
      postCode: "123123",
      state: "Johor",
    },
    annualIncome: "More than 300,000",
    nameOfEmployer: "Asdasd",
    natureOfBusiness: "Actuarial / Stats",
    occupation: "Account Assistance",
    monthlyHouseholdIncome: null,
  },
  epfDetails: {
    epfAccountType: "Conventional",
    epfMemberNumber: "123123",
  },
  investorOverview: [
    {
      clientId: "1234",
      name: "Aldrin Castro",
      id: {
        name: "KIB IMG 2022-06-20 at 12:22:19 PM.jpeg",
        type: "image/jpeg",
        url: "https://tinyurl.com/2za743sd",
      },
      idNumber: "000210999999",
      idType: "NRIC",
      riskProfile: "Medium",
    },
  ],
  personalDetails: {
    bumiputera: "No",
    countryOfBirth: "Malaysia",
    dateOfBirth: "06/06/1988",
    educationLevel: "SPM/O-Level",
    gender: "Male",
    maritalStatus: "Single",
    monthlyHouseholdIncome: "1,501 - 3,000",
    mothersMaidenName: "Asdasd",
    nationality: "Malaysia",
    placeOfBirth: "Terengganu",
    race: "Malay",
    relationship: null,
    riskProfile: "High",
    salutation: "Datin Seri",
    riskProfileLastUpdated: "1655699441358",
  },
  withOrderHistory: null,
};

export const ACCOUNT_INFORMATION_DUMMY_RESPONSE: IInvestorAccount = {
  accountDetails: {
    incomeDistribution: "Payout",
    accountNumber: ["TOMS01787"],
    accountOperationMode: null,
    accountType: "Individual",
    registrationDate: "1655699441358",
  },
  addressInformation: {
    mailingAddress: {
      address: {
        line1: "NO 33A KIPARK SRI UTARA JALAN 2/3C VILLA MAS 2",
        line2: undefined, // null
        line3: undefined, // null
      },
      city: "Kuala Lumpur",
      country: "Malaysia",
      postCode: "88100",
      state: "Wilayah Persekutuan",
    },
    permanentAddress: {
      address: {
        line1: "NO 33A KIPARK SRI UTARA JALAN 2/3C VILLA MAS 2",
        line2: undefined, // null
        line3: undefined, // null
      },
      city: "Kuala Lumpur",
      country: "Malaysia",
      postCode: "88100",
      state: "Wilayah Persekutuan",
    },
  },
  bankInformation: {
    foreignBank: [],
    localBank: [
      {
        bankAccountName: "Hay Ho",
        bankAccountNumber: "123123",
        bankLocation: "Malaysia",
        bankName: "Affin Bank Berhad",
        bankSwiftCode: "",
        currency: ["MYR"],
      },
    ],
  },
  contactDetails: null,
  declaration: null,
  documentSummary: null,
  employmentInformation: null,
  epfDetails: null,
  investorOverview: [
    {
      clientId: "1234",
      name: "Aldrin Castro",
      id: {
        name: "KIB IMG 2022-06-20 at 12:22:19 PM.jpeg",
        type: "image/jpeg",
        url: "https://tinyurl.com/2za743sd",
      },
      idNumber: "000210999999",
      idType: "NRIC",
      riskProfile: "Medium",
    },
  ],
  personalDetails: null,
  withOrderHistory: true,
};

export const ORDER_HISTORY_DUMMY: IDashboardOrder[] = [
  {
    accountType: "Individual",
    canProceed: true,
    clientId: "f8611f30-f905-11ec-aad5-a13814017b1a",
    createdOn: "1656656660504",
    documents: [{ count: 1, document: "Certificate of Loss of Nationality" }],
    dueDate: "1657900799999",
    highlightedText: "",
    investorName: {
      joint: null,
      principal: "Anya Forger",
    },
    isScheduled: false,
    isSeen: true,
    jointId: null,
    label: "The account opening was completed, but it is pending Certificate of Loss of Nationality",
    lastUpdated: "1656656691464",
    orderNumber: "22AA1849",
    reason: [],
    remark: null,
    status: "Pending Doc",
    totalInvestment: [{ amount: "15,000.00", currency: "USD" }],
    transactionType: "Sales-AO",
    withHardcopy: true,
  },
  {
    accountType: "Individual",
    canProceed: true,
    clientId: "f8611f30-f905-11ec-aad5-a13814017b1a",
    createdOn: "1656656660504",
    documents: [{ count: 1, document: "Certificate of Loss of Nationality" }],
    dueDate: "1657900799999",
    highlightedText: "",
    investorName: {
      joint: null,
      principal: "Anya Forger",
    },
    isScheduled: false,
    isSeen: true,
    jointId: null,
    label: "The account opening was completed, but it is pending Certificate of Loss of Nationality",
    lastUpdated: "1656656691464",
    orderNumber: "22AA1849",
    reason: [],
    remark: null,
    status: "Submitted",
    totalInvestment: [],
    transactionType: "CR",
    withHardcopy: true,
  },
];
