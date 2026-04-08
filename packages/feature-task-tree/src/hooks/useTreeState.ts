import { useState, useCallback } from 'react';

/**
 * useTreeState Hook
 *
 * Manages expand/collapse and selection state for the task tree.
 * Implements state management for the Composite pattern.
 *
 * @param initialExpandedIds - Optional array of task IDs to start expanded
 * @returns Tree state and control functions
 */
export function useTreeState(initialExpandedIds?: string[]) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(initialExpandedIds ?? [])
  );
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  /**
   * Expand a single node
   */
  const expand = useCallback((id: string) => {
    setExpandedIds((prev) => new Set(prev).add(id));
  }, []);

  /**
   * Collapse a single node
   */
  const collapse = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  /**
   * Toggle a node's expanded state
   */
  const toggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  /**
   * Expand all nodes (requires array of all expandable IDs)
   */
  const expandAll = useCallback((ids: string[]) => {
    setExpandedIds(new Set(ids));
  }, []);

  /**
   * Collapse all nodes
   */
  const collapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  /**
   * Select a node by ID
   */
  const select = useCallback((id: string | undefined) => {
    setSelectedId(id);
  }, []);

  /**
   * Check if a node is expanded
   */
  const isExpanded = useCallback(
    (id: string) => expandedIds.has(id),
    [expandedIds]
  );

  return {
    /** Set of currently expanded node IDs */
    expandedIds,
    /** Currently selected node ID */
    selectedId,
    /** Expand a single node */
    expand,
    /** Collapse a single node */
    collapse,
    /** Toggle a node's expanded state */
    toggle,
    /** Expand all nodes */
    expandAll,
    /** Collapse all nodes */
    collapseAll,
    /** Select a node */
    select,
    /** Check if a node is expanded */
    isExpanded,
  };
}

/**
 * Return type for useTreeState hook
 */
export type UseTreeStateReturn = ReturnType<typeof useTreeState>;
