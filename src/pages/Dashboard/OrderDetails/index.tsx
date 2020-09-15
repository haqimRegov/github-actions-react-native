import { StackNavigationProp } from "@react-navigation/stack";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, Pagination, Tab } from "../../../components";
import { Language } from "../../../constants/language";
import { ORDER_DETAILS_MOCKS } from "../../../mocks/order-details";
import { borderBottomBlack21, colorWhite, flexChild, flexRow, sh16, sh24, sh56, shadowBlue5, sw24 } from "../../../styles";
import { DashboardLayout } from "../DashboardLayout";
import { AccountDetails } from "./Account";
import { InvestmentDetails } from "./InvestmentDetails";
import { TransactionDetails } from "./Transaction";

const { DASHBOARD_ORDER_DETAILS } = Language.PAGE;

interface OrderDetailsProps {
  navigation: StackNavigationProp<RootNavigatorType>;
  handleRoute: (route: string) => void;
}

const initialData: IOrderDetails = {
  investmentSummary: [],
  accountDetails: {
    principal: {
      name: "",
      id: "",
      idProof: {
        name: "",
        type: "",
      },
      accountSummary: {
        accountNo: "",
        birthCountry: "",
        birthPlace: "",
        dob: "",
        educationLevel: "",
        gender: "",
        maritalStatus: "",
        motherName: "",
        nationality: "",
        registrationDate: "",
        riskProfile: "",
        salutation: "",
      },
      addressInfo: {
        permanentAddress: {
          address: "",
          postCode: "",
          city: "",
          state: "",
          country: "",
        },
        mailingAddress: {
          address: "",
          postCode: "",
          city: "",
          state: "",
          country: "",
        },
      },
      contactDetails: {
        email: "",
        mobile: "",
      },
      bankSummary: {
        localBank: [
          {
            currency: "",
            accountName: "",
            bankName: "",
            bankCode: "",
            accountNo: "",
            swiftCode: "",
            location: "",
          },
        ],
        foreignBank: [
          {
            currency: "",
            accountName: "",
            bankName: "",
            bankCode: "",
            accountNo: "",
            swiftCode: "",
            location: "",
          },
        ],
      },
      employmentInfo: {
        occupation: "",
        employerAddress: "",
        employerName: "",
        postCode: "",
        businessNature: "",
        city: "",
        monthlyIncome: "",
        state: "",
        country: "",
      },
      fatcaCRS: {
        usCitizen: "",
        usBorn: "",
        malaysiaResident: "",
        tin: [],
        crs: "",
      },
      uploads: {},
    },
  },
  transactionDetails: {
    transactionSummary: {
      omniReference: "",
      transactionDate: "",
      adviserName: "",
      adviserCode: "",
      accountType: "",
      accountNumber: "",
      processingBranch: "",
    },
  },
};

export const OrderDetails: FunctionComponent<OrderDetailsProps> = ({ navigation, handleRoute }: OrderDetailsProps) => {
  const [data, setData] = useState<IOrderDetails>(initialData);
  const [selection, setSelection] = useState<number>(0);

  const handleAccountDetails = () => {
    setSelection(1);
  };

  const handleInvestment = () => {
    setSelection(0);
  };

  const handleTransactionDetails = () => {
    setSelection(2);
  };

  const handleNext = () => {
    Alert.alert("Handle next");
  };

  const handleBack = () => {
    handleRoute("");
  };

  const handlePrevious = () => {
    Alert.alert("Handle previous");
  };

  let content: JSX.Element = <View />;

  switch (selection) {
    case 1:
      content = <AccountDetails data={data.accountDetails} />;
      break;
    case 2:
      content = <TransactionDetails data={data.transactionDetails} />;
      break;
    default:
      content = <InvestmentDetails data={data.investmentSummary} />;
  }

  useEffect(() => {
    setData(ORDER_DETAILS_MOCKS);
  }, []);

  const cardStyle: ViewStyle = {
    ...flexChild,
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    marginHorizontal: sw24,
    marginVertical: sh24,
  };

  return (
    <DashboardLayout
      navigation={navigation}
      title={DASHBOARD_ORDER_DETAILS.LABEL_ORDER_DETAILS}
      titleIcon="arrow-left"
      titleIconOnPress={handleBack}>
      <View style={flexChild}>
        <View style={cardStyle}>
          <CustomSpacer space={sh16} />
          <View style={flexRow}>
            <Tab
              onPress={handleInvestment}
              selected={selection === 0}
              style={{ height: sh56 }}
              text={DASHBOARD_ORDER_DETAILS.LABEL_INVESTMENT}
            />
            <Tab
              onPress={handleAccountDetails}
              selected={selection === 1}
              style={{ height: sh56 }}
              text={DASHBOARD_ORDER_DETAILS.LABEL_ACCOUNT_DETAILS}
            />
            <Tab
              onPress={handleTransactionDetails}
              selected={selection === 2}
              style={{ height: sh56 }}
              text={DASHBOARD_ORDER_DETAILS.LABEL_TRANSACTION_DETAILS}
            />
            <CustomFlexSpacer />
            {selection === 0 ? (
              <Pagination onPressNext={handleNext} onPressPrev={handlePrevious} page={1} totalItems={36} itemsPerPage={20} />
            ) : null}
            <CustomSpacer isHorizontal={true} space={sw24} />
          </View>
          <View style={borderBottomBlack21} />
          {content}
        </View>
      </View>
    </DashboardLayout>
  );
};
