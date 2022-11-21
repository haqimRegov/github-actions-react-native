import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T, initial?: boolean) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const checkInitialValue = initial === true ? value : undefined;
  const ref = useRef<T | undefined>(checkInitialValue);

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};
