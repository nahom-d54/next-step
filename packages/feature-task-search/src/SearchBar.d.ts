import type { Task } from './searchStrategies';
type Props = {
    tasks: Task[];
    initialQuery?: string;
    /** externally-controlled query; when provided, SearchBar will sync to it */
    externalQuery?: string;
    initialStrategy?: string;
    onResults?: (results: Task[]) => void;
    /** debounce delay in ms */
    debounceDelay?: number;
    /** optional className */
    className?: string;
    style?: React.CSSProperties;
};
export default function SearchBar({ tasks, initialQuery, externalQuery, initialStrategy, onResults, debounceDelay, className, style, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
