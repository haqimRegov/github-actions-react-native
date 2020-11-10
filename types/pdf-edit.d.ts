declare interface PdfEditCardProps {
  accountType?: TypeAccountChoices;
  active?: boolean;
  completed: boolean;
  completedText?: string;
  disabled?: boolean;
  label?: string;
  labelStyle?: import("react-native").TextStyle;
  onError?: (data: FileBase64) => void;
  onPress?: () => void;
  onPressEdit?: () => void;
  onPressRemove?: () => void;
  onSuccess: (data: FileBase64) => void;
  setValue: (value?: FileBase64) => void;
  title?: string;
  titleStyle?: import("react-native").TextStyle;
  tooltipLabel?: string;
  value?: FileBase64;
}
