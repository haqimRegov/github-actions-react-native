import ImagePicker, { Image, Options } from "react-native-image-crop-picker";

const options: Options = {
  cropperToolbarTitle: "Edit Photo",
  cropping: true,
  includeBase64: true,
  mediaType: "photo",
  multiple: false,
  // android
  freeStyleCropEnabled: true,
};

const SIZES = {
  height: 1500,
  width: 2000,
};

type SuccessCallback = (image: Image | Image[]) => void;

// eslint-disable-next-line consistent-return
export const imageOpenPicker = async (handleSuccess: SuccessCallback) => {
  try {
    const image = await ImagePicker.openPicker({
      ...options,
      height: SIZES.height,
      width: SIZES.width,
    });
    handleSuccess(image);
  } catch (error) {
    if (JSON.stringify(error).includes("cancelled")) {
      // eslint-disable-next-line no-console
      console.log("User Cancelled", error);
      return "";
    }
    // eslint-disable-next-line no-console
    return console.log("error", error);
  }
};

// eslint-disable-next-line consistent-return
export const imageOpenCamera = async (handleSuccess: SuccessCallback) => {
  try {
    const image = await ImagePicker.openCamera({
      ...options,
      height: SIZES.height,
      width: SIZES.width,
    });
    handleSuccess(image);
  } catch (error) {
    if (JSON.stringify(error).includes("cancelled")) {
      // eslint-disable-next-line no-console
      console.log("User Cancelled", error);
      return "";
    }
    // eslint-disable-next-line no-console
    return console.log("error", error);
  }
};