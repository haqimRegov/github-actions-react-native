import React, { Fragment, FunctionComponent } from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";

import { CustomFlexSpacer, CustomSpacer } from "../../components";
import { Language } from "../../constants";
import { IcoMoon } from "../../icons";
import {
  centerHV,
  circle,
  colorBlue,
  colorGray,
  colorGreen,
  colorRed,
  colorWhite,
  colorYellow,
  flexRow,
  fs10RegGray5,
  fs12BoldGray6,
  fs12RegGray5,
  fs18BoldBlue1,
  px,
  py,
  rowCenterVertical,
  sh16,
  sh2,
  sh24,
  sh4,
  sh8,
  sw05,
  sw1,
  sw16,
  sw24,
  sw4,
  sw404,
  sw8,
} from "../../styles";

const { INVESTOR_ACCOUNTS } = Language.PAGE;

interface IAccountCardProps {
  data: IAccountList;
  style?: ViewStyle;
  handlePress: () => void;
}

interface ITagStyle {
  container?: ViewStyle;
  text?: TextStyle;
}

export const AccountCard: FunctionComponent<IAccountCardProps> = ({ data, handlePress, style }: IAccountCardProps) => {
  const { accountNo, fundType, name, isJoint, jointName, paymentMethod } = data;

  const handleTagStyle = (text: string): ITagStyle => {
    switch (text) {
      case "Low Risk":
        return { container: { backgroundColor: colorGreen._2, borderColor: colorGreen._1 }, text: { color: colorGreen._1 } };
      case "Medium Risk":
        return { container: { backgroundColor: colorYellow._3, borderColor: colorYellow._2 }, text: { color: colorYellow._2 } };
      case "High Risk":
        return { container: { backgroundColor: colorRed._4, borderColor: colorRed._2 }, text: { color: colorRed._2 } };
      default:
        return { container: {}, text: {} };
    }
  };
  const containerStyle: ViewStyle = {
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorWhite._1,
    borderRadius: sw8,
    borderWidth: sw1,
    borderColor: colorGray._2,
    marginBottom: sh24,
    width: sw404,
    ...style,
  };
  const tags = [fundType, paymentMethod];
  const checkIconName = isJoint === true ? "avatar-joint" : "avatar";
  const checkAccountType = isJoint === true ? INVESTOR_ACCOUNTS.LABEL_JOINT_ACCOUNT : INVESTOR_ACCOUNTS.LABEL_INDIVIDUAL_ACCOUNT;
  return (
    <Pressable onPress={handlePress}>
      <View style={containerStyle}>
        <View style={flexRow}>
          <View>
            <View style={rowCenterVertical}>
              <View style={{ ...circle(sw24, colorGray._1), ...centerHV }}>
                <IcoMoon name={checkIconName} size={sw16} />
              </View>
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={fs12RegGray5}>{checkAccountType}</Text>
              <CustomSpacer isHorizontal={true} space={sw8} />
              <View style={{ height: sh16, width: sw1, backgroundColor: colorBlue._4 }} />
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={fs12BoldGray6}>{accountNo}</Text>
            </View>
            <CustomSpacer space={sh4} />
            <Text style={fs18BoldBlue1}>{name}</Text>
            {isJoint === true ? <Text style={fs18BoldBlue1}>{jointName}</Text> : null}
            <CustomSpacer space={sh8} />
            <View style={flexRow}>
              {tags !== undefined
                ? tags.map((eachTag: string, tagIndex: number) => {
                    const checkTagStyle: ITagStyle =
                      eachTag.includes("High") || eachTag.includes("Low") || eachTag.includes("Medium")
                        ? handleTagStyle(eachTag)
                        : { container: {}, text: {} };
                    const tagStyle: ViewStyle = {
                      ...px(sw4),
                      ...py(sh2),
                      backgroundColor: colorGray._1,
                      borderColor: colorGray._5,
                      borderWidth: sw05,
                      borderRadius: sw4,
                      ...checkTagStyle.container,
                    };
                    return (
                      <Fragment key={tagIndex}>
                        {tagIndex !== 0 ? <CustomSpacer isHorizontal={true} space={sw8} /> : null}
                        <View key={tagIndex} style={tagStyle}>
                          <Text style={{ ...fs10RegGray5, ...checkTagStyle.text }}>{eachTag}</Text>
                        </View>
                      </Fragment>
                    );
                  })
                : null}
            </View>
          </View>
          <CustomFlexSpacer />
          <View style={centerHV}>
            <IcoMoon name={"caret-right"} size={sw24} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
