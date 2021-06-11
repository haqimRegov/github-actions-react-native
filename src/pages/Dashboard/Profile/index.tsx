import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View, ViewStyle } from "react-native";
import { connect } from "react-redux";

import {
  Avatar,
  CustomFlexSpacer,
  CustomSpacer,
  LabeledTitle,
  LabeledTitleProps,
  RoundedButton,
  Tab,
  TextCard,
  TextSpaceArea,
} from "../../../components";
import { Language } from "../../../constants";
import { getAgentProfile } from "../../../network-actions";
import { GlobalMapDispatchToProps, GlobalMapStateToProps, GlobalStoreProps } from "../../../store";
import {
  borderBottomBlack21,
  centerHV,
  colorBlue,
  colorGray,
  colorWhite,
  customShadow,
  flexChild,
  flexGrow,
  flexRow,
  fs12BoldBlue2,
  fs16BoldBlack2,
  fs18BoldBlack2,
  fs40BoldWhite1,
  fsTransformNone,
  px,
  sh120,
  sh16,
  sh24,
  sh32,
  sh48,
  shadowBlue5,
  sw1,
  sw120,
  sw16,
  sw24,
  sw40,
  sw432,
  sw5,
  sw64,
} from "../../../styles";
import { ChangePassword } from "./ChangePassword";

const { PROFILE } = Language.PAGE;

interface ProfileProps extends GlobalStoreProps {
  navigation: IStackNavigationProp;
  handleRoute: (route: DashboardPageType) => void;
}

const ProfileComponent: FunctionComponent<ProfileProps> = ({ agent, navigation }: ProfileProps) => {
  const [agentProfile, setAgentProfile] = useState<IGetAgentProfileResult | undefined>(undefined);
  const [page, setPage] = useState<"profile" | "password">("profile");

  const handleFetch = async () => {
    const response: IGetAgentProfileResponse = await getAgentProfile({}, navigation);
    if (response !== undefined) {
      const { data, error } = response;
      if (error === null && data !== null) {
        // eslint-disable-next-line no-console
        console.log("data", data);
        setAgentProfile(data.result);
      }

      if (error !== null) {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      }
    }
  };

  const handleChangePassword = () => {
    setPage("password");
  };

  const cardStyle: ViewStyle = {
    ...flexChild,
    ...shadowBlue5,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    marginHorizontal: sw24,
    marginVertical: sh24,
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initials = agent!
    .name!.split(" ")
    .filter((text) => text !== "")
    .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
    .join("");

  const buttonStyle: ViewStyle = { ...px(sw16), borderWidth: sw1, height: sh24, width: "auto" };

  const accountSummary: LabeledTitleProps[] =
    agentProfile !== undefined
      ? [
          { label: PROFILE.LABEL_ADVISER_CODE, title: agentProfile.agentCode || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_STATUS, title: agentProfile.status || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_LICENSE_CODE, title: agentProfile.licenseCode || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_PROCESSING_BRANCH, title: agentProfile.branchName || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_ASSIGNED_BDM, title: agentProfile.bdmName || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_BDM_EMAIL, title: agentProfile.bdmEmail || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_DISTRIBUTION_CHANNEL, title: agentProfile.channel || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_OMNI_ENABLED, title: agentProfile.omniEnabled || "-" },
        ]
      : [];

  const contactDetailsSummary: LabeledTitleProps[] =
    agentProfile !== undefined
      ? [
          { label: PROFILE.LABEL_EMAIL, title: agentProfile.email || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_MOBILE_NUMBER, title: agentProfile.mobileNo || "-" },
        ]
      : [];

  const addressInfoSummary: LabeledTitleProps[] =
    agentProfile !== undefined
      ? [
          { label: PROFILE.LABEL_ADDRESS, title: agentProfile.address.address || "-", titleStyle: fsTransformNone },
          { label: PROFILE.LABEL_POSTCODE, title: agentProfile.address.postCode || "-" },
          { label: PROFILE.LABEL_CITY, title: agentProfile.address.city || "-" },
          { label: PROFILE.LABEL_STATE, title: agentProfile.address.state || "-" },
          { label: PROFILE.LABEL_COUNTRY, title: agentProfile.address.country || "-" },
        ]
      : [];

  return (
    <Fragment>
      {page === "profile" ? (
        <ScrollView contentContainerStyle={flexGrow} showsVerticalScrollIndicator={false}>
          <View style={cardStyle}>
            <CustomSpacer space={sh16} />
            <View style={flexRow}>
              <Tab selected={true} style={{ height: sh48 }} text={PROFILE.TAB_LABEL_PROFILE} />
            </View>
            <View style={borderBottomBlack21} />
            {agentProfile === undefined ? (
              <View style={{ ...centerHV, ...flexChild }}>
                <ActivityIndicator color={colorGray._7} size="small" />
              </View>
            ) : (
              <View>
                <CustomSpacer space={sh24} />
                <View style={{ ...flexRow, ...px(sw24) }}>
                  <View style={{ height: sh120, width: sw120, ...customShadow(colorBlue._5, 0, 0, 0.4, sw5) }}>
                    <Avatar size={sw120} text={initials} textStyle={fs40BoldWhite1} type="agent" />
                  </View>
                  <CustomSpacer isHorizontal={true} space={sw40} />
                  <View>
                    <LabeledTitle label={PROFILE.LABEL_NAME} title={agent!.name!} titleStyle={fs16BoldBlack2} style={{ maxWidth: sw432 }} />
                    <CustomSpacer space={sh16} />
                    <LabeledTitle label={PROFILE.LABEL_NRIC} title={agentProfile.nric} titleStyle={fs16BoldBlack2} />
                  </View>
                  <CustomFlexSpacer />
                  <RoundedButton
                    buttonStyle={buttonStyle}
                    onPress={handleChangePassword}
                    secondary={true}
                    text={PROFILE.LABEL_CHANGE_PASSWORD}
                    textStyle={{ ...fs12BoldBlue2, lineHeight: sh16 }}
                  />
                </View>
                <CustomSpacer space={sh32} />
                <View style={borderBottomBlack21} />
                <View style={px(sw24)}>
                  <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldBlack2} text={PROFILE.TITLE_ACCOUNT_SUMMARY} />
                  <TextCard data={accountSummary} spaceBetweenItem={sw64} />
                </View>
                <CustomSpacer space={sh16} />
                <View style={borderBottomBlack21} />
                <View style={px(sw24)}>
                  <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldBlack2} text={PROFILE.TITLE_CONTACT_DETAILS} />
                  <TextCard data={contactDetailsSummary} spaceBetweenItem={sw64} />
                </View>
                <CustomSpacer space={sh16} />
                <View style={borderBottomBlack21} />
                <View style={px(sw24)}>
                  <TextSpaceArea spaceToBottom={sh16} spaceToTop={sh32} style={fs18BoldBlack2} text={PROFILE.TITLE_ADDRESS_INFO} />
                  <TextCard data={addressInfoSummary} spaceBetweenItem={sw64} />
                </View>
                <CustomSpacer space={sh16} />
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <ChangePassword page={page} navigation={navigation} setPage={setPage} />
      )}
    </Fragment>
  );
};

export const Profile = connect(GlobalMapStateToProps, GlobalMapDispatchToProps)(ProfileComponent);
