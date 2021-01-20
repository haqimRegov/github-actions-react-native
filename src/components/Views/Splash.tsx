import React, { FunctionComponent, useEffect, useRef } from "react";
import { Animated, Image, ImageStyle, View } from "react-native";

import { LocalAssets } from "../../assets/LocalAssets";
import { centerHV, colorWhite, fullHW, sh120, sw306 } from "../../styles";

export const Splash: FunctionComponent = () => {
  const fade = useRef(new Animated.Value(0)).current;
  const imageStyle: ImageStyle = { width: sw306, height: sh120, resizeMode: "contain" };

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
    <Animated.View style={{ opacity: fade }}>
      <View style={{ ...fullHW, ...centerHV, backgroundColor: colorWhite._1 }}>
        <Image source={LocalAssets.logo.kenanga} style={imageStyle} />
      </View>
    </Animated.View>
  );
};
