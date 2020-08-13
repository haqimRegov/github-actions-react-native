type KeyboardAvoidingView = import("react-native").KeyboardAvoidingView;

declare interface IKeyboardAvoidingView extends KeyboardAvoidingView {
  [key: string]: any;
  state: {
    bottom: number;
    [key: string]: any;
  };
}

declare type TypeKeyboardAvoidingView = IKeyboardAvoidingView | null;
