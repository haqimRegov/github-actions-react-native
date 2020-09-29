import gql from "graphql-tag";

const clientRegister = gql`
  mutation ClientRegister($input: register) {
    clientRegister(input: $input) {
      data {
        result {
          clientId
          name
          message
          dateOfBirth
          gender
          id
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
          licenseCode
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
  firstTimeSignUp,
  forgotPassword,
  registerPassword,
  resendLockOtp,
  resetPassword,
  riskAssessment,
  userLogin,
  verifyLockOtp,
  verifyOtp,
  verifySignUp,
};
