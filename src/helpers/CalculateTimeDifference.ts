import moment from "moment";

import { OTP_CONFIG } from "../constants";

export const CalculateTimeDifference = (emailTimestamp?: string): number => {
  const currentTimeStamp: number = parseInt(moment().format("x"), 10);
  const storedTimeStamp: number = emailTimestamp !== undefined ? parseInt(emailTimestamp, 10) : 0;
  const timeDifference = (currentTimeStamp - storedTimeStamp) / 1000;
  const checkTimeDifference = timeDifference <= OTP_CONFIG.EXPIRY ? OTP_CONFIG.EXPIRY - Math.round(timeDifference) : 0;
  return checkTimeDifference;
};
