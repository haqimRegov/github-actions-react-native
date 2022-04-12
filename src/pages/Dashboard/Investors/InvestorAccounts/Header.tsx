import React, { FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { Avatar, CustomFlexSpacer, CustomSpacer, IconButton, OutlineButton } from "../../../../components";
import { Language } from "../../../../constants";
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
  fs32BoldBlue1,
  fs32BoldWhite1,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh24,
  sh8,
  shadow12Black112,
  sw1,
  sw16,
  sw20,
  sw24,
  sw4,
  sw40,
  sw8,
  sw80,
} from "../../../../styles";
import { isNotEmpty } from "../../../../utils";

const { DASHBOARD_HOME } = Language.PAGE;
interface IInvestorAccountHeaderProps {
  email: string;
  emailLastUpdated: string;
  mobileNo: string;
  mobileNoLastUpdated: string;
  name: string;
}

export const InvestorAccountsHeader: FunctionComponent<IInvestorAccountHeaderProps> = ({
  email,
  emailLastUpdated,
  mobileNo,
  mobileNoLastUpdated,
  name,
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
    name !== "" && isNotEmpty(name)
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

  return (
    <View style={pageContainer}>
      <CustomSpacer space={sh24} />
      <View style={container}>
        <View style={{ ...px(sw24), ...py(sh24) }}>
          <View style={{ ...centerVertical, ...flexRow }}>
            <Avatar size={sw80} text={initials} textStyle={fs32BoldWhite1} type="client" />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={centerHorizontal}>
              <Text style={fs32BoldBlue1}>{name}</Text>
              <CustomSpacer space={sh8} />
              <View style={rowCenterVertical}>
                <View style={flexRow}>
                  <View style={prefixIconContainer}>
                    <IcoMoon name="phone" size={sw16} />
                  </View>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <View>
                    <Text style={fs16BoldBlue1}>{mobileNo}</Text>
                    <Text style={fs10RegGray4}>{mobileNoLastUpdated}</Text>
                  </View>
                </View>
                <CustomSpacer isHorizontal={true} space={sw40} />
                <View style={flexRow}>
                  <View style={prefixIconContainer}>
                    <IcoMoon name="mail" size={sw16} />
                  </View>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <View>
                    <Text style={fs16BoldBlue1}>{email}</Text>
                    <Text style={fs10RegGray4}>{emailLastUpdated}</Text>
                  </View>
                </View>
              </View>
            </View>
            <CustomFlexSpacer />
            <OutlineButton buttonType="solid" disabled={true} onPress={() => {}} text={DASHBOARD_HOME.LABEL_VIEW} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={{ ...flexRow, ...disabledOpacity4 }} pointerEvents="none">
              <IconButton color={colorBlue._1} name="pencil" onPress={() => {}} size={sw16} style={iconContainer} />
              <CustomSpacer isHorizontal={true} space={sw16} />
              <IconButton color={colorBlue._1} name="plus" onPress={() => {}} size={sw20} style={iconContainer} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
