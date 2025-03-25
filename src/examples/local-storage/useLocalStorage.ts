import { useState, useEffect } from "react";
/**
 * localStorage only supports JSON-serializable data,
 * define a Serializable type for allowed types
 * 
 *  | **Type**         | **Reason** |
    |----------------|------------|
    | `string`       | JSON supports strings ✅ |
    | `number`       | JSON supports numbers ✅ |
    | `boolean`      | JSON supports booleans ✅ |
    | `null`         | JSON allows `null` ✅ |
    | `Serializable[]` | Allows arrays of serializable values ✅ |
    | `{ [key: string]: Serializable }` | Allows objects with serializable values ✅ |
 * 
 */
type Serializable = 
  | string 
  | number 
  | boolean 
  | null 
  | Serializable[] 
  | { [key: string]: Serializable };

const useLocalStorage = <T extends Serializable>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;