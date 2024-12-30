import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { UsersList } from '../components/users/UsersList';
import { AddUserModal } from '../components/users/AddUserModal';
import { UserPlus } from 'lucide-react';

export default function Users() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
          >
            <UserPlus className="h-5 w-5" />
            Add User
          </button>
        </div>

        <UsersList />
        
        {isAddModalOpen && (
          <AddUserModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}