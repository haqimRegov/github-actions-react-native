declare type TInputs = "amount" | "alphanumeric" | "number" | "string" | "Date";

declare interface IInputValidation {
  error: boolean;
  errorMessage: string;
}
