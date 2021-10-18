import gql from "graphql-tag";

const dashboard = gql`
  query dashboard($input: DashboardInput) {
    dashboard(input: $input) {
      data {
        result {
          orders {
            orderNumber
            accountType
            investorName {
              principal
              joint
            }
            transactionType
            totalInvestment {
              currency
              amount
            }
            createdOn
            isSeen
            status
            dueDate
            lastUpdated
            isScheduled
            canProceed
            withHardcopy
            remark {
              label
              remark
            }
          }
          approvedCount
          rejectedCount
          pendingCount
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

const getOrderSummary = gql`
  query getOrderSummary($input: OrderSummaryInput) {
    getOrderSummary(input: $input) {
      data {
        result {
          status
          orderNumber
          remark {
            label
            remark
          }
          extensionRemark {
            date
            remark
          }
          totalInvestment {
            currency
            amount
          }
          transactionDetails {
            registrationDate
            servicingAdviserName
            servicingAdviserCode
            kibProcessingBranch
            accountType
            accountNo
            accountOperationMode
          }
          investmentSummary {
            distributionInstruction
            fundClass
            fundCode
            fundCurrency
            fundingOption
            fundIssuer
            fundName
            fundType
            investmentAmount
            investmentType
            isFea
            recurring
            salesCharge
            scheduledInvestmentAmount
            scheduledSalesCharge
          }
          paymentSummary {
            fundCurrency
            investmentAmount
            paymentMethod
            transactionDate
            remark
            proofOfPayment {
              name
              url
              type
            }
            referenceNumber
            kibBankName
            kibBankAccountNumber
            bankName
            checkNumber
            clientName
            clientTrustAccountNumber
            epfReferenceNo
            epfAccountNumber
            bankAccountName
            bankAccountNumber
            recurringType
            recurringBank
            frequency
          }
          profile {
            name
            idNumber
            idType
            personalDetails {
              dateOfBirth
              salutation
              gender
              nationality
              bumiputera
              race
              placeOfBirth
              countryOfBirth
              educationLevel
              mothersMaidenName
              maritalStatus
              riskProfile
              relationship
              monthlyHouseholdIncome
            }
            epfDetails {
              epfMemberNumber
              epfAccountType
            }
            employmentInformation {
              occupation
              natureOfBusiness
              annualIncome
              nameOfEmployer
              address {
                address {
                  line1
                  line2
                  line3
                }
                city
                country
                postCode
                state
              }
            }
            addressInformation {
              mailingAddress {
                address {
                  line1
                  line2
                  line3
                }
                city
                country
                postCode
                state
              }
              permanentAddress {
                address {
                  line1
                  line2
                  line3
                }
                city
                country
                postCode
                state
              }
            }
            contactDetails {
              officeNumber
              homeNumber
              mobileNumber
              faxNumber
              email
            }
            bankInformation {
              localBank {
                currency
                bankName
                bankAccountName
                bankAccountNumber
                bankLocation
                bankSwiftCode
              }
              foreignBank {
                currency
                bankName
                bankAccountName
                bankAccountNumber
                bankLocation
                bankSwiftCode
              }
            }
            declaration {
              fatca {
                usCitizen
                usBorn
                confirmAddress
                certificate {
                  name
                  url
                  type
                }
                formW9 {
                  name
                  url
                  type
                }
                formW8Ben {
                  name
                  url
                  type
                }
                reason
                correspondenceDeclaration
              }
              crs {
                taxResident
                tin {
                  country
                  tinNumber
                  reason
                }
              }
              fea {
                resident
                borrowingFacility
                balance
              }
            }
            uploadedDocument {
              name
              url
              type
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

const listHardCopyDocuments = gql`
  query listHardcopyDocuments($input: OrderDetailsInput) {
    listHardcopyDocuments(input: $input) {
      data {
        result {
          documents {
            name
            docs {
              id
              title
              url
              name
            }
          }
          branchList {
            branchId
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

const listPaymentRequired = gql`
  query listPaymentRequired($input: OrderDetailsInput) {
    listPaymentRequired(input: $input) {
      data {
        result {
          orderNumber
          allowedRecurringType
          epfAccountNumber
          paymentType
          status
          createdOn
          totalInvestment {
            currency
            amount
          }
          totalPaidAmount {
            currency
            amount
          }
          surplusBalance
          paymentCount
          funds {
            distributionInstruction
            fundClass
            fundCurrency
            fundingOption
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
          payment {
            id
            title
            url
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

const listSoftCopyDocuments = gql`
  query listSoftcopyDocuments($input: OrderDetailsInput) {
    listSoftcopyDocuments(input: $input) {
      data {
        result {
          joint {
            name
            docs {
              id
              title
              url
              name
            }
          }
          principal {
            name
            docs {
              id
              title
              url
              name
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

const productList = gql`
  query productList($input: ProductFilter) {
    productList(input: $input) {
      data {
        result {
          products {
            fundCode
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
            isEpfOnly
            prsType
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

const eddDashboard = gql`
  query eddDashboard($input: DashboardInput) {
    eddDashboard(input: $input) {
      data {
        result {
          cases {
            caseId
            clientId
            caseNo
            clientName
            createdOn
            targetDate
            closeDate
            status
            isSeen
            accountNo
            lastUpdated
            daysRemaining
            remark {
              label
              remark
            }
          }
          pendingCount
          reroutedCount
          newCount
          historyCount
          submittedCount
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

const eddCaseQuestions = gql`
  query caseQuestions($input: EddCommonInput) {
    caseQuestions(input: $input) {
      data {
        result {
          client {
            name
            status
          }
          data {
            amlaTitle {
              user
              status
              time
            }
            questions {
              id
              description
              title
              options {
                type
                title
                hasDoc
                hasRemark
                autoHide
                id
                parent
                values
                info
                valuesDescription
                multiSelection
                description
                options {
                  id
                  title
                  type
                  parent
                  info
                  values
                  valuesDescription
                  multiSelection
                  description
                  options {
                    id
                    title
                    type
                    parent
                    info
                    values
                    valuesDescription
                    multiSelection
                    description
                  }
                }
              }
            }
            additionalQuestions {
              title
              options {
                type
                hasRemark
                hasDoc
              }
            }
          }
        }
      }
      error {
        errorCode
        message
        errorList
      }
    }
  }
`;

const clientProfile = gql`
  query clientProfile($input: EddCommonInput) {
    clientProfile(input: $input) {
      data {
        result {
          profile {
            createdAt
            incomeDistribution
            signatory
            accountType
            client {
              name
              idNumber
              idType
              personalDetails {
                dateOfBirth
                salutation
                gender
                nationality
                bumiputera
                race
                placeOfBirth
                countryOfBirth
                educationLevel
                mothersMaidenName
                maritalStatus
                riskProfile
                relationship
                monthlyHouseholdIncome
              }
              epfDetails {
                epfMemberNumber
                epfAccountType
              }
              employmentInformation {
                occupation
                natureOfBusiness
                annualIncome
                nameOfEmployer
                address {
                  address {
                    line1
                    line2
                    line3
                  }
                  city
                  country
                  postCode
                  state
                }
              }
              addressInformation {
                mailingAddress {
                  address {
                    line1
                    line2
                    line3
                  }
                  city
                  country
                  postCode
                  state
                }
                permanentAddress {
                  address {
                    line1
                    line2
                    line3
                  }
                  city
                  country
                  postCode
                  state
                }
              }
              contactDetails {
                officeNumber
                homeNumber
                mobileNumber
                faxNumber
                email
              }
              bankInformation {
                localBank {
                  currency
                  bankName
                  bankAccountName
                  bankAccountNumber
                  bankLocation
                  bankSwiftCode
                }
                foreignBank {
                  currency
                  bankName
                  bankAccountName
                  bankAccountNumber
                  bankLocation
                  bankSwiftCode
                }
              }
              declaration {
                fatca {
                  usCitizen
                  usBorn
                  confirmAddress
                  certificate {
                    name
                    url
                    type
                  }
                  formW9 {
                    name
                    url
                    type
                  }
                  formW8Ben {
                    name
                    url
                    type
                  }
                  reason
                  correspondenceDeclaration
                }
                crs {
                  taxResident
                  tin {
                    country
                    tinNumber
                    reason
                  }
                }
                fea {
                  resident
                  borrowingFacility
                  balance
                }
              }
              uploadedDocument {
                name
                url
                type
              }
            }
          }
        }
      }
      error {
        errorCode
        message
        errorList
      }
    }
  }
`;

const caseResponse = gql`
  query caseResponse($input: CaseResponseInput) {
    caseResponse(input: $input) {
      data {
        result {
          response {
            agent {
              time
              user
              status
            }
            amla {
              time
              user
              status
            }
            count
            data {
              question
              questionId
              description
              answers
              amlaRemark
            }
            questions {
              question
              questionId
              description
              amlaRemark
            }
          }
          client {
            name
            status
          }
        }
      }
      error {
        errorCode
        message
        errorList
      }
    }
  }
`;

const previousResponse = gql`
  query previousResponse($input: PreviousResponseInput) {
    previousResponse(input: $input) {
      data {
        result {
          questionId
          answer
        }
      }
      error {
        errorCode
        message
        errorList
      }
    }
  }
`;

export const GQL_QUERIES = {
  caseResponse,
  clientProfile,
  dashboard,
  etbCheck,
  eddDashboard,
  eddCaseQuestions,
  getAgentProfile,
  getInbox,
  getOrderSummary,
  getReceiptSummaryList,
  listHardCopyDocuments,
  listPaymentRequired,
  listSoftCopyDocuments,
  previousResponse,
  productList,
};
