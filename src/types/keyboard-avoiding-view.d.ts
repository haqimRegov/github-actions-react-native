type KeyboardAvoidingView = import("react-native").KeyboardAvoidingView;

declare interface IKeyboardAvoidingView extends KeyboardAvoidingView {
  [key: string]: unknown;
  state: {
    bottom: number;
    [key: string]: unknown;
  };
}

declare type TypeKeyboardAvoidingView = IKeyboardAvoidingView | null;
