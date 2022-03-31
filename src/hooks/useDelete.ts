import { useEffect, useState } from "react";

export const useDelete = <T>(
  data: T,
  setData: (currentData: T) => void,
  additionalFunctions?: () => void,
): [number, (count: number) => void, T | undefined, (newData: T) => void] => {
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [tempData, setTempData] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (deleteCount === 0) {
      if (tempData !== undefined) {
        setData(tempData);
      }
      if (additionalFunctions !== undefined) {
        additionalFunctions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCount]);

  useEffect(() => {
    setTempData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [deleteCount, setDeleteCount, tempData, setTempData];
};
