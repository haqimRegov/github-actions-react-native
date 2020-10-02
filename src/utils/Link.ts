import { Linking } from "react-native";

const openLink = async (URL: string) => {
  try {
    const supported = await Linking.canOpenURL(URL);
    if (supported === true) {
      Linking.openURL(URL);
    } else {
      // eslint-disable-next-line no-console
      console.log("Can't handle url: ", URL);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("An error occurred", error);
  }
};

const emailTo = async (email: string) => {
  const URL = `mailto:${email}`;
  openLink(URL);
};

export const LinkUtils = { openLink, emailTo };
