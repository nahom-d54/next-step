export interface HistoryEntry<T> {
  id: string;
  timestamp: string;
  action: string;
  payload: T;
  description: string;
}

export interface HistoryState<T> {
  past: HistoryEntry<T>[];
  present: T | null;
  future: HistoryEntry<T>[];
}
