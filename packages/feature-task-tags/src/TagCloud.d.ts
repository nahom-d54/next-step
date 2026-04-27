import React from 'react';
import type { Tag } from './types';
type Props = {
    tags: Tag[];
    className?: string;
    style?: React.CSSProperties;
    onTagSelect?: (tag: Tag) => void;
    selectedId?: string;
};
export default function TagCloud({ tags, className, style, onTagSelect, selectedId }: Props): import("react/jsx-runtime").JSX.Element;
export {};
