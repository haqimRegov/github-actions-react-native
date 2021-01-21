import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, LabeledTitle, TextSpaceArea } from "../../../../components";
import { DEFAULT_DATE_FORMAT, FULL_DATE_FORMAT, Language } from "../../../../constants";
import { flexRow, fs16BoldBlack1, fs24BoldBlack2, sh24, sw208, sw32 } from "../../../../styles";

const { ADD_CLIENT } = Language.PAGE;

interface NewSalesSummaryProps {
  accountType: TypeAccountChoices;
  jointHolder?: IClientBasicInfo;
  principalHolder: IClientBasicInfo;
}

export const NewSalesSummary: FunctionComponent<NewSalesSummaryProps> = ({
  accountType,
  principalHolder,
  jointHolder,
}: NewSalesSummaryProps) => {
  const subheading = accountType === "Individual" ? ADD_CLIENT.LABEL_VERIFY_INDIVIDUAL : ADD_CLIENT.LABEL_VERIFY_JOINT;
  const principalLabelName = accountType === "Individual" ? ADD_CLIENT.DETAILS_LABEL_NAME : ADD_CLIENT.DETAILS_LABEL_NAME_PRINCIPAL;

  return (
    <View>
      <TextSpaceArea spaceToBottom={sh24} style={fs24BoldBlack2} text={subheading} />
      <View style={flexRow}>
        <View style={{ width: sw208 }}>
          <LabeledTitle label={principalLabelName} spaceToBottom={sh24} title={principalHolder.name!} titleStyle={fs16BoldBlack1} />
          <LabeledTitle label={principalHolder.idType!} spaceToBottom={sh24} title={principalHolder.id!} titleStyle={fs16BoldBlack1} />
          <LabeledTitle
            label={ADD_CLIENT.DETAILS_LABEL_DOB}
            spaceToBottom={sh24}
            title={moment(principalHolder.dateOfBirth!, DEFAULT_DATE_FORMAT).format(FULL_DATE_FORMAT)}
            titleStyle={fs16BoldBlack1}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw32} />
        {jointHolder !== undefined && accountType === "Joint" ? (
          <View style={{ width: sw208 }}>
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_NAME_JOINT}
              spaceToBottom={sh24}
              title={jointHolder.name!}
              titleStyle={fs16BoldBlack1}
            />
            <LabeledTitle label={jointHolder.idType!} spaceToBottom={sh24} title={jointHolder.id!} titleStyle={fs16BoldBlack1} />
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_DOB}
              spaceToBottom={sh24}
              title={moment(jointHolder.dateOfBirth!, DEFAULT_DATE_FORMAT).format(FULL_DATE_FORMAT)}
              titleStyle={fs16BoldBlack1}
            />
          </View>
        ) : null}
      </View>
      <LabeledTitle label={ADD_CLIENT.LABEL_ACCOUNT_TYPE} title={accountType} titleStyle={fs16BoldBlack1} />
    </View>
  );
};
