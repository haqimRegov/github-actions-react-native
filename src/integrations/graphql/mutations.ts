import gql from "graphql-tag";

const changePassword = gql`
  mutation changePasswordV2($input: ChangePasswordInputV2) {
    changePasswordV2(input: $input) {
      data {
        result {
          status
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const clientRegister = gql`
  mutation register($input: ClientRegisterInput) {
    clientRegisterV2(input: $input) {
      data {
        result {
          message
          initId
          principalHolder {
            name
            clientId
            dateOfBirth
            id
            idType
          }
          jointHolder {
            name
            id
            dateOfBirth
            clientId
            idType
          }
          riskInfo {
            appetite
            expectedRange
            profile
            type
            hnwStatus
          }
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const emailVerification = gql`
  mutation emailVerification($input: EmailVerificationInput) {
    emailVerificationV2(input: $input) {
      data {
        result {
          message
          status
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const emailOtpVerification = gql`
  mutation emailOtpVerification($input: EmailOtpVerificationInput) {
    emailOtpVerificationV2(input: $input) {
      data {
        result {
          message
          status
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const expiredPassword = gql`
  mutation expiredChangePassword($input: ExpiredChangePasswordInput) {
    expiredChangePassword(input: $input) {
      data {
        result {
          status
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const firstTimeSignUp = gql`
  mutation firstTimeSignUp($input: NricInput) {
    firstTimeSignUp(input: $input) {
      data {
        result {
          status
          message
          email
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const forgotPassword = gql`
  mutation forgotPassword($input: NricInput) {
    forgotPassword(input: $input) {
      data {
        result {
          status
          message
          email
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const generatePdf = gql`
  mutation generatePdf($input: PdfInput) {
    generatePdfV2(input: $input) {
      data {
        result {
          message
          status
          pdf {
            base64
            name
            date
            url
            urlPageCount
            type
          }
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const generatePdfTransactions = gql`
  mutation generatePdfTransactions($input: TransactionsPdfInput) {
    generatePdfTransactions(input: $input) {
      data {
        result {
          message
          status
          pdf {
            url
            base64
            name
            date
            urlPageCount
            type
          }
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const submitPdf = gql`
  mutation submitPdf($input: SubmitPdfInputV2) {
    submitPdfV2(input: $input) {
      data {
        result {
          message
          status
          orderNumber
          remarks {
            title
            remarks
          }
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const submitPdfTransactions = gql`
  mutation submitPdfTransactions($input: SubmitPdfInputV2) {
    submitPdfTransactions(input: $input) {
      data {
        result {
          message
          status
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const orderTrackingSummary = gql`
  mutation getOrderTrackingSummary($input: PdfInput) {
    generateOrderTrackingSummary(input: $input) {
      data {
        result {
          message
          status
          pdf {
            url
            type
            date
            name
            base64
            urlPageCount
          }
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const registerPassword = gql`
  mutation signUp($input: SetPasswordInput) {
    signUp(input: $input) {
      data {
        result {
          message
          status
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

export const resendLockOtp = gql`
  mutation ResendLockOtp($input: NricInput) {
    resendLockOtp(input: $input) {
      data {
        result {
          message
          status
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const resetPassword = gql`
  mutation resetPassword($input: SetPasswordInput) {
    resetPassword(input: $input) {
      data {
        result {
          message
          status
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const resubmitOrder = gql`
  mutation resubmitOrder($input: OrderDetailsInput) {
    resubmitOrder(input: $input) {
      data {
        result {
          status
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const riskAssessment = gql`
  mutation riskAssessmentV2($input: RiskAssessmentInput) {
    riskAssessmentV2(input: $input) {
      data {
        result {
          appetite
          status
          rangeOfReturn
          type
          message
          fundSuggestion
          netWorth
          profile
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const submitChangeRequest = gql`
  mutation submitCr($input: submitCrInput) {
    submitCr(input: $input) {
      data {
        result {
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const submitHardCopyDocuments = gql`
  mutation submitHardcopyDocumentsV2($input: HardcopyDocumentsInputV2) {
    submitHardcopyDocumentsV2(input: $input) {
      data {
        result {
          orders {
            orderNumber
            status
            remarks
          }
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const submitSoftCopyDocuments = gql`
  mutation submitSoftcopyDocumentsV2($input: SoftcopyDocumentsInputV2) {
    submitSoftcopyDocumentsV2(input: $input) {
      data {
        result {
          orders {
            orderNumber
            status
            remarks
            txRef
          }
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const summaryReceipt = gql`
  mutation summaryReceipt($input: summaryReceiptInput) {
    summaryReceipt(input: $input) {
      data {
        result {
          message
          status
          pdf {
            base64
            name
            date
            type
          }
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const verifyLockOtp = gql`
  mutation verifyOtpAgent($input: otp) {
    verifyOtpAgent(input: $input) {
      data {
        result {
          message
          status
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const submitClientAccount = gql`
  mutation submitClientAccount($input: SubmitClientAccountInput) {
    submitClientAccountV2(input: $input) {
      data {
        result {
          grandTotal {
            currency
            amount
          }
          grandTotalRecurring {
            currency
            amount
          }
          orders {
            allowedRecurringType
            orderNumber
            orderDate
            orderTotalAmount {
              currency
              amount
            }
            paymentType
            investments {
              distributionInstruction
              fundClass
              fundCode
              fundCurrency
              fundingOption
              fundId
              fundIssuer
              fundName
              fundType
              investmentAmount
              isEpf
              isFea
              isScheduled
              isSyariah
              salesCharge
              scheduledInvestmentAmount
              scheduledSalesCharge
              landingFund
            }
          }
        }
      }
      error {
        errorCode
        errorList
        message
        statusCode
      }
    }
  }
`;

const submitClientAccountTransactions = gql`
  mutation submitClientAccountTransaction($input: SubmitClientAccountTransactionsInput) {
    submitClientAccountTransactions(input: $input) {
      data {
        result {
          grandTotal {
            currency
            amount
          }
          orders {
            orderNumber
            orderDate
            allowedRecurringType
            orderTotalAmount {
              currency
              amount
            }
            paymentType
            investments {
              fundingOption
              distributionInstruction
              fundCurrency
              fundId
              fundClass
              fundIssuer
              fundName
              fundType
              investmentAmount
              isEpf
              isSyariah
              salesCharge
              isScheduled
              scheduledInvestmentAmount
              scheduledSalesCharge
              isFea
              landingFund
              fundCode
            }
          }
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const submitProofOfPayments = gql`
  mutation submitProofOfPayments($input: SubmitPopInput) {
    submitProofOfPayments(input: $input) {
      data {
        result {
          account {
            status
            remarks
          }
          orders {
            orderNumber
            paymentType
            status
            remarks
            totalPayment {
              currency
              amount
            }
            excessAmount {
              currency
              amount
            }
            docList {
              title
              remarks
            }
          }
          withFloating
          message
          txRef
          withHardcopy
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const verifyOtp = gql`
  mutation verifyOtp($input: otp) {
    verifyOtp(input: $input) {
      data {
        result {
          status
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const verifySignUp = gql`
  mutation verifySignUp($input: otp) {
    verifySignUp(input: $input) {
      data {
        result {
          status
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const userLogin = gql`
  mutation UserLogin($input: LoginInput) {
    userLogin(input: $input) {
      data {
        result {
          accessKeyId
          agentCategory
          agentId
          branch
          email
          identityId
          inboxCount
          isExpired
          licenseCode
          licenseType
          name
          rank
          secretAccessKey
          sessionToken
          isMultiUtmc
          events {
            checkbox
            description
            eventName
            header
            headerDescription
            primaryButton
            s3Path
            secondaryButton
          }
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const updateInbox = gql`
  mutation updateInbox {
    updateInbox {
      data {
        result {
          status
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const submitEDDCase = gql`
  mutation submitEdd($input: SubmitEddInput) {
    submitEdd(input: $input) {
      data {
        result {
          status
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

const updateSeen = gql`
  mutation updateSeen($input: SeenInput) {
    updateSeen(input: $input) {
      data {
        result {
          status
          message
        }
      }
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;

export const GQL_MUTATIONS = {
  changePassword,
  clientRegister,
  emailOtpVerification,
  emailVerification,
  expiredPassword,
  firstTimeSignUp,
  forgotPassword,
  generatePdf,
  generatePdfTransactions,
  orderTrackingSummary,
  registerPassword,
  resendLockOtp,
  resetPassword,
  resubmitOrder,
  riskAssessment,
  submitChangeRequest,
  submitClientAccount,
  submitClientAccountTransactions,
  submitEDDCase,
  submitHardCopyDocuments,
  submitPdf,
  submitPdfTransactions,
  submitProofOfPayments,
  submitSoftCopyDocuments,
  summaryReceipt,
  updateInbox,
  updateSeen,
  userLogin,
  verifyLockOtp,
  verifyOtp,
  verifySignUp,
};
