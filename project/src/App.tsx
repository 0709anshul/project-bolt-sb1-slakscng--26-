import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useFirstUser } from './hooks/useFirstUser';
import { LoginForm } from './components/LoginForm';
import { FirstTimeSetup } from './components/FirstTimeSetup';
import Dashboard from './pages/Dashboard';
import ProductionOrders from './pages/ProductionOrders';
import ProductionTasks from './pages/ProductionTasks';
import Products from './pages/Products';
import Users from './pages/Users';
import CustomerBrands from './pages/CustomerBrands';
import TaskTemplates from './pages/TaskTemplates';
import SupportTickets from './pages/SupportTickets';
import InventoryDashboard from './pages/inventory/InventoryDashboard';
import Materials from './pages/inventory/Materials';
import ProductFormulas from './pages/inventory/ProductFormulas';
import MaterialOrders from './pages/inventory/MaterialOrders';
import InventoryMovements from './pages/inventory/InventoryMovements';
import LiveInventory from './pages/inventory/LiveInventory';

export default function App() {
  const { session, loading: authLoading } = useAuth();
  const { isFirstUser, loading: firstUserLoading } = useFirstUser();

  if (authLoading || firstUserLoading) {
    return null;
  }

  if (isFirstUser) {
    return <FirstTimeSetup />;
  }

  if (!session) {
    return <LoginForm />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<ProductionOrders />} />
        <Route path="/tasks" element={<ProductionTasks />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/customer-brands" element={<CustomerBrands />} />
        <Route path="/task-templates" element={<TaskTemplates />} />
        <Route path="/tickets" element={<SupportTickets />} />
        
        {/* Inventory Routes */}
        <Route path="/inventory" element={<InventoryDashboard />} />
        <Route path="/inventory/materials" element={<Materials />} />
        <Route path="/inventory/formulas" element={<ProductFormulas />} />
        <Route path="/inventory/orders" element={<MaterialOrders />} />
        <Route path="/inventory/movements" element={<InventoryMovements />} />
        <Route path="/inventory/live" element={<LiveInventory />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}