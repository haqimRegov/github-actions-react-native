import gql from "graphql-tag";

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
          orders {
            orderNumber
            orderDate
            orderTotalAmount {
              currency
              amount
            }
            paymentType
            investments {
              fundingOption
              distributionInstruction
              fundClass
              fundCurrency
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
          identityId
          secretAccessKey
          sessionToken
          accessKeyId
          email
          name
          agentId
          licenseCode
          licenseType
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
  clientRegister,
  emailVerification,
  emailOtpVerification,
  firstTimeSignUp,
  forgotPassword,
  registerPassword,
  resendLockOtp,
  resetPassword,
  riskAssessment,
  submitClientAccount,
  userLogin,
  verifyLockOtp,
  verifyOtp,
  verifySignUp,
};
