/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type LoginInput = {
  username: string,
  password: string,
  identityId?: string | null,
};

export type RegisterInput = {
  username: string,
  name: string,
  email: string,
  address: string,
  addrTown: string,
  mobile: string,
  licenseCode: string,
};

export type ChangePasswordInput = {
  password: string,
  confirmPassword: string,
};

export type register = {
  id: string,
  name: string,
  agentId: string,
  idType?: number | null,
  accountType: number,
  dateOfBirth?: string | null,
};

export type NricInput = {
  nric: string,
};

export type otp = {
  nric: string,
  code: number,
};

export type SetPasswordInput = {
  username: string,
  password: string,
  confirmPassword: string,
};

export type ResendOtp = {
  type?: string | null,
  nric: string,
};

export type InvestmentInput = {
  investmentDetails?: Array< Investment | null > | null,
  clientId?: string | null,
  accountType?: string | null,
};

export type Investment = {
  fundCode?: string | null,
  fundingOption?: string | null,
  currency?: string | null,
  investmentAmount?: number | null,
  scheduledPayment?: boolean | null,
  salesCharge?: number | null,
  scheduledInvestmentAmount?: number | null,
  scheduledInvestment?: number | null,
};

export type UpdateInboxInput = {
  type?: string | null,
  notificationIds?: string | null,
};

export type SnsInput = {
  deviceToken?: string | null,
};

export type risk = {
  clientId: string,
  riskAssessment?: assessment | null,
};

export type assessment = {
  questionOne: number,
  questionTwo: number,
  questionThree: number,
  questionFour: number,
  questionFive: number,
  questionSix: number,
  questionSeven: number,
};

export type email = {
  email: string,
  clientId: string,
};

export type verifyotp = {
  email: string,
  clientId: string,
  code: number,
};

export type SubmitEddInput = {
  caseId?: string | null,
  agentRemark?: string | null,
  agentSuspicion?: string | null,
  answers?: Array< SubmitAnswer | null > | null,
};

export type SubmitAnswer = {
  moduleId?: string | null,
  questionId?: string | null,
  answer?: string | null,
};

export type ProductFilter = {
  id?: string | null,
  fundCategory?: Array< string | null > | null,
  riskCategory?: Array< string | null > | null,
  isSyariah?: string | null,
  isEpf?: string | null,
  issuingHouse?: Array< string | null > | null,
  fundCurrency?: Array< string | null > | null,
  fundType?: string | null,
  fundName?: string | null,
  utType?: string | null,
  prsType?: string | null,
  page?: string | null,
};

export type DocumentInput = {
  fundId?: string | null,
  clientId?: string | null,
};

export type clientExist = {
  id: string,
};

export type OcrInput = {
  image?: string | null,
};

export type CommonInput = {
  caseId?: string | null,
};

export type PageInput = {
  page?: string | null,
};

export type DashboardInput = {
  tab?: string | null,
  page?: string | null,
  sortedBy?: string | null,
  order?: string | null,
};

export type UserLoginMutationVariables = {
  input?: LoginInput | null,
};

