import React, { Fragment, FunctionComponent } from "react";
import { Text, View } from "react-native";

import { CustomSpacer, IconText } from "../../components";
import {
  borderBottomBlue4,
  colorBlue,
  flexChild,
  fs12RegGray5,
  fs16BoldBlack2,
  rowCenterVertical,
  sh8,
  sw16,
  sw24,
  sw8,
} from "../../styles";

interface JointDocumentHeaderProps {
  document: IOuterDocument;
}

export const JointDocumentHeader: FunctionComponent<JointDocumentHeaderProps> = ({ document }: JointDocumentHeaderProps) => {
  const checkAccountHolder = document.subHeader.toLowerCase().includes("principal") ? "Principal" : "Joint";

  return (
    <Fragment>
      <View style={rowCenterVertical}>
        <IconText
          color={colorBlue._1}
          iconSize={sw24}
          name={checkAccountHolder === "Principal" ? "account" : "account-joint"}
          text={document.subHeader}
          textStyle={fs16BoldBlack2}
        />
        <CustomSpacer isHorizontal={true} space={sw8} />
        <Text style={fs12RegGray5}>{document.mainHeader}</Text>
        <CustomSpacer isHorizontal={true} space={sw16} />
        <View style={{ ...borderBottomBlue4, ...flexChild }} />
      </View>
      <CustomSpacer space={sh8} />
    </Fragment>
  );
};
