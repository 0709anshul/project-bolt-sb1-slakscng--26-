import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  StatCards,
  OrdersSection, 
  TasksSection, 
  ProductsSection,
  TicketsSection 
} from '../components/dashboard/sections';
import { WelcomeMessage } from '../components/dashboard/WelcomeMessage';
import { useCurrentUser } from '../hooks/useCurrentUser';

export default function Dashboard() {
  const { user } = useCurrentUser();
  const isBrandUser = user?.role === 'brand_user';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {isBrandUser && <WelcomeMessage />}
        <StatCards />
        <OrdersSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TasksSection />
          <ProductsSection />
        </div>
        <TicketsSection />
      </div>
    </DashboardLayout>
  );
}