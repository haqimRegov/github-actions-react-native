import { useEffect, useState } from "react";

export const useDelete = <T>(
  data: T[],
  setData: (currentData: T[]) => void,
): [number, (count: number) => void, T[], (newData: T[]) => void] => {
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [tempData, setTempData] = useState<T[]>([]);

  useEffect(() => {
    if (deleteCount === 0) {
      setData(tempData);
    }
  }, [deleteCount]);

  useEffect(() => {
    setTempData(data);
  }, []);

  return [deleteCount, setDeleteCount, tempData, setTempData];
};
