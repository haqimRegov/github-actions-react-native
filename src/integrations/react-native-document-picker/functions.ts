import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";

type SuccessCallback = (result: DocumentPickerResponse) => void;

export const documentPicker = async (handleSuccess: SuccessCallback) => {
  try {
    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
      copyTo: "cachesDirectory",
    });

    return handleSuccess(res);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
  return false;
};
export const multipleDocumentPicker = async () => {
  // Pick multiple files
  try {
    const results = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    return results;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
  return false;
};
