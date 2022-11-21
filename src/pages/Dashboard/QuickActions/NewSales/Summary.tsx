import moment from "moment";
import React, { FunctionComponent } from "react";
import { View } from "react-native";

import { CustomSpacer, LabeledTitle, TextSpaceArea } from "../../../../components";
import { DEFAULT_DATE_FORMAT, FULL_DATE_FORMAT, Language } from "../../../../constants";
import { flexRow, fs12BoldGray5, fs16BoldBlack2, fs24BoldBlue1, sh16, sh24, sw208, sw32 } from "../../../../styles";

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

  const infoStyles = { labelStyle: fs12BoldGray5, spaceToBottom: sh16, titleStyle: fs16BoldBlack2 };

  return (
    <View>
      <TextSpaceArea spaceToBottom={sh24} style={fs24BoldBlue1} text={subheading} />
      <View style={flexRow}>
        <View style={{ width: sw208 }}>
          <LabeledTitle label={principalLabelName} title={principalHolder.name} {...infoStyles} />
          <LabeledTitle label={principalHolder.idType!} title={principalHolder.id} {...infoStyles} />
          <LabeledTitle
            label={ADD_CLIENT.DETAILS_LABEL_DOB}
            title={moment(principalHolder.dateOfBirth, DEFAULT_DATE_FORMAT).format(FULL_DATE_FORMAT)}
            {...infoStyles}
          />
        </View>
        <CustomSpacer isHorizontal={true} space={sw32} />
        {jointHolder !== undefined && accountType === "Joint" ? (
          <View style={{ width: sw208 }}>
            <LabeledTitle label={ADD_CLIENT.DETAILS_LABEL_NAME_JOINT} title={jointHolder.name} {...infoStyles} />
            <LabeledTitle label={jointHolder.idType!} title={jointHolder.id} {...infoStyles} />
            <LabeledTitle
              label={ADD_CLIENT.DETAILS_LABEL_DOB}
              title={moment(jointHolder.dateOfBirth, DEFAULT_DATE_FORMAT).format(FULL_DATE_FORMAT)}
              {...infoStyles}
            />
          </View>
        ) : null}
      </View>
      <LabeledTitle label={ADD_CLIENT.LABEL_ACCOUNT_TYPE} title={accountType} {...infoStyles} spaceToBottom={undefined} />
    </View>
  );
};
