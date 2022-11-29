import React, { Fragment, ReactNode } from "react";
import { Image, ImageStyle, Pressable, StatusBar, Text, TextStyle, View, ViewStyle } from "react-native";
import ErrorBoundary from "react-native-error-boundary";

import { LocalAssets } from "../assets/images/LocalAssets";
import { IcoMoon } from "../icons";

const errorHandler = (error: Error) => {
  // eslint-disable-next-line no-console
  console.log("Error:", error);
};

export const ErrorFallback = ({ resetError }) => {
  const errorCode = "R005";
  const errorLabel = "Error Code: ";
  const link = "Back To Login";
  const title = "Something went wrong";
  const titleStyle: TextStyle = { color: "#002043", fontFamily: "NunitoSans-Bold", fontSize: 16, marginTop: 24 };
  const description = "Sorry, we encountered an unexpected error.\nPlease contact support for more details.";
  const descriptionStyle: TextStyle = { color: "#4D637B", fontFamily: "NunitoSans-Regular", fontSize: 12, textAlign: "center" };
  const containerStyle: ViewStyle = {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };
  const illustrationStyle: ImageStyle = { height: 400, width: 508 };
  const errorLabelStyle: TextStyle = {
    color: "#4D637B",
    fontFamily: "NunitoSans-Regular",
    fontSize: 12,
    marginTop: 16,
  };
  const errorCodeStyle: TextStyle = { color: "#4D637B", fontFamily: "NunitoSans-Bold", fontSize: 12 };
  const linkStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
    paddingVertical: 4,
    marginTop: 16,
  };
  const linkTextStyle: TextStyle = { color: "#0089EC", fontFamily: "NunitoSans-Bold", fontSize: 12, marginLeft: 4 };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <View style={containerStyle}>
        <Image source={LocalAssets.illustration.globalError} style={illustrationStyle} />
        <Text style={titleStyle}>{title}</Text>
        <Text style={descriptionStyle}>{description}</Text>
        <Text style={errorLabelStyle}>
          {errorLabel}
          <Text style={errorCodeStyle}>{errorCode}</Text>
        </Text>
        <Pressable onPress={resetError} style={linkStyle}>
          <IcoMoon color="#0089EC" name="arrow-left" size={12} />
          <Text style={linkTextStyle}>{link}</Text>
        </Pressable>
      </View>
    </Fragment>
  );
};

export const GlobalError = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
    {children}
  </ErrorBoundary>
);
