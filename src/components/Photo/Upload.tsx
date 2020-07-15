import React, { Fragment } from "react";
import { Image, ImageStyle, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import {
  centerHV,
  centerVertical,
  circle,
  colorBlue,
  colorGray,
  colorWhite,
  flexChild,
  flexRow,
  fs12BoldBlue3,
  fs14BoldBlack2,
  fs16BoldBlack2,
  fs16RegBlack2,
  px,
  py,
  sh10,
  sh20,
  sh273,
  sh30,
  sh32,
  sh376,
  sh70,
  sh8,
  sw10,
  sw16,
  sw20,
  sw32,
  sw36,
  sw433,
  sw498,
  sw96,
} from "../../styles";
import { CustomSpacer } from "../Views";

interface IUploadPhotoProps {
  data?: FileBase64;
  guidelines?: string;
  label: string;
  onPress: () => void;
  subtitle: string;
  title: string;
}

export const UploadPhoto = ({ data, guidelines, label, onPress, subtitle, title }: IUploadPhotoProps) => {
  const documentImageStyle: ImageStyle = {
    resizeMode: "contain",
    width: sw96,
  };

  // TODO to be changed to icomoon
  const iconStyle: ImageStyle = {
    height: sh20,
    resizeMode: "contain",
    width: sw16,
  };

  const container: ViewStyle = {
    ...px(sw32),
    ...py(sh32),
    backgroundColor: colorWhite._1,
    borderRadius: sh10,
    height: sh376,
  };
  const guidelinesStyle: ViewStyle = {
    ...centerVertical,
    ...flexRow,
    ...px(sw36),
    backgroundColor: colorWhite._1,
    borderRadius: sh10,
    height: sh70,
  };

  const uploadContainer: ViewStyle = {
    ...centerHV,
    backgroundColor: colorGray._3,
    borderColor: colorGray._3,
    borderRadius: sh10,
    borderStyle: "dashed",
    borderWidth: 1,
    height: sh273,
  };

  const imageStyle: any = {
    borderRadius: sh10,
    height: sh273 - 2,
    width: sw433 - 1,
  };

  return (
    <View style={{ width: sw498 }}>
      <View style={container}>
        <View style={{ ...flexChild, ...flexRow }}>
          <CustomSpacer isHorizontal={true} space={sw10} />
          <Image source={LocalAssets.addClient.paper} style={iconStyle} />
          <CustomSpacer isHorizontal={true} space={sh20} />
          <Text style={fs14BoldBlack2}>{label}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={uploadContainer}>
            {data !== undefined ? (
              <View>
                <Image source={{ uri: data.path }} style={imageStyle} />
                {/* base64 not working in simulator */}
                {/* <Image source={{ uri: `data:${data.type};base64,${data.base64}` }} style={imageStyle} /> */}
              </View>
            ) : (
              <Fragment>
                <Image source={LocalAssets.addClient.documents} style={documentImageStyle} />
                <CustomSpacer space={sh32} />
                <Text style={fs16RegBlack2}>{title}</Text>
                <CustomSpacer space={sh8} />
                <Text style={fs12BoldBlue3}>{subtitle}</Text>
              </Fragment>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <CustomSpacer space={sh30} />
      {/** TODO to be enhanced */}
      {guidelines === undefined ? null : (
        <View style={guidelinesStyle}>
          <View style={{ ...centerHV, ...circle(sw20, colorBlue._2) }}>
            <Text style={fs16BoldBlack2}>i</Text>
          </View>
          <CustomSpacer isHorizontal={true} space={sw10} />
          <Text style={fs12BoldBlue3}>{guidelines}</Text>
        </View>
      )}
    </View>
  );
};
