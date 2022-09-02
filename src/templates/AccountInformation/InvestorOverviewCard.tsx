import React, { Fragment, FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, IconText, LabeledTitle } from "../../components";
import { Language } from "../../constants";
import {
  alignSelfStart,
  borderBottomBlue4,
  colorBlue,
  flexChild,
  fs12BoldGray6,
  fs16BoldBlack2,
  rowCenterVertical,
  sh12,
  sh16,
  sh24,
  sh4,
  sh8,
  sw16,
  sw24,
  sw336,
  sw4,
  sw64,
} from "../../styles";

const { ACCOUNT_INFORMATION } = Language.PAGE;

declare interface InvestorOverviewCardProps {
  accountHolder: TypeAccountHolder;
  accountType: TypeAccountChoices;
  handleViewProfile: () => void;
  info: IAccountInvestorOverview;
  setFile: (value?: FileBase64) => void;
}

export const InvestorOverviewCard: FunctionComponent<InvestorOverviewCardProps> = ({
  accountHolder,
  accountType,
  handleViewProfile,
  info,
}: // setFile,
InvestorOverviewCardProps) => {
  const sectionTitle = accountHolder === "Principal" ? ACCOUNT_INFORMATION.SECTION_PRINCIPAL : ACCOUNT_INFORMATION.SECTION_JOINT;

  const labeledTitleProps: Partial<LabeledTitleProps> = {
    labelStyle: { ...fs12BoldGray6, lineHeight: sh24 },
    style: { width: sw336 },
  };

  // TODO view ID, there's an issue with the response type
  // const handleViewId = () => {
  //   if (info.id !== undefined && info.id !== null) {
  //     setFile(info.id);
  //   }
  // };

  // const idNumberIcon = info.id !== undefined && info.id !== null ? "profile-card" : undefined;

  return (
    <View>
      {accountType === "Individual" ? null : (
        <Fragment>
          <CustomSpacer space={sh8} />
          <View style={rowCenterVertical}>
            <IconText name="account" iconSize={sw24} text={sectionTitle} textStyle={fs16BoldBlack2} />
            <CustomSpacer isHorizontal={true} space={sw16} />
            <View style={{ ...borderBottomBlue4, ...flexChild }} />
            <CustomSpacer isHorizontal={true} space={sw24} />
          </View>
          <CustomSpacer space={sh12} />
        </Fragment>
      )}
      <View style={rowCenterVertical}>
        <View>
          <LabeledTitle {...labeledTitleProps} label={ACCOUNT_INFORMATION.LABEL_INVESTOR_NAME} title={info.name} />
          <CustomSpacer space={sh4} />
          <IconText
            style={alignSelfStart}
            color={colorBlue._8}
            iconPosition="right"
            name="arrow-right"
            onPress={handleViewProfile}
            text={ACCOUNT_INFORMATION.LINK_VIEW_PROFILE}
            spaceBetween={sw4}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw64} />
        <LabeledTitle
          {...labeledTitleProps}
          label={`${ACCOUNT_INFORMATION.LABEL_INVESTOR} ${info.idType || "-"}`}
          // titleIcon={idNumberIcon}
          iconSize={sw16}
          // onPress={handleViewId}
          title={info.idNumber || "-"}
        />
      </View>
      {accountHolder === "Principal" ? (
        <Fragment>
          <CustomSpacer space={sh16} />
          <View style={rowCenterVertical}>
            <LabeledTitle {...labeledTitleProps} label={ACCOUNT_INFORMATION.LABEL_RISK} title={info.riskProfile || "-"} />
          </View>
        </Fragment>
      ) : null}
      <CustomSpacer space={sh16} />
    </View>
  );
};
