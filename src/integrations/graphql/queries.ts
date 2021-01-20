import gql from "graphql-tag";

const getInbox = gql`
  query getInbox($input: InboxInput) {
    getInbox(input: $input) {
      data {
        result {
          inbox {
            notificationId
            title
            message
            senderName
            source
            searchKey
            searchType
            isRead
            updatedAt
            createdOn
          }
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

const productList = gql`
  query productList($input: ProductFilter) {
    productList(input: $input) {
      data {
        result {
          products {
            fundCurrencies
            fundClasses
            fundId
            fundAbbr
            fundName
            fundType
            fundCategory
            issuingHouse
            riskCategory
            isEpf
            isSyariah
            isWholesale
            isScheduled
            ampFee
            masterList {
              fundId
              class
              currency
              salesCharge {
                epf {
                  min
                  max
                }
                cash {
                  min
                  max
                }
              }
              newSalesAmount {
                epf {
                  min
                  max
                }
                cash {
                  min
                  max
                }
              }
              topUpAmount {
                epf {
                  min
                  max
                }
                cash {
                  min
                  max
                }
              }
            }
            fundObjective
            landingFund
            annualManagementFee
            performance
            docs {
              url
              name
            }
          }
          page
          pages
          totalCount {
            recommended
            all
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

const etbCheck = gql`
  query etbCheck($input: clientStatusInput) {
    etbCheck(input: $input) {
      data {
        result {
          message
          status
          highRisk
          accounts {
            accountNumber
            date
            accountType
            name
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

const getAgentProfile = gql`
  query getAgentProfile {
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
          address {
            address
            city
            postCode
            state
            country
          }
          region
          rank
          agency
        }
      }
      error {
        errorCode
        message
        statusCode
      }
    }
  }
`;

const getReceiptSummaryList = gql`
  query getReceiptSummaryList($input: getReceiptSummaryListInput) {
    getReceiptSummaryList(input: $input) {
      data {
        result {
          message
          status
          orders {
            name
            orderNumber
            isScheduled
            isEpf
            fundType
            fundCount
            orderTotalAmount {
              currency
              amount
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

export const GQL_QUERIES = { etbCheck, getAgentProfile, getInbox, getReceiptSummaryList, productList };
