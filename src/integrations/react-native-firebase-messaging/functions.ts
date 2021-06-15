import messaging from "@react-native-firebase/messaging";

import { RNPushNotification } from "../react-native-push-notification";

const getToken = async () => {
  const token = await messaging().getToken();
  // // eslint-disable-next-line no-console
  // console.log("Firebase Token:", token);
  return token;
};

const onMessage = () => {
  messaging().onMessage(async (remoteMessage) => {
    const notification = {
      data: { ...remoteMessage.data },
      notification: { title: remoteMessage.notification!.title!, body: remoteMessage.notification!.body! },
    };
    // // eslint-disable-next-line no-console
    // console.log("Firebase Notification:", notification);
    RNPushNotification.localNotification(notification);
  });
};

export const RNFirebase = {
  getToken,
  onMessage,
};
