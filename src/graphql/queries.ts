/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const productList = /* GraphQL */ `
  query ProductList($input: ProductFilter) {
    productList(input: $input) {
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
  query GetDocuments($input: DocumentInput) {
    getDocuments(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const clientStatus = /* GraphQL */ `
  query ClientStatus($input: clientExist) {
    clientStatus(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const recognizeImage = /* GraphQL */ `
  query RecognizeImage($input: OcrInput) {
    recognizeImage(input: $input) {
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
export const getCaseDetails = /* GraphQL */ `
  query GetCaseDetails($input: CommonInput) {
    getCaseDetails(input: $input) {
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
  query GetInbox($input: PageInput) {
    getInbox(input: $input) {
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
      error {
        errorCode
        message
        statusCode
        errorList
      }
    }
  }
`;
