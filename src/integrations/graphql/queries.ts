import gql from "graphql-tag";

const dashboard = gql`
  query agentDashboard($input: DashboardInput) {
    agentDashboardV2(input: $input) {
      data {
        result {
          approvedCount
          rejectedCount
          pendingCount
          rerouteCount
          submittedCount
          incompleteCount
          page
          pages
          filters {
            transactionType
            agentStatus
            accountType
          }
          orders {
            reason {
              title
              content
              documents {
                document
                count
              }
            }
            label
            highlightedText
            documents {
              document
              count
            }
            orderNumber
            reason {
              isSubmitted
              title
              content
              documents {
                document
                count
              }
            }
            label
            documents {
              document
              count
            }
            clientId
            jointId
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
            dueDate
            remark {
              label
              remark
            }
            canProceed
            isScheduled
            withHardcopy
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
  query etbCheckV2($input: etbCheckV2Input) {
    etbCheckV2(input: $input) {
      data {
        result {
          message
          status
          highRisk
          forceUpdate
          clientId
          emailAddress
          accounts {
            name
            jointName
            accountNo
            isJoint
            fundType
            paymentMethod
            isRecurring
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

const investorDashboard = gql`
  query investorDashboard($input: DashboardInput) {
    investorDashboard(input: $input) {
      data {
        result {
          totalCount
          pages
          page
          investors {
            name
            mobileNo
            riskTolerance
            email
            idNumber
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

const investorAccountDetails = gql`
  query investorAccountDetails($input: investorAccountDetailsInput) {
    investorAccountDetails(input: $input) {
      data {
        result {
          orderHistory {
            orderNumber
            transactionType
            totalInvestment {
              currency
              amount
            }
            status
            lastUpdated
          }
          documentSummary {
            accountType
            softcopy {
              required
              documents {
                mainHeader
                subHeader
                documents {
                  title
                  name
                  url
                  type
                  label
                }
              }
            }
            hardcopy {
              required
              utmcDocs {
                mainHeader
                subHeader
                documents {
                  title
                  name
                  url
                  type
                  label
                }
              }
              accDocs {
                mainHeader
                subHeader
                documents {
                  title
                  name
                  url
                  type
                  label
                }
              }
            }
          }
          withOrderHistory
          investorOverview {
            name
            idNumber
            riskProfile
            clientId
            idType
            id {
              url
              name
              type
            }
          }
          accountDetails {
            accountNumber
            accountType
            registrationDate
            distributionInstruction
          }
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

const investorDetailsDashboard = gql`
  query investorDetailsDashboard($input: InvestorInput) {
    investorDetailsDashboard(input: $input) {
      data {
        result {
          totalCount
          pages
          page
          name
          email
          mobileNo
          clientId
          dateOfBirth
          address {
            address {
              line1
              line2
              line3
            }
            city
            country
            postCode
          }
          initId
          idNumber
          idType
          accountHolder

          emailLastUpdated
          mobileNoLastUpdated
          mobileNoLastUpdated
          emailLastUpdated
          isForceUpdate
          investorDetails {
            clientId
            jointId
            email
            jointEmail
            idNumber
            idType
            jointIdNumber
            jointIdType
            name
            accountHolder
            dateOfBirth
            riskTolerance
            accountNo
            jointName
            accountOpeningDate
            paymentMethod
            fundType
            isRecurring
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
            isSeen
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

const checkPassword = gql`
  query checkPassword($input: CheckPasswordInput) {
    checkPassword(input: $input) {
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

const getOrderSummary = gql`
  query getOrderSummaryV2($input: OrderSummaryInputV2) {
    getOrderSummaryV2(input: $input) {
      data {
        result {
          status
          orderNumber
          remark {
            label
            remark
          }
          riskInfo {
            type
            appetite
            profile
            expectedRange
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
            accountNumber
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
            isCombined
            surplusNote
            fundCurrency
            investmentAmount
            paymentMethod
            transactionDate
            remark
            proofOfPayment {
              base64
              date
              name
              url
              path
              size
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
            utmc
          }
          profile {
            name
            idNumber
            idType
            clientId
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
          documentSummary {
            accountType
            softcopy {
              required
              documents {
                mainHeader
                subHeader
                documents {
                  title
                  name
                  url
                  type
                  label
                }
              }
            }
            hardcopy {
              required
              utmcDocs {
                mainHeader
                subHeader
                documents {
                  title
                  name
                  url
                  type
                  label
                }
              }
              accDocs {
                mainHeader
                subHeader
                documents {
                  title
                  name
                  url
                  type
                  label
                }
              }
            }
          }
          trackingSummary {
            createdOn
            status
            level
            remark {
              label
              remark
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
  query getReceiptSummaryList($input: ReceiptSummaryInput) {
    receiptSummary(input: $input) {
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
  query listHardcopyDocumentsV2($input: OrderDetailsInput) {
    listHardcopyDocumentsV2(input: $input) {
      data {
        result {
          account {
            principal {
              name
              docs {
                id
                title
                url
                name
                type
                isEditable
              }
            }
            joint {
              name
              docs {
                id
                title
                url
                name
                type
                isEditable
              }
            }
          }
          documents {
            name
            docs {
              id
              title
              url
              name
              type
              isEditable
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
          status
          orderNumber
          createdOn
          paymentType
          allowedRecurringType
          epfAccountNumber
          ctaDetails {
            clientName
            clientTrustAccountNumber
            ctaParent
            orderNumber
            paymentMethod
            paymentId
            proof {
              name
              url
              type
            }
            sharedTo
          }
          completedSurplusCurrencies
          isLastOrder
          recurringDetails {
            dda {
              bankAccountName
              bankAccountNumber
              recurringBank
              frequency
            }
            fpx {
              bankAccountName
              bankAccountNumber
              recurringBank
              frequency
            }
          }
          totalInvestment {
            currency
            amount
          }
          totalPaidAmount {
            currency
            amount
          }
          funds {
            distributionInstruction
            fundingOption
            fundType
            fundClass
            fundName
            fundIssuer
            fundCurrency
            investmentAmount
            salesCharge
            scheduledInvestmentAmount
            scheduledSalesCharge
            isFea
            isScheduled
            isEpf
            isSyariah
          }
          paymentCount
          surplusBalance {
            parent # payment info id NOT payment id
            belongsTo
            sharedTo
            excess {
              currency
              amount
            }
            initialExcess {
              currency
              amount
            }
            utilised {
              orderNumber
              paymentId
              currency
              amount
            }
            orderNumber
            currency
            amount
            paymentMethod
            transactionDate
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
            remark
            proof {
              name
              url
              type
            }
          }
          payment {
            paymentId
            isEditable
            belongsTo
            sharedTo
            parent
            excess {
              currency
              amount
            }
            tag {
              uuid
              orderNumber
            }
            currency
            amount
            paymentMethod
            transactionDate
            referenceNumber
            kibBankName
            kibBankAccountNumber
            bankName
            checkNumber
            clientName
            clientTrustAccountNumber
            ctaParent
            ctaTag {
              uuid
              orderNumber
            }
            epfReferenceNo
            epfAccountNumber
            bankAccountName
            bankAccountNumber
            recurringType
            recurringBank
            frequency
            remark
            proof {
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

const listSoftCopyDocuments = gql`
  query listSoftcopyDocumentsV2($input: OrderDetailsInput) {
    listSoftcopyDocumentsV2(input: $input) {
      data {
        result {
          principal {
            name
            docs {
              id
              title
              url
              name
              type
              isEditable
            }
          }
          joint {
            name
            docs {
              id
              title
              url
              name
              type
              isEditable
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
  query eddDashboardV2($input: DashboardInput) {
    eddDashboardV2(input: $input) {
      data {
        result {
          cases {
            label
            rerouteReason {
              title
              remark
            }
            isSeen
            caseId
            clientId
            caseNo
            clientName
            createdOn
            targetDate
            closeDate
            status
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
                format {
                  type
                  limit
                }
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
                  format {
                    type
                    limit
                  }
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
                    format {
                      type
                      limit
                    }
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
          client {
            name
            status
          }
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
              amlaRemark {
                type
                title
                hasDoc
                hasRemark
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
  checkPassword,
  clientProfile,
  dashboard,
  eddCaseQuestions,
  eddDashboard,
  etbCheck,
  getAgentProfile,
  getInbox,
  getOrderSummary,
  getReceiptSummaryList,
  investorAccountDetails,
  investorDashboard,
  investorDetailsDashboard,
  listHardCopyDocuments,
  listPaymentRequired,
  listSoftCopyDocuments,
  previousResponse,
  productList,
};
