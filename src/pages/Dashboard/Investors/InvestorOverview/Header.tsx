import React, { Fragment, FunctionComponent } from "react";
import { Text, View, ViewStyle } from "react-native";

import { Avatar, CustomFlexSpacer, CustomSpacer, IconButton, OutlineButton } from "../../../../components";
import { Language } from "../../../../constants";
import { getInitials } from "../../../../helpers";
import { IcoMoon } from "../../../../icons";
import {
  border,
  centerHorizontal,
  centerHV,
  centerVertical,
  circle,
  colorBlack,
  colorBlue,
  colorGreen,
  colorWhite,
  disabledOpacity4,
  flexRow,
  fs16BoldBlack2,
  fs24BoldWhite1,
  fs32BoldBlue1,
  fullWidth,
  px,
  py,
  rowCenterVertical,
  sh12,
  sh24,
  sh8,
  shadow12Black112,
  sw1,
  sw10,
  sw14,
  sw16,
  sw24,
  sw4,
  sw40,
  sw512,
  sw8,
  sw80,
} from "../../../../styles";
import { isNotEmpty } from "../../../../utils";

const { DASHBOARD_HOME } = Language.PAGE;
export interface IInvestorAccountHeaderProps {
  accountDetails?: IInvestorAccountsData[];
  disableAccountOpening: boolean;
  email?: string;
  emailVerified?: boolean;
  handleAccountOpening: () => void;
  handleViewProfile: () => void;
  mobileNo?: string;
  name?: string;
  setScreen: (route: InvestorsPageType) => void;
}

export const InvestorAccountsHeader: FunctionComponent<IInvestorAccountHeaderProps> = ({
  accountDetails,
  disableAccountOpening,
  email,
  emailVerified,
  handleAccountOpening,
  mobileNo,
  name,
  handleViewProfile,
}: IInvestorAccountHeaderProps) => {
  const pageContainer: ViewStyle = {
    ...fullWidth,
    zIndex: 1,
  };

  const container: ViewStyle = {
    ...shadow12Black112,
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
  };

  const initials = getInitials(name);
  const iconContainer: ViewStyle = {
    ...border(colorBlue._1, sw1, sw24),
    ...px(sw8),
    ...py(sh8),
  };

  return (
    <View style={pageContainer}>
      <View style={container}>
        <View style={{ ...px(sw24), ...py(sh24) }}>
          <View style={{ ...centerVertical, ...flexRow }}>
            <Avatar size={sw80} text={initials} textStyle={fs24BoldWhite1} type="client" />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={centerHorizontal}>
              <Text style={{ ...fs32BoldBlue1, maxWidth: sw512 }}>{name}</Text>
              <CustomSpacer space={sh12} />
              <View style={rowCenterVertical}>
                <Fragment>
                  <IcoMoon color={colorBlack._2} name="phone" size={sw16} />
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text style={fs16BoldBlack2}>{mobileNo}</Text>
                </Fragment>
                <CustomSpacer isHorizontal={true} space={sw40} />
                <Fragment>
                  <IcoMoon color={colorBlack._2} name="mail" size={sw16} />
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  <Text style={fs16BoldBlack2}>{email}</Text>
                  <CustomSpacer isHorizontal={true} space={sw4} />
                  {emailVerified === true ? (
                    <IconButton color={colorWhite._1} name="success" size={sw10} style={{ ...centerHV, ...circle(sw14, colorGreen._1) }} />
                  ) : null}
                </Fragment>
              </View>
            </View>
            <CustomFlexSpacer />
            {isNotEmpty(accountDetails) && accountDetails?.length === 0 ? (
              <View style={{ ...flexRow, ...disabledOpacity4 }} pointerEvents="none">
                <OutlineButton buttonType="solid" disabledOpacity={0.4} onPress={handleViewProfile} text={DASHBOARD_HOME.LABEL_VIEW} />
              </View>
            ) : (
              <OutlineButton buttonType="solid" disabledOpacity={0.4} onPress={handleViewProfile} text={DASHBOARD_HOME.LABEL_VIEW} />
            )}
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={{ ...flexRow, ...disabledOpacity4 }} pointerEvents="none">
              <IconButton color={colorBlue._1} name="pencil" onPress={() => {}} size={sw16} style={iconContainer} />
            </View>
            <CustomSpacer isHorizontal={true} space={sw16} />
            {disableAccountOpening === true || (isNotEmpty(accountDetails) && accountDetails?.length === 0) ? (
              <View style={{ ...flexRow, ...disabledOpacity4 }} pointerEvents="none">
                <IconButton color={colorBlue._1} name="plus" onPress={handleAccountOpening} size={sw16} style={iconContainer} />
              </View>
            ) : (
              <IconButton color={colorBlue._1} name="plus" onPress={handleAccountOpening} size={sw16} style={iconContainer} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
