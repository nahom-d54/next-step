import type { Tag } from './types';
type Props = {
    tags: Tag[];
    onTagCreated: (t: Tag) => void;
    onTagDeleted: (id: string) => void;
    className?: string;
};
export default function TagManager({ tags, onTagCreated, onTagDeleted, className }: Props): import("react/jsx-runtime").JSX.Element;
export {};
