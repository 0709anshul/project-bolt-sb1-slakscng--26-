import React from 'react';
import { User2 } from 'lucide-react';
import { formatDate } from '../../utils/date';
import type { TicketComment } from '../../types/tickets';

type TicketCommentsProps = {
  comments: TicketComment[] | null;
  isLoading: boolean;
};

export function TicketComments({ comments, isLoading }: TicketCommentsProps) {
  if (isLoading) {
    return <div className="text-center py-4">Loading comments...</div>;
  }

  if (!comments?.length) {
    return <div className="text-center py-4 text-gray-500">No comments yet</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <User2 className="h-4 w-4 text-indigo-600" />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{comment.user.full_name}</h4>
              <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
            </div>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{comment.content}</p>
            {comment.attachments?.length > 0 && (
              <div className="mt-2 space-y-1">
                {comment.attachments.map((file: any) => (
                  <a
                    key={file.path}
                    href={file.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    {file.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}