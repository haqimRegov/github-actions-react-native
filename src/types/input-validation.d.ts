declare type TInputs = "amount" | "alphanumeric" | "number" | "string";

declare interface IInputValidation {
  error: boolean;
  errorMessage: string;
}
