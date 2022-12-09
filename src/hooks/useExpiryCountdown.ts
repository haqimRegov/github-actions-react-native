import { useContext, useEffect, useState } from "react";

import { ModalContext } from "../context";
import { DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS_DEV } from "../data/dictionary";

export const useExpiryCountdown = (): [number, (seconds: number) => void] => {
  const { expired, expiryModal } = useContext(ModalContext);
  const [countdown, setCountdown] = useState<number>(DICTIONARY_INACTIVITY_COUNTDOWN_SECONDS_DEV);

  useEffect(() => {
    let clockDrift: ReturnType<typeof setTimeout>;
    if (countdown > 0 && expiryModal === true && expired === false) {
      clockDrift = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(clockDrift);
    };
  }, [countdown]);

  return [countdown, setCountdown];
};