export type UserLoginMutation = {
  userLogin:  {
    __typename: "AgentLogin",
    id: string,
    username: string,
    password: string,
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type AgentRegisterMutationVariables = {
  input?: RegisterInput | null,
};

export type AgentRegisterMutation = {
  agentRegister:  {
    __typename: "AgentRegistration",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type ChangePasswordMutationVariables = {
  input?: ChangePasswordInput | null,
};

export type ChangePasswordMutation = {
  changePassword:  {
    __typename: "ChangePassword",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type ClientRegisterMutationVariables = {
  input?: register | null,
};

export type ClientRegisterMutation = {
  clientRegister:  {
    __typename: "registerClient",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type FirstTimeSignUpMutationVariables = {
  input?: NricInput | null,
};

export type FirstTimeSignUpMutation = {
  firstTimeSignUp:  {
    __typename: "FirstTimeSignUp",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type VerifySignUpMutationVariables = {
  input?: otp | null,
};

export type VerifySignUpMutation = {
  verifySignUp:  {
    __typename: "VerifySignUpOTP",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type SignUpMutationVariables = {
  input?: SetPasswordInput | null,
};

export type SignUpMutation = {
  signUp:  {
    __typename: "SignUpPassword",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type ResendLockOtpMutationVariables = {
  input?: NricInput | null,
};

export type ResendLockOtpMutation = {
  resendLockOtp:  {
    __typename: "EnableAgent",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type ForgotPasswordMutationVariables = {
  input?: NricInput | null,
};

export type ForgotPasswordMutation = {
  forgotPassword:  {
    __typename: "PasswordReset",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type VerifyOtpMutationVariables = {
  input?: otp | null,
};

export type VerifyOtpMutation = {
  verifyOtp:  {
    __typename: "OtpVerification",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type VerifyOtpAgentMutationVariables = {
  input?: otp | null,
};

export type VerifyOtpAgentMutation = {
  verifyOtpAgent:  {
    __typename: "VerifyOtpAgent",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type ResendOtpMutationVariables = {
  input?: ResendOtp | null,
};

export type ResendOtpMutation = {
  resendOtp:  {
    __typename: "ResendOtpVerify",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type ResetPasswordMutationVariables = {
  input?: SetPasswordInput | null,
};

export type ResetPasswordMutation = {
  resetPassword:  {
    __typename: "ResetPassword",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type CheckoutInvestmentDetailsMutationVariables = {
  input?: InvestmentInput | null,
};

export type CheckoutInvestmentDetailsMutation = {
  checkoutInvestmentDetails:  {
    __typename: "InvestmentOutput",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type UpdateInboxMutationVariables = {
  input?: UpdateInboxInput | null,
};

export type UpdateInboxMutation = {
  updateInbox:  {
    __typename: "UpdateInbox",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type CreateSnsEndpointMutationVariables = {
  input?: SnsInput | null,
};

export type CreateSnsEndpointMutation = {
  createSnsEndpoint:  {
    __typename: "CreateSnsEndpoint",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type RiskAssessmentMutationVariables = {
  input?: risk | null,
};

export type RiskAssessmentMutation = {
  riskAssessment:  {
    __typename: "riskcalculation",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type EmailVerificationMutationVariables = {
  input?: email | null,
};

export type EmailVerificationMutation = {
  emailVerification:  {
    __typename: "EmailVerification",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type EmailOtpVerificationMutationVariables = {
  input?: verifyotp | null,
};

export type EmailOtpVerificationMutation = {
  emailOtpVerification:  {
    __typename: "VerifyOtp",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type SubmitEddMutationVariables = {
  input?: SubmitEddInput | null,
};

export type SubmitEddMutation = {
  submitEdd:  {
    __typename: "CommonOutput",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type ProductListQueryVariables = {
  input?: ProductFilter | null,
};

export type ProductListQuery = {
  productList:  {
    __typename: "ProductList",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type GetDocumentsQueryVariables = {
  input?: DocumentInput | null,
};

export type GetDocumentsQuery = {
  getDocuments:  {
    __typename: "GetDocuments",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type ClientStatusQueryVariables = {
  input?: clientExist | null,
};

export type ClientStatusQuery = {
  clientStatus:  {
    __typename: "clientStatus",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type RecognizeImageQueryVariables = {
  input?: OcrInput | null,
};

export type RecognizeImageQuery = {
  recognizeImage:  {
    __typename: "Ocr",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type GetCaseDetailsQueryVariables = {
  input?: CommonInput | null,
};

export type GetCaseDetailsQuery = {
  getCaseDetails:  {
    __typename: "getCaseDetails",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type GetInboxQueryVariables = {
  input?: PageInput | null,
};

export type GetInboxQuery = {
  getInbox:  {
    __typename: "GetInbox",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type AgentProfileQuery = {
  agentProfile:  {
    __typename: "AgentProfile",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};

export type DashboardQueryVariables = {
  input?: DashboardInput | null,
};

export type DashboardQuery = {
  dashboard:  {
    __typename: "Dashboard",
    error:  {
      __typename: "Error",
      errorCode: string | null,
      message: string | null,
      statusCode: string | null,
      errorList: Array< string | null > | null,
    } | null,
  } | null,
};
