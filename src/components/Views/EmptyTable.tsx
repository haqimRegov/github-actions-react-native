import React, { Fragment, FunctionComponent } from "react";
import { ActivityIndicator, Image, ImageSourcePropType, Text, TextStyle, View } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { Language } from "../../constants";
import {
  centerHV,
  centerVertical,
  colorGray,
  flexChild,
  fs12RegBlue2,
  fs16BoldBlue2,
  imageContain,
  sh16,
  sh32,
  sh56,
  sw176,
} from "../../styles";
import { CustomSpacer } from "./Spacer";

const { EMPTY_STATE } = Language.PAGE;
interface EmptyTableProps {
  hintText?: string;
  hintTextStyle?: TextStyle;
  illustration?: ImageSourcePropType;
  loading?: boolean;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  title?: string;
  titleStyle?: TextStyle;
}

export const EmptyTable: FunctionComponent<EmptyTableProps> = ({
  hintText,
  hintTextStyle,
  illustration,
  loading,
  subtitle,
  subtitleStyle,
  title,
  titleStyle,
}: EmptyTableProps) => {
  const defaultIllustration = illustration !== undefined ? illustration : LocalAssets.illustration.noResults;
  const defaultTitle = title !== undefined ? title : EMPTY_STATE.LABEL_NO_RESULTS;

  return (
    <View style={{ ...centerVertical, ...flexChild }}>
      {loading === true ? (
        <View style={{ ...centerHV, ...flexChild }}>
          <ActivityIndicator color={colorGray._7} size="small" />
        </View>
      ) : (
        <Fragment>
          <CustomSpacer space={sh56} />
          <Image source={defaultIllustration} style={{ ...imageContain, height: sw176, width: sw176 }} />
          <CustomSpacer space={sh16} />
          <Text style={{ ...fs16BoldBlue2, ...titleStyle }}>{defaultTitle}</Text>
          {subtitle !== undefined ? <Text style={{ ...fs12RegBlue2, ...subtitleStyle }}>{subtitle}</Text> : null}
          {hintText !== undefined ? (
            <Fragment>
              <CustomSpacer space={sh32} />
              <Text style={{ ...fs12RegBlue2, ...hintTextStyle }}>{hintText}</Text>
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </View>
  );
};
