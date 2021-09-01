declare type TypeUploadFeature = "camera" | "gallery" | "file";

declare interface UploadProps {
  errorMessage?: string;
  features: TypeUploadFeature[];
  label?: string;
  labelStyle?: import("react-native").TextStyle;
  maxFileSizeMB?: number;
  onError?: (data: FileBase64) => void;
  onPress?: () => void;
  onPressCamera?: () => void;
  onPressPicker?: () => void;
  onPressRemove?: () => void;
  onSuccess: (data: FileBase64) => void;
  setValue: (value?: FileBase64) => void;
  title?: string;
  titleStyle?: import("react-native").TextStyle;
  value?: FileBase64;
}

declare interface IUploadDocumentRef {
  handleOpenCamera: () => void;
  handleOpenPicker: () => void;
  handleOpenDocument: () => void;
}
