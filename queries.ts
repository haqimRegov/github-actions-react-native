/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const clientStatus = /* GraphQL */ `
  query ClientStatus($input: clientExist) {
    clientStatus(input: $input) {
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
export const etbCheck = /* GraphQL */ `
  query EtbCheck($input: clientStatusInput) {
    etbCheck(input: $input) {
      data {
        result {
          message
          status
          highRisk
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
export const productList = /* GraphQL */ `
  query ProductList($input: ProductFilter) {
    productList(input: $input) {
      data {
        result {
          pages
          page
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
export const productDetails = /* GraphQL */ `
  query ProductDetails($input: ProductDetailsFilter) {
    productDetails(input: $input) {
      data {
        result {
          fundName
          issuingHouse
          fundObjective
          landingFund
          fundCategory
          fundType
          riskCategory
          isSyariah
          isEpf
          ampFee
          salesChargeCash
          salesChargeEpf
          annualManagementFee
          minInvestment
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
export const getDocuments = /* GraphQL */ `
  query GetDocuments($input: GetDocumentInput) {
    getDocuments(input: $input) {
      data {
        result {
          name
          base64
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
export const dashboard = /* GraphQL */ `
  query Dashboard($input: DashboardInput) {
    dashboard(input: $input) {
      data {
        result {
          totalResultCount
          pendingCount
          approvedCount
          rejectedCount
          page
          pages
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
export const eddDashboard = /* GraphQL */ `
  query EddDashboard($input: DashboardInput) {
    eddDashboard(input: $input) {
      data {
        result {
          pendingCount
          reroutedCount
          submittedCount
          historyCount
          newCount
          page
          pages
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
export const getInbox = /* GraphQL */ `
  query GetInbox($input: InboxInput) {
    getInbox(input: $input) {
      data {
        result {
          newMessageCount
          page
          pages
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
export const agentProfile = /* GraphQL */ `
  query AgentProfile {
    agentProfile {
      data {
        result {
          agentId
          agentName
          nric
          agentCode
          licenseCode
          bdmName
          channel
          status
          branchName
          bdmEmail
          omniEnabled
          email
          mobileNo
          region
          rank
          agency
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
export const caseDetails = /* GraphQL */ `
  query CaseDetails($input: CaseIdInput) {
    caseDetails(input: $input) {
      data {
        result {
          id
          createdOn
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
export const getOrderSummary = /* GraphQL */ `
  query GetOrderSummary($input: OrderSummaryInput) {
    getOrderSummary(input: $input) {
      data {
        result {
          status
          orderNumber
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
export const getReceiptSummaryList = /* GraphQL */ `
  query GetReceiptSummaryList($input: getReceiptSummaryListInput) {
    getReceiptSummaryList(input: $input) {
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
export const listPaymentRequired = /* GraphQL */ `
  query ListPaymentRequired($input: OrderDetailsInput) {
    listPaymentRequired(input: $input) {
      data {
        result {
          orderNumber
          paymentType
          status
          createdOn
          allowedRecurringType
          epfAccountNumber
          surplusBalance
          paymentCount
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
export const listHardcopyDocuments = /* GraphQL */ `
  query ListHardcopyDocuments($input: OrderDetailsInput) {
    listHardcopyDocuments(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const listSoftcopyDocuments = /* GraphQL */ `
  query ListSoftcopyDocuments($input: OrderDetailsInput) {
    listSoftcopyDocuments(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const caseQuestions = /* GraphQL */ `
  query CaseQuestions($input: EddCommonInput) {
    caseQuestions(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const clientProfile = /* GraphQL */ `
  query ClientProfile($input: EddCommonInput) {
    clientProfile(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const caseResponse = /* GraphQL */ `
  query CaseResponse($input: CaseResponseInput) {
    caseResponse(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const previousResponse = /* GraphQL */ `
  query PreviousResponse($input: PreviousResponseInput) {
    previousResponse(input: $input) {
      data {
        result {
          answer
          questionId
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
