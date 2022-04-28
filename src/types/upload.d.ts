declare type TypeUploadFeature = "camera" | "gallery" | "file" | "custom";

declare type TypeUploadTaskCompleteEvent = import("@aws-amplify/storage/lib-esm/providers/AWSS3UploadTask").UploadTaskCompleteEvent;
declare type TypeUploadTaskProgressEvent = import("@aws-amplify/storage/lib-esm/providers/AWSS3UploadTask").UploadTaskProgressEvent;

declare interface UploadProps {
  badgeOffset?: { bottom?: number; left?: number; right?: number; top?: number };
  completed?: boolean;
  containerStyle?: import("react-native").ViewStyle;
  customFeature?: import("react").ReactNode;
  disabled?: boolean;
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
  progress?: TypeUploadTaskProgressEvent;
  setValue: (value?: FileBase64) => void;
  title?: string;
  titleStyle?: import("react-native").TextStyle;
  useOriginalName?: boolean;
  value?: FileBase64;
  withCropping?: boolean;
}

declare interface IUploadDocumentRef {
  handleOpenCamera: () => void;
  handleOpenPicker: () => void;
  handleOpenDocument: () => void;
}
