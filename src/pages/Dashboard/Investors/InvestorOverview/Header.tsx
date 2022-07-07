import moment from "moment";
import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { Avatar, CustomFlexSpacer, CustomSpacer, IconButton, OutlineButton } from "../../../../components";
import { DEFAULT_DATE_FORMAT, Language } from "../../../../constants";
import { IcoMoon } from "../../../../icons";
import {
  absolutePosition,
  border,
  centerHorizontal,
  centerVertical,
  colorBlue,
  colorTransparent,
  colorWhite,
  disabledOpacity4,
  flexRow,
  fs10RegGray4,
  fs16BoldBlue1,
  fs24BoldWhite1,
  fs32BoldBlue1,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh24,
  sh8,
  shadow12Black112,
  sw1,
  sw16,
  sw24,
  sw4,
  sw40,
  sw8,
  sw80,
} from "../../../../styles";
import { isNotEmpty } from "../../../../utils";

const { DASHBOARD_HOME } = Language.PAGE;
interface IInvestorAccountHeaderProps {
  email?: string;
  emailLastUpdated?: string;
  handleNewSales: () => void;
  handleViewProfile: () => void;
  mobileNo?: string;
  mobileNoLastUpdated?: string;
  name?: string;
  setScreen: (route: InvestorsPageType) => void;
}

export const InvestorAccountsHeader: FunctionComponent<IInvestorAccountHeaderProps> = ({
  email,
  emailLastUpdated,
  handleNewSales,
  mobileNo,
  mobileNoLastUpdated,
  name,
  handleViewProfile,
}: IInvestorAccountHeaderProps) => {
  const pageContainer: ViewStyle = {
    ...fullWidth,
    ...absolutePosition,
    backgroundColor: colorTransparent,
    left: 0,
    top: 0,
    zIndex: 1,
  };

  const container: ViewStyle = {
    ...shadow12Black112,
    backgroundColor: colorWhite._1,
    marginHorizontal: sw24,
    marginBottom: sh24,
    borderRadius: sw24,
  };

  const initials =
    name !== undefined && name !== "" && isNotEmpty(name)
      ? name
          .split(" ")
          .filter((text) => text !== "")
          .map((text, index) => (index < 2 ? text.substr(0, 1) : ""))
          .join("")
      : "";
  const iconContainer: ViewStyle = {
    ...border(colorBlue._1, sw1, sw24),
    ...px(sw8),
    ...py(sh8),
  };
  const prefixIconContainer: ViewStyle = {
    ...centerHorizontal,
    height: sh24,
  };

  const emailDate =
    emailLastUpdated !== undefined
      ? `${DASHBOARD_HOME.LABEL_LAST_UPDATED} ${moment(emailLastUpdated, "x").format(DEFAULT_DATE_FORMAT)}`
      : "";

  const mobileDate =
    mobileNoLastUpdated !== undefined
      ? `${DASHBOARD_HOME.LABEL_LAST_UPDATED} ${moment(mobileNoLastUpdated, "x").format(DEFAULT_DATE_FORMAT)}`
      : "";

  return (
    <View style={pageContainer}>
      <CustomSpacer space={sh24} />
      <View style={container}>
        <View style={{ ...px(sw24), ...py(sh24) }}>
          <View style={{ ...centerVertical, ...flexRow }}>
            <Avatar size={sw80} text={initials} textStyle={fs24BoldWhite1} type="client" />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={centerHorizontal}>
              <Text style={fs32BoldBlue1}>{name}</Text>
              <CustomSpacer space={sh8} />
              <View style={rowCenterVertical}>
                <View style={flexRow}>
                  <View style={prefixIconContainer}>
                    <IcoMoon color={colorBlue._1} name="phone" size={sw16} />
                  </View>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <View>
                    <Text style={fs16BoldBlue1}>{mobileNo}</Text>
                    <Text style={fs10RegGray4}>{mobileDate}</Text>
                  </View>
                </View>
                <CustomSpacer isHorizontal={true} space={sw40} />
                <View style={flexRow}>
                  <View style={prefixIconContainer}>
                    <IcoMoon color={colorBlue._1} name="mail" size={sw16} />
                  </View>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <View>
                    <Text style={fs16BoldBlue1}>{email}</Text>
                    <Text style={fs10RegGray4}>{emailDate}</Text>
                  </View>
                </View>
              </View>
            </View>
            <CustomFlexSpacer />
            <OutlineButton buttonType="solid" disabledOpacity={0.4} onPress={handleViewProfile} text={DASHBOARD_HOME.LABEL_VIEW} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={{ ...flexRow, ...disabledOpacity4 }} pointerEvents="none">
              <IconButton color={colorBlue._1} name="pencil" onPress={() => {}} size={sw16} style={iconContainer} />
            </View>
            <CustomSpacer isHorizontal={true} space={sw16} />
            <IconButton color={colorBlue._1} name="plus" onPress={handleNewSales} size={sw16} style={iconContainer} />
          </View>
        </View>
      </View>
    </View>
  );
};
