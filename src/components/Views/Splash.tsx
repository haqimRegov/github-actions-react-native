import React, { FunctionComponent, useEffect, useRef } from "react";
import { Animated, Image, ImageStyle, View } from "react-native";

import { LocalAssets } from "../../assets/images/LocalAssets";
import { centerHV, colorWhite, fullHW, imageContain, sh16, sh56, sw120, sw298, sw312 } from "../../styles";

export const Splash: FunctionComponent = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const imageStyle: ImageStyle = { ...imageContain, width: sw312, height: sw120 };
  const footerStyle: ImageStyle = { ...imageContain, width: sw298, height: sh16, position: "absolute", bottom: sh56 };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View>
      <View style={{ ...fullHW, ...centerHV, backgroundColor: colorWhite._1 }}>
        <Image source={LocalAssets.logo.kenangaBrand} style={imageStyle} />
        <Image source={LocalAssets.splash.footer} style={footerStyle} />
      </View>
    </Animated.View>
  );
};
