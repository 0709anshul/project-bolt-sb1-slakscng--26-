import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import type { User } from '../../types/users';

const ROLE_BADGES = {
  admin: 'bg-red-100 text-red-800',
  manager: 'bg-blue-100 text-blue-800',
  staff: 'bg-green-100 text-green-800',
  brand_user: 'bg-purple-100 text-purple-800'
};

type UserRowProps = {
  user: User;
  onDelete?: () => void;
};

export function UserRow({ user, onDelete }: UserRowProps) {
  const { deleteUser, isLoading } = useDeleteUser();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await deleteUser(user.id);
      onDelete?.();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${ROLE_BADGES[user.role]}`}>
          {user.role.replace('_', ' ')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.organization?.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <button 
            className="text-indigo-600 hover:text-indigo-900"
            title="Edit user"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button 
            onClick={handleDelete}
            disabled={isLoading}
            className="text-red-600 hover:text-red-900 disabled:opacity-50"
            title="Delete user"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}