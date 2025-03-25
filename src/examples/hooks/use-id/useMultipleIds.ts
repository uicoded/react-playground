import { useId } from "react";

export const useMultipleIds = (count: number = 5) => Array.from({ length: count }, () => useId());