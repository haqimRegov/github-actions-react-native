import { environment } from "../../../package.json";

interface IOTPConfig {
  COOL_OFF: number;
  EXPIRY: number;
  LENGTH: number;
}

const otpConfig = {
  dev: {
    COOL_OFF: 120,
    EXPIRY: 120,
    LENGTH: 6,
  },
  prod: {
    COOL_OFF: 300,
    EXPIRY: 120,
    LENGTH: 6,
  },
  sit: {
    COOL_OFF: 120,
    EXPIRY: 120,
    LENGTH: 6,
  },
  staging: {
    COOL_OFF: 300,
    EXPIRY: 120,
    LENGTH: 6,
  },
  uat: {
    COOL_OFF: 120,
    EXPIRY: 120,
    LENGTH: 6,
  },
};

export const OTP_CONFIG: IOTPConfig = otpConfig[environment];
