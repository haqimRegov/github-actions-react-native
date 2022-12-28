import { Alert, Linking } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

import { colorRed, colorWhite } from "../../styles";

export const openLink = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.close();
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: "done",
        preferredBarTintColor: colorRed._1,
        preferredControlTintColor: colorWhite._1,
        // readerMode: false,
        animated: true,
        modalPresentationStyle: "fullScreen",
        modalTransitionStyle: "coverVertical",
        modalEnabled: true,
        // enableBarCollapsing: false,

        // Android Properties
        // showTitle: true,
        // toolbarColor: "#6200EE",
        // secondaryToolbarColor: "black",
        // enableUrlBarHiding: true,
        // enableDefaultShare: true,
        // forceCloseOnRedirection: false,

        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        // animations: {
        //   startEnter: "slide_in_right",
        //   startExit: "slide_out_left",
        //   endEnter: "slide_in_left",
        //   endExit: "slide_out_right",
        // },
        // headers: {
        //   "my-custom-header": "my custom header value",
        // },
      });
    } else Linking.openURL(url);
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const closeBrowser = () => {
  InAppBrowser.close();
};

export const RNInAppBrowser = {
  closeBrowser,
  openLink,
};
