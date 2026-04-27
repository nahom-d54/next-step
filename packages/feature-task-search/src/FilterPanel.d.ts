import React from 'react';
type Props = {
    /** controlled value (strategy key) */
    value?: string;
    /** initial uncontrolled value */
    defaultValue?: string;
    onFilterChange?: (key: string) => void;
    className?: string;
    style?: React.CSSProperties;
};
export default function FilterPanel({ value, defaultValue, onFilterChange, className, style, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
