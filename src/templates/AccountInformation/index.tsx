import React, { Fragment, FunctionComponent, useState } from "react";
import { ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer, FileViewer, Loading, RoundedButton, TabGroup } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  borderBottomRed1,
  colorBlue,
  colorRed,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fs10BoldGray6,
  fs18BoldGray6,
  fsTransformNone,
  px,
  sh24,
  shadow16Blue112,
  sw1,
  sw11,
  sw24,
  sw8,
  sw96,
} from "../../styles";
import { AccountTab } from "./AccountTab";
import { OrderHistoryTab, OrderHistoryTabProps } from "./OrderHistoryTab";

const { ACCOUNT_INFORMATION } = Language.PAGE;

interface AccountInformationProps {
  data: IInvestorAccount | undefined;
  handleBack: () => void;
  handleEdit: () => void;
  handleViewProfile: (clientId: string) => void;
  noEdit?: boolean;
  orderHistory: OrderHistoryTabProps;
}

export const AccountInformation: FunctionComponent<AccountInformationProps> = (props: AccountInformationProps) => {
  const { data, handleBack, handleEdit, handleViewProfile, noEdit, orderHistory } = props;
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<AccountInformationTabType>("account");

  const tabs: AccountInformationTabType[] = ["account", "order-history"];

  const handleTabs = (index: number) => {
    setActiveTab(tabs[index]);
  };

  const handleCloseViewer = () => {
    setFile(undefined);
  };

  const tabProps = {
    setFile: setFile,
  };

  let content: JSX.Element = <View />;

  if (activeTab === "account" && data !== undefined) {
    content = <AccountTab data={data} handleViewProfile={handleViewProfile} {...tabProps} />;
  }

  if (activeTab === "order-history" && data !== undefined) {
    content = <OrderHistoryTab {...orderHistory} {...tabProps} />;
  }

  const activeTabIndex = tabs.indexOf(activeTab);

  const cardStyle: ViewStyle = {
    ...flexChild,
    ...shadow16Blue112,
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
  };

  const backgroundStyle: ViewStyle = {
    backgroundColor: colorRed._1,
    borderTopLeftRadius: sw8,
    borderTopRightRadius: sw8,
  };

  const backgroundText: TextStyle = {
    color: colorWhite._1,
  };

  const accountInformationTabs: { text: string }[] = [{ text: ACCOUNT_INFORMATION.TAB_TITLE_ACCOUNT }];

  if (data !== undefined && data.orderHistory !== null && data.orderHistory.length > 0) {
    accountInformationTabs.push({ text: ACCOUNT_INFORMATION.TAB_TITLE_ORDER_HISTORY });
  }

  const buttonStyle: ViewStyle = {
    borderColor: colorBlue._1,
    borderWidth: sw1,
    height: sh24,
    width: sw96,
  };

  return (
    <Fragment>
      <ScrollView
        contentContainerStyle={flexGrow}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ ...px(sw24), backgroundColor: colorBlue._2 }}>
        <CustomSpacer space={sh24} />
        <View style={flexRow}>
          <View>
            <IcoMoon name="arrow-left" onPress={handleBack} size={sw24} suppressHighlighting={true} />
          </View>
          <CustomSpacer isHorizontal={true} space={sw8} />
          <Text style={fs18BoldGray6}>{ACCOUNT_INFORMATION.HEADER_TITLE}</Text>
          <CustomFlexSpacer />
          {noEdit === true ? null : (
            <RoundedButton
              buttonStyle={buttonStyle}
              disabled={true}
              icon="pencil"
              iconColor={colorBlue._1}
              iconSize={sw11}
              onPress={handleEdit}
              secondary={true}
              text="Edit Account"
              textStyle={{ ...fs10BoldGray6, ...fsTransformNone }}
            />
          )}
        </View>
        <CustomSpacer space={sh24} />
        <View style={data !== undefined ? undefined : flexChild}>
          <View style={cardStyle}>
            <View style={flexRow}>
              <TabGroup
                activeTab={activeTabIndex}
                selectedTextStyle={backgroundText}
                selectedViewStyle={backgroundStyle}
                setActiveTab={handleTabs}
                tabs={accountInformationTabs}
              />
              <CustomSpacer isHorizontal={true} space={sw24} />
            </View>
            <View style={borderBottomRed1} />
            {data !== undefined ? content : <Loading />}
            <CustomSpacer space={sh24} />
          </View>
          <CustomSpacer space={sh24} />
        </View>
      </ScrollView>
      {file !== undefined ? (
        <FileViewer handleClose={handleCloseViewer} resourceType="url" value={file} visible={file !== undefined} />
      ) : null}
    </Fragment>
  );
};
