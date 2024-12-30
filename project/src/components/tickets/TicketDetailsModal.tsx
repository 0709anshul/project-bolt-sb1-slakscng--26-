import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useUpdateTicket } from '../../hooks/useUpdateTicket';
import { useUsers } from '../../hooks/useUsers';
import { useTicketComments } from '../../hooks/useTicketComments';
import { FileUpload } from '../common/FileUpload';
import { TicketStatusBadge } from './TicketStatusBadge';
import { TicketComments } from './TicketComments';
import type { Ticket, TicketStatus } from '../../types/tickets';

type TicketDetailsModalProps = {
  ticket: Ticket;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
};

export function TicketDetailsModal({ ticket, isOpen, onClose, onUpdate }: TicketDetailsModalProps) {
  const { updateStatus, updateAssignment, isLoading } = useUpdateTicket();
  const { data: users } = useUsers();
  const [newComment, setNewComment] = useState('');
  const [attachments, setAttachments] = useState([]);
  const { comments, addComment, isLoading: loadingComments } = useTicketComments(ticket.id);

  // Local state for status and assignment
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(ticket.status);
  const [selectedAssignee, setSelectedAssignee] = useState<string>(ticket.assigned_to?.id || '');
  
  // Track if values have changed
  const statusChanged = selectedStatus !== ticket.status;
  const assigneeChanged = selectedAssignee !== (ticket.assigned_to?.id || '');

  const handleStatusSave = async () => {
    try {
      await updateStatus(ticket.id, selectedStatus);
      onUpdate?.();
    } catch (error) {
      console.error('Error updating ticket status:', error);
      setSelectedStatus(ticket.status);
    }
  };

  const handleAssignmentSave = async () => {
    try {
      await updateAssignment(ticket.id, selectedAssignee || null);
      onUpdate?.();
    } catch (error) {
      console.error('Error assigning ticket:', error);
      setSelectedAssignee(ticket.assigned_to?.id || '');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment(newComment, attachments);
      setNewComment('');
      setAttachments([]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{ticket.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Status and Assignment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as TicketStatus)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                {statusChanged && (
                  <button
                    onClick={handleStatusSave}
                    disabled={isLoading}
                    className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedAssignee}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Unassigned</option>
                  {users?.filter(user => ['admin', 'manager', 'staff'].includes(user.role)).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name}
                    </option>
                  ))}
                </select>
                {assigneeChanged && (
                  <button
                    onClick={handleAssignmentSave}
                    disabled={isLoading}
                    className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Comments</h3>
            <TicketComments comments={comments} isLoading={loadingComments} />

            <form onSubmit={handleAddComment} className="mt-4 space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />

              <FileUpload
                files={attachments}
                onChange={setAttachments}
                disabled={isLoading}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isLoading}
                  className="px-4 py-2 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}