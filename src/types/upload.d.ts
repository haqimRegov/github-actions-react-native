declare type TypeUploadFeature = "camera" | "gallery" | "file" | "custom";

declare interface UploadProps {
  badgeOffset?: { bottom?: number; left?: number; right?: number; top?: number };
  containerStyle?: import("react-native").ViewStyle;
  customFeature?: import("react").ReactNode;
  errorMessage?: string;
  features: TypeUploadFeature[];
  icon?: { active?: string; inactive?: string };
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
  withCropping?: boolean;
}

declare interface IUploadDocumentRef {
  handleOpenCamera: () => void;
  handleOpenPicker: () => void;
  handleOpenDocument: () => void;
}
