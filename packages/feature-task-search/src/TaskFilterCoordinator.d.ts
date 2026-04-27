import React from 'react';
import type { Task } from './searchStrategies';
import type { Tag } from '@next-step/feature-task-tags';
type Props = {
    tasks: Task[];
    tags: Tag[];
    /** Called when search results change */
    onResults?: (results: Task[]) => void;
    className?: string;
    style?: React.CSSProperties;
};
export default function TaskFilterCoordinator({ tasks, tags, onResults, className, style }: Props): import("react/jsx-runtime").JSX.Element;
export {};
