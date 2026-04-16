import { useState, useCallback } from 'react';
import { HistoryEntry, HistoryState } from '../types';
import { generateId } from '@next-step/utils';

export function useHistory<T>(initialState: T | null = null) {
  const [state, setState] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const push = useCallback((newPresent: T, description: string) => {
    setState((curr) => {
      const entry: HistoryEntry<T> = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        action: 'UPDATE',
        payload: curr.present as T,
        description,
      };

      return {
        past: [...curr.past, entry],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((curr) => {
      if (curr.past.length === 0) return curr;

      const previous = curr.past[curr.past.length - 1];
      const newPast = curr.past.slice(0, curr.past.length - 1);

      const redoEntry: HistoryEntry<T> = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        action: 'UNDO',
        payload: curr.present as T,
        description: `Undo: ${previous.description}`,
      };

      return {
        past: newPast,
        present: previous.payload,
        future: [redoEntry, ...curr.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((curr) => {
      if (curr.future.length === 0) return curr;

      const next = curr.future[0];
      const newFuture = curr.future.slice(1);

      const undoEntry: HistoryEntry<T> = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        action: 'REDO',
        payload: curr.present as T,
        description: `Redo: ${next.description}`,
      };

      return {
        past: [...curr.past, undoEntry],
        present: next.payload,
        future: newFuture,
      };
    });
  }, []);

  return {
    state,
    push,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
