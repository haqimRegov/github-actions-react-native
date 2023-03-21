import { useEffect, useState } from "react";

export interface IData<P> {
  deletedData: P;
  index: number;
  parentIndex?: number | undefined;
}
export const useUndoDelete = <T>(
  setData: (currentData: IData<T>[] | undefined) => void,
): [number, (count: number) => void, IData<T>[] | undefined, (newData: IData<T>[] | undefined) => void, () => void] => {
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [tempData, setTempData] = useState<IData<T>[] | undefined>(undefined);

  useEffect(() => {
    if (deleteCount === 0) {
      if (tempData !== undefined) {
        setTempData(undefined); // reset state value
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCount]);

  const handleUndoDelete = () => {
    // function from parent to update the tempData into the corresponding redux field
    setData(tempData);
  };

  return [deleteCount, setDeleteCount, tempData, setTempData, handleUndoDelete];
};
