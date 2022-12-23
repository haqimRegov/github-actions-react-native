import React, { FunctionComponent, useRef, useState } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";
import { Bar } from "react-native-progress";
import WebView from "react-native-webview";

import { CustomSpacer } from ".";
import { IconButton } from "..";
import { Language } from "../../constants";
import {
  centerHV,
  colorRed,
  flexChild,
  flexRow,
  fs16RegWhite1,
  fullWidth,
  px,
  py,
  sh16,
  sh56,
  sw104,
  sw1080,
  sw24,
  sw512,
} from "../../styles";
import { SafeAreaPage } from "../CommonPages";

const { BROWSER_WEB_VIEW } = Language.PAGE;

interface IBrowserWebViewProps {
  baseUrl: string;
  handleClose: () => void;
}

export const BrowserWebView: FunctionComponent<IBrowserWebViewProps> = ({ handleClose, baseUrl }: IBrowserWebViewProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const webViewRef = useRef<WebView>(null);

  const handleBack = () => {
    if (webViewRef !== null) {
      webViewRef.current?.goBack();
    }
  };

  const handleForward = () => {
    if (webViewRef !== null) {
      webViewRef.current!.goForward();
    }
  };

  const handleAction = () => {
    if (webViewRef !== null && loading === false) {
      webViewRef.current?.reload();
    } else if (webViewRef !== null && loading === true) {
      webViewRef.current?.stopLoading();
    }
  };

  const headerStyle: ViewStyle = {
    ...flexRow,
    ...px(sw24),
    ...py(sh16),
    backgroundColor: colorRed._1,
    height: sh56,
  };
  const checkIcon = loading === true ? "error" : "refresh";
  return (
    <SafeAreaPage topBackgroundColor={colorRed._1}>
      <View style={{ ...headerStyle, ...centerHV }}>
        <View style={{ ...flexRow, ...centerHV }}>
          <Pressable onPress={handleClose}>
            <Text style={fs16RegWhite1}>{BROWSER_WEB_VIEW.LABEL_DONE}</Text>
          </Pressable>
          <CustomSpacer isHorizontal={true} space={sw24} />
          <IconButton onPress={handleBack} name="caret-left" />
          <CustomSpacer isHorizontal={true} space={sw24} />
          <IconButton onPress={handleForward} name="caret-right" />
          <View style={{ ...flexChild, ...centerHV }}>
            <Text style={{ ...fs16RegWhite1, ...flexChild, maxWidth: sw512 }} numberOfLines={1}>
              {url}
            </Text>
          </View>
          <CustomSpacer isHorizontal={true} space={sw104} />
          <IconButton onPress={handleAction} name={checkIcon} />
        </View>
      </View>
      {loading === true ? (
        <View style={fullWidth}>
          <Bar animated={true} animationType={"spring"} color={colorRed._1} progress={progress} width={sw1080} />
        </View>
      ) : null}
      <WebView
        ref={webViewRef}
        source={{ uri: baseUrl }}
        onLoad={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLoading(true);
          setUrl(nativeEvent.url);
        }}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress);
        }}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
          setProgress(0);
        }}
        startInLoadingState={true}
      />
    </SafeAreaPage>
  );
};
