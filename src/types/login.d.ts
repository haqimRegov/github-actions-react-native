declare interface IEmailOTP {
  email: string;
  otp: string;
}

declare interface IPageTexts {
  heading: string;
  subheading: string;
  subheadingStyle: import("react-native").TextStyle;
}

type TypePage = "NRIC" | "OTP" | "PASSWORD";
