import gql from "graphql-tag";

const changePassword = gql`
  mutation ChangePassword($input: ChangePasswordInput) {
    changePassword(input: $input) {
      data {
        result {
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

const clientRegister = gql`
  mutation ClientRegister($input: register) {
    clientRegister(input: $input) {
      data {
        result {
          message
          principalHolder {
            clientId
            dateOfBirth
            id
            name
          }
          jointHolder {
            dateOfBirth
            id
            name
            clientId
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
  mutation emailVerification($input: email) {
    emailVerification(input: $input) {
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
  mutation emailOtpVerification($input: verifyOtp) {
    emailOtpVerification(input: $input) {
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
    generatePdf(input: $input) {
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

const submitPdf = gql`
  mutation submitPdf($input: submitPdfInput) {
    submitPdf(input: $input) {
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
  mutation RiskAssessment($input: risk) {
    riskAssessment(input: $input) {
      data {
        result {
          appetite
          rangeOfReturn
          type
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

const submitHardCopyDocuments = gql`
  mutation submitHardcopyDocuments($input: HardcopyDocumentsInput) {
    submitHardcopyDocuments(input: $input) {
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

const submitSoftCopyDocuments = gql`
  mutation submitSoftcopyDocuments($input: SoftcopyDocumentsInput) {
    submitSoftcopyDocuments(input: $input) {
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
  mutation SubmitClientAccount($input: SubmitClientAccountInput) {
    submitClientAccount(input: $input) {
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
          }
          withFloating
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
          agentId
          branch
          email
          identityId
          inboxCount
          licenseCode
          licenseType
          name
          rank
          secretAccessKey
          sessionToken
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
  mutation updateinbox($input: UpdateInboxInput) {
    updateInbox(input: $input) {
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
  firstTimeSignUp,
  forgotPassword,
  generatePdf,
  registerPassword,
  resendLockOtp,
  resetPassword,
  resubmitOrder,
  riskAssessment,
  submitClientAccount,
  submitPdf,
  submitProofOfPayments,
  submitHardCopyDocuments,
  submitSoftCopyDocuments,
  summaryReceipt,
  updateInbox,
  userLogin,
  verifyLockOtp,
  verifyOtp,
  verifySignUp,
};
