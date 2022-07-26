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
import { DocumentsTab } from "../Dashboard";
import { DeclarationsTab } from "./DeclarationsTab";
import { ProfileTab } from "./ProfileTab";

const { INVESTOR_PROFILE } = Language.PAGE;

interface InvestorProfileProps {
  data: IInvestorAccount | undefined;
  handleBack: () => void;
  handleEdit?: () => void;
  spaceToTop?: number;
}

export const InvestorProfile: FunctionComponent<InvestorProfileProps> = ({
  data,
  handleBack,
  handleEdit,
  spaceToTop,
}: InvestorProfileProps) => {
  const [file, setFile] = useState<FileBase64 | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<InvestorProfileTabType>("profile");

  const tabs: InvestorProfileTabType[] = ["profile", "declarations", "document"];

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

  if (activeTab === "declarations" && data !== undefined) {
    content = <DeclarationsTab data={data} {...tabProps} />;
  }

  if (activeTab === "document" && data !== undefined) {
    content = <DocumentsTab documentSummary={data.documentSummary!} {...tabProps} />;
  }

  if (activeTab === "profile" && data !== undefined) {
    content = <ProfileTab data={data} {...tabProps} />;
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

  const profileTabs: { text: string }[] = [{ text: INVESTOR_PROFILE.TAB_TITLE_PROFILE }];

  if (data !== undefined && data !== null && data.declaration !== null) {
    profileTabs.push({ text: INVESTOR_PROFILE.TAB_TITLE_DECLARATIONS });
  }

  if (data !== undefined && data !== null && data.documentSummary !== null) {
    profileTabs.push({ text: INVESTOR_PROFILE.TAB_TITLE_DOCUMENT });
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
        <CustomSpacer space={spaceToTop || sh24} />
        <View style={flexRow}>
          <View>
            <IcoMoon name="arrow-left" onPress={handleBack} size={sw24} suppressHighlighting={true} />
          </View>
          <CustomSpacer isHorizontal={true} space={sw8} />
          <Text style={fs18BoldGray6}>{INVESTOR_PROFILE.HEADER_TITLE}</Text>
          {handleEdit !== undefined ? (
            <Fragment>
              <CustomFlexSpacer />
              <RoundedButton
                buttonStyle={buttonStyle}
                disabled={true}
                icon="pencil"
                iconColor={colorBlue._1}
                iconSize={sw11}
                onPress={handleEdit}
                secondary={true}
                text="Edit Profile"
                textStyle={{ ...fs10BoldGray6, ...fsTransformNone }}
              />
            </Fragment>
          ) : null}
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
                tabs={profileTabs}
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
