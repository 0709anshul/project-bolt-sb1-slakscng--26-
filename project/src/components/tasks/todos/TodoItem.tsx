import React from 'react';
import { Trash2, PlusCircle, MessageSquare, Eye, EyeOff } from 'lucide-react';
import { ProofOfWork } from './ProofOfWork';
import { TodoNotes } from './TodoNotes';
import type { TodoItem } from '../../../types/todos';

type TodoItemProps = {
  todo: TodoItem;
  onToggle: (completed: boolean) => void;
  onTogglePrivate: (isPrivate: boolean) => void;
  onDelete: () => void;
  canManage: boolean;
  isLoading: boolean;
};

export function TodoItem({ 
  todo, 
  onToggle, 
  onTogglePrivate,
  onDelete, 
  canManage, 
  isLoading 
}: TodoItemProps) {
  const [showProof, setShowProof] = React.useState(false);
  const [showNotes, setShowNotes] = React.useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggle(e.target.checked)}
          disabled={!canManage || isLoading}
          className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
        />
        
        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.description}
          {todo.is_private && (
            <span className="ml-2 text-xs text-gray-500">(Private)</span>
          )}
        </span>

        <div className="flex items-center gap-2">
          {canManage && (
            <>
              <button
                onClick={() => onTogglePrivate(!todo.is_private)}
                className={`${
                  todo.is_private ? 'text-gray-400' : 'text-indigo-600'
                } hover:text-indigo-700 disabled:opacity-50`}
                title={todo.is_private ? 'Make public' : 'Make private'}
                disabled={isLoading}
              >
                {todo.is_private ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                title="Add notes"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowProof(!showProof)}
                className="text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                title="Add proof of work"
              >
                <PlusCircle className="h-4 w-4" />
              </button>
              <button
                onClick={onDelete}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {(showNotes || todo.notes) && (
        <TodoNotes 
          todo={todo}
          canManage={canManage}
        />
      )}

      {(showProof || todo.attachments?.length > 0) && (
        <ProofOfWork 
          todo={todo}
          canManage={canManage}
        />
      )}
    </div>
  );
}