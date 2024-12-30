import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { TasksHeader } from '../components/tasks/TasksHeader';
import { TasksFilters } from '../components/tasks/TasksFilters';
import { TasksGrid } from '../components/tasks/TasksGrid';
import { useTasksWithFilters } from '../hooks/useTasksWithFilters';
import { useCurrentUser } from '../hooks/useCurrentUser';

export default function ProductionTasks() {
  const { user } = useCurrentUser();
  const [filters, setFilters] = useState({
    poNumber: '',
    dueDate: '',
    status: '',
    priority: '',
    owner: '',
    showMyTasks: false
  });

  const { tasks, isLoading, error } = useTasksWithFilters(filters);

  const handleFilterChange = (key: string, value: string | boolean) => {
    if (key === 'showMyTasks') {
      setFilters(prev => ({
        ...prev,
        showMyTasks: value as boolean,
        owner: value ? user?.id || '' : ''
      }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TasksHeader />
        
        <TasksFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <TasksGrid 
          tasks={tasks}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </DashboardLayout>
  );
}