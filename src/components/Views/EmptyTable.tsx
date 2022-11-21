import React, { Fragment, FunctionComponent, ReactNode } from "react";
import { Image, ImageSourcePropType, Text, TextStyle, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { Language } from "../../constants";
import { centerVertical, flexChild, fs12RegBlue6, fs16BoldBlue1, imageContain, sh16, sh20, sh56, sw136 } from "../../styles";
import { Loading } from "./Loading";
import { CustomSpacer } from "./Spacer";

const { EMPTY_STATE } = Language.PAGE;
interface EmptyTableProps {
  children?: ReactNode;
  hintContainerStyle?: ViewStyle;
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
  children,
  hintContainerStyle,
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
        <Loading />
      ) : (
        <Fragment>
          <CustomSpacer space={sh56} />
          <Image source={defaultIllustration} style={{ ...imageContain, height: sw136, width: sw136 }} />
          <CustomSpacer space={sh16} />
          <Text style={{ ...fs16BoldBlue1, ...titleStyle }}>{defaultTitle}</Text>
          {subtitle !== undefined ? <Text style={{ ...fs12RegBlue6, ...subtitleStyle }}>{subtitle}</Text> : null}
          {hintText !== undefined ? (
            <Fragment>
              <CustomSpacer space={sh20} />
              <View style={{ ...centerVertical, ...hintContainerStyle }}>
                <Text style={{ ...fs12RegBlue6, ...hintTextStyle }}>{hintText}</Text>
              </View>
            </Fragment>
          ) : null}
          {children}
        </Fragment>
      )}
    </View>
  );
};
