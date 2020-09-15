const INVESTMENT_DETAILS_MOCKS: IInvestmentDetails[] = [
  {
    fundCode: "IAST",
    fundCurrency: "MYR",
    fundNumber: "6",
    fundName: "Kenanga Shariah Growth Opportunities Fund",
    fundGroup: "UT",
    fundType: "Cash",
    utmc: "3rd Party",
    type: "Shariah",
    investmentAmount: "10000",
    salesCharge: "7",
  },
  {
    fundCode: "IAST",
    fundCurrency: "MYR",
    fundNumber: "6",
    fundName: "Kenanga Shariah Growth Opportunities Fund",
    fundGroup: "UT",
    fundType: "Cash",
    utmc: "3rd Party",
    type: "Shariah",
    investmentAmount: "10000",
    salesCharge: "7",
  },
];

const ACCOUNT_DETAILS_MOCKS: IAccountDetails = {
  principal: {
    name: "Aldrin",
    id: "42323232",
    idProof: {
      name: "image",
      type: "",
      url: "https://i0.wp.com/www.fivestarsandamoon.com/wp-content/uploads/2017/11/71075377_batman-suparman-02a.jpg",
    },
    profilePic: {
      name: "image",
      type: "",
      url: "https://i0.wp.com/www.fivestarsandamoon.com/wp-content/uploads/2017/11/71075377_batman-suparman-02a.jpg",
    },
    accountSummary: {
      dob: "02/01/1996",
      accountNo: "RI000002121",
      salutation: "Mr.",
      accountType: "Principle",
      gender: "male",
      operationMode: "Principle to sign",
      nationality: "Indian",
      registrationDate: "22/06/2020",
      bumiputera: "Yes",
      viewAccess: "Yes",
      race: "Malay",
      riskProfile: "Low",
      maritalStatus: "Marries",
      birthPlace: "KL",
      birthCountry: "India",
      educationLevel: "Degree",
      motherName: "anna",
      relationWithJoint: "Spouse",
    },
    addressInfo: {
      permanentAddress: {
        address: "Menara Olympia, Jalan Raja, CHulan, Kuala Lumpur",
        postCode: "55400",
        city: "Petaling Jaya",
        state: "Selangor",
        country: "Malaysia",
      },
      mailingAddress: {
        address: "Unit B-89, Level 10, Block, Mawar Cempaka, Menara Olympia",
        postCode: "55400",
        state: "Selangor",
        city: "Petaling Jaya",
        country: "Malaysia",
      },
    },
    contactDetails: {
      email: "edgar@gmail.com",
      office: "32133131",
      mobile: "e242424",
      fax: "456789456",
      home: "34567",
    },
    bankSummary: {
      localBank: [
        {
          currency: "MYR",
          accountName: "Edgar",
          bankName: "CIMB Bank Berhad",
          bankCode: "32323",
          accountNo: "42332323",
        },
      ],
      foreignBank: [
        {
          currency: "MYR",
          accountName: "Edgar",
          bankName: "CIMB Bank Berhad",
          bankCode: "32323",
          accountNo: "42332323",
          swiftCode: "432424",
          location: "selangor",
        },
      ],
    },
    employmentInfo: {
      occupation: "Officer",
      employerAddress: "Menara Olympia, Jalan Raja Chulan, Kuala Lumpur",
      employerName: "Lim Kah",
      postCode: "242424",
      businessNature: "insurance",
      city: "Petaling Jaya",
      monthlyIncome: "50000",
      state: "Selangor",
      country: "Malaysia",
    },
    fatcaCRS: {
      usCitizen: "Yes",
      malaysiaResident: "India",
      fatcaProof: {
        name: "image",
        type: "",
        url:
          "https://images.pexels.com/photos/68147/waterfall-thac-dray-nur-buon-me-thuot-daklak-68147.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      usBorn: "Yes",
      tin: [
        {
          tinRemark: "-",
          tinResidence: "-",
          tinNo: "-",
          tinReasons: "-",
        },
        {
          tinRemark: "-",
          tinResidence: "-",
          tinNo: "-",
          tinReasons: "-",
        },
      ],
      crs: "Tax resident",
      fatcaReason: "-",
    },
    uploads: {
      adviserSignature: {
        name: "signature",
        type: "",
        url: "https://image.freepik.com/free-vector/sunset-scenery-with-sea-palm-silhouette_116220-28.jpg",
      },
      clientSignature: {
        name: "signature",
        type: "",
        url:
          "https://images.pexels.com/photos/68147/waterfall-thac-dray-nur-buon-me-thuot-daklak-68147.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
  },
  joint: {
    name: "Nihtin",
    id: "3131",
    idProof: {
      name: "image",
      type: "",
      url: "https://weehingthong.files.wordpress.com/2015/10/zz.jpeg?w=640",
    },
    accountSummary: {
      dob: "02/01/1996",
      accountNo: "RI000002121",
      salutation: "Mr.",
      accountType: "Principle",
      gender: "male",
      operationMode: "Principle to sign",
      nationality: "Indian",
      registrationDate: "22/06/2020",
      bumiputera: "Yes",
      viewAccess: "Yes",
      race: "Malay",
      riskProfile: "Low",
      maritalStatus: "Marries",
      birthPlace: "KL",
      birthCountry: "India",
      educationLevel: "Degree",
      motherName: "anna",
    },
    epfDetails: {
      epfAccountType: "Conventional",
      epfNumber: "31231231",
    },
    addressInfo: {
      permanentAddress: {
        address: "Menara Olympia, Jalan Raja, CHulan, Kuala Lumpur",
        postCode: "55400",
        city: "Petaling Jaya",
        state: "Selangor",
        country: "Malaysia",
      },
      mailingAddress: {
        address: "Unit B-89, Level 10, Block, Mawar Cempaka, Menara Olympia",
        postCode: "55400",
        state: "Selangor",
        city: "Petaling Jaya",
        country: "Malaysia",
      },
    },
    contactDetails: {
      email: "edgar@gmail.com",
      office: "32133131",
      mobile: "e242424",
      fax: "456789456",
      home: "34567",
    },
    bankSummary: {
      localBank: [
        {
          currency: "MYR",
          accountName: "Edgar",
          bankName: "CIMB Bank Berhad",
          bankCode: "32323",
          accountNo: "42332323",
        },
        {
          currency: "MYR",
          accountName: "Edgar",
          bankName: "CIMB Bank Berhad",
          bankCode: "32323",
          accountNo: "42332323",
        },
        {
          currency: "MYR",
          accountName: "Edgar",
          bankName: "CIMB Bank Berhad",
          bankCode: "32323",
          accountNo: "42332323",
        },
      ],
      foreignBank: [
        {
          currency: "MYR",
          accountName: "Edgar",
          bankName: "CIMB Bank Berhad",
          bankCode: "32323",
          accountNo: "42332323",
          swiftCode: "432424",
          location: "selangor",
        },
      ],
    },
    employmentInfo: {
      occupation: "Officer",
      employerAddress: "Menara Olympia, Jalan Raja Chulan, Kuala Lumpur",
      employerName: "Lim Kah",
      postCode: "242424",
      businessNature: "insurance",
      city: "Petaling Jaya",
      monthlyIncome: "50000",
      state: "Selangor",
      country: "Malaysia",
    },
    fatcaCRS: {
      usCitizen: "Yes",
      malaysiaResident: "India",

      fatcaProof: {
        name: "image",
        type: "",
        url:
          "https://images.pexels.com/photos/68147/waterfall-thac-dray-nur-buon-me-thuot-daklak-68147.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      crs: "Tax resident",
      tin: [
        {
          tinRemark: "-",
          tinResidence: "-",
          tinNo: "-",
          tinReasons: "-",
        },
        {
          tinRemark: "-",
          tinResidence: "-",
          tinNo: "-",
          tinReasons: "-",
        },
      ],
      usBorn: "Yes",

      fatcaReason: "-",
    },
    uploads: {
      adviserSignature: {
        name: "signature.png",
        type: "",
        url: "https://image.freepik.com/free-vector/sunset-scenery-with-sea-palm-silhouette_116220-28.jpg",
      },
      clientSignature: {
        name: "signature.png",
        type: "",
        url:
          "https://images.pexels.com/photos/68147/waterfall-thac-dray-nur-buon-me-thuot-daklak-68147.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
  },
};

const TRANSACTION_DETAILS_MOCKS: ITransactionDetails = {
  transactionSummary: {
    omniReference: "00113dsdas",
    transactionDate: "22/06/2020",
    adviserName: "Lin Kah",
    adviserCode: "015xxxx",
    accountType: "Indiv",
    accountNumber: "R10092932",
    processingBranch: "The Curve",
  },
  paymentSummary: [
    {
      paymentMethod: "online Banking",
      amount: "5000",
      currency: "MYR",
      bankName: "CIMB Bank",
      bankCode: "CIMB",
      kibBankName: "Malyan",
      kibAccountNo: "534242424",
      transactionDate: new Date(),
      proof: {
        name: "proof",
        type: "",
        url: "https://online.anyflip.com/fvprh/ydii/files/mobile/1.jpg?1582709930",
      },
      remark: "remark",
    },
    {
      paymentMethod: "online Banking",
      amount: "5000",
      currency: "MYR",
      bankName: "CIMB Bank ",
      bankCode: "CIMB",
      kibBankName: "Malyan",
      kibAccountNo: "534242424",
      transactionDate: new Date(),
      proof: {
        name: "proof",
        type: "",
        url: "https://a.c-dn.net/c/content/dam/publicsites/igcom/sg/images/homepage/SGX_Payments_Screenshot.png",
      },
      remark: "remark",
    },
  ],
};

export const ORDER_DETAILS_MOCKS: IOrderDetails = {
  investmentSummary: INVESTMENT_DETAILS_MOCKS,
  accountDetails: ACCOUNT_DETAILS_MOCKS,
  transactionDetails: TRANSACTION_DETAILS_MOCKS,
};
