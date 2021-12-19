import React, { useRef } from "react";
export interface ILocalStore {
  destroy: () => void;
}
export const useLocalStore = <T extends ILocalStore>(Creator: () => T): T => {
  const container = useRef<T | null>(null);
  if (container.current === null) {
    container.current = Creator();
  }
  React.useEffect(() => {
    return () => container.current?.destroy();
  }, []);
  return container.current;
};
