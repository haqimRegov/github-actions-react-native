/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const userLogin = /* GraphQL */ `
  mutation UserLogin($input: LoginInput) {
    userLogin(input: $input) {
      id
      username
      password
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
  mutation verifyOtpAgent($input: otp) {
    verifyOtpAgent(input: $input) {
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
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const checkoutInvestmentDetails = /* GraphQL */ `
  mutation CheckoutInvestmentDetails($input: InvestmentInput) {
    checkoutInvestmentDetails(input: $input) {
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
  mutation UpdateInbox($input: UpdateInboxInput) {
    updateInbox(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const createSnsEndpoint = /* GraphQL */ `
  mutation CreateSnsEndpoint($input: SnsInput) {
    createSnsEndpoint(input: $input) {
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
  mutation EmailOtpVerification($input: verifyotp) {
    emailOtpVerification(input: $input) {
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
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
