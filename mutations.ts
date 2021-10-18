/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const userLogin = /* GraphQL */ `
  mutation UserLogin($input: LoginInput) {
    userLogin(input: $input) {
      id
      username
      password
      data {
        result {
          accessKeyId
          agentId
          branch
          email
          name
          inboxCount
          rank
          identityId
          licenseCode
          licenseType
          secretAccessKey
          sessionToken
          isExpired
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
export const agentRegister = /* GraphQL */ `
  mutation AgentRegister($input: RegisterInput) {
    agentRegister(input: $input) {
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
export const activate = /* GraphQL */ `
  mutation Activate($input: ActivateInput) {
    activate(input: $input) {
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
export const changePassword = /* GraphQL */ `
  mutation ChangePassword($input: ChangePasswordInput) {
    changePassword(input: $input) {
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
export const emailVerification = /* GraphQL */ `
  mutation EmailVerification($input: email) {
    emailVerification(input: $input) {
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
export const emailOtpVerification = /* GraphQL */ `
  mutation EmailOtpVerification($input: verifyOtp) {
    emailOtpVerification(input: $input) {
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
export const firstTimeSignUp = /* GraphQL */ `
  mutation FirstTimeSignUp($input: NricInput) {
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
export const verifySignUp = /* GraphQL */ `
  mutation VerifySignUp($input: otp) {
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
export const signUp = /* GraphQL */ `
  mutation SignUp($input: SetPasswordInput) {
    signUp(input: $input) {
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
export const resendLockOtp = /* GraphQL */ `
  mutation ResendLockOtp($input: NricInput) {
    resendLockOtp(input: $input) {
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
export const forgotPassword = /* GraphQL */ `
  mutation ForgotPassword($input: NricInput) {
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
export const verifyOtp = /* GraphQL */ `
  mutation VerifyOtp($input: otp) {
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
export const verifyOtpAgent = /* GraphQL */ `
  mutation VerifyOtpAgent($input: otp) {
    verifyOtpAgent(input: $input) {
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
export const resendOtp = /* GraphQL */ `
  mutation ResendOtp($input: ResendOtp) {
    resendOtp(input: $input) {
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
export const resetPassword = /* GraphQL */ `
  mutation ResetPassword($input: SetPasswordInput) {
    resetPassword(input: $input) {
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
export const clientRegister = /* GraphQL */ `
  mutation ClientRegister($input: register) {
    clientRegister(input: $input) {
      data {
        result {
          message
          status
          accountType
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
export const riskAssessment = /* GraphQL */ `
  mutation RiskAssessment($input: risk) {
    riskAssessment(input: $input) {
      data {
        result {
          message
          status
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
export const submitClientAccount = /* GraphQL */ `
  mutation SubmitClientAccount($input: SubmitClientAccountInput) {
    submitClientAccount(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const generatePdf = /* GraphQL */ `
  mutation GeneratePdf($input: PdfInput) {
    generatePdf(input: $input) {
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
export const submitPdf = /* GraphQL */ `
  mutation SubmitPdf($input: submitPdfInput) {
    submitPdf(input: $input) {
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
export const summaryReceipt = /* GraphQL */ `
  mutation SummaryReceipt($input: summaryReceiptInput) {
    summaryReceipt(input: $input) {
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
export const updateInbox = /* GraphQL */ `
  mutation UpdateInbox {
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
export const updateSeen = /* GraphQL */ `
  mutation UpdateSeen($input: SeenInput) {
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
export const submitProofOfPayments = /* GraphQL */ `
  mutation SubmitProofOfPayments($input: SubmitPopInput) {
    submitProofOfPayments(input: $input) {
      data {
        result {
          withFloating
          message
          txRef
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
export const submitHardcopyDocuments = /* GraphQL */ `
  mutation SubmitHardcopyDocuments($input: HardcopyDocumentsInput) {
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
export const submitSoftcopyDocuments = /* GraphQL */ `
  mutation SubmitSoftcopyDocuments($input: SoftcopyDocumentsInput) {
    submitSoftcopyDocuments(input: $input) {
      data {
        result {
          status
          message
          txRef
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
export const resubmitOrder = /* GraphQL */ `
  mutation ResubmitOrder($input: OrderDetailsInput) {
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
export const submitEdd = /* GraphQL */ `
  mutation SubmitEdd($input: SubmitEddInput) {
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
