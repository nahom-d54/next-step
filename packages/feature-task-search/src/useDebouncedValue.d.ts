type DebounceControls = {
    flush: () => void;
    cancel: () => void;
};
export default function useDebouncedValue<T>(value: T, delay?: number): [T, DebounceControls];
export {};
