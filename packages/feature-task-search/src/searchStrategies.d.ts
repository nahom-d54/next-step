export type Task = {
    id: string;
    title: string;
    tags?: string[];
    dueDate?: string;
    [key: string]: unknown;
};
export interface SearchStrategy {
    key: string;
    label: string;
    search(tasks: Task[], query: string): Task[];
}
export declare const searchByTitle: SearchStrategy;
export declare const searchByPriority: SearchStrategy;
export declare const searchByStatus: SearchStrategy;
export declare const searchStrategies: SearchStrategy[];
export declare function getSearchStrategy(key: string): SearchStrategy;
