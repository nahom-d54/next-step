import React from 'react';
import { Button, Tooltip } from '@next-step/ui-components';

export interface UndoRedoControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  className?: string;
}

export function UndoRedoControls({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  className = '',
}: UndoRedoControlsProps) {
  return (
    <div className={`undo-redo-controls ${className}`} style={{ display: 'flex', gap: '8px' }}>
      <Tooltip content={canUndo ? "Undo last action" : "Nothing to undo"}>
        <Button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          variant="secondary"
        >
          Undo
        </Button>
      </Tooltip>
      <Tooltip content={canRedo ? "Redo last undone action" : "Nothing to redo"}>
        <Button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          variant="secondary"
        >
          Redo
        </Button>
      </Tooltip>
    </div>
  );
}
