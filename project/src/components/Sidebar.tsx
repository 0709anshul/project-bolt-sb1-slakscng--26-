import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Package2, 
  Users, 
  Building2,
  ClipboardCheck,
  Headphones,
  Lock,
  Boxes,
  TestTubes,
  ShoppingCart,
  ArrowRightLeft,
  BarChart3,
  ListTodo // Add this import
} from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';
import { MenuSection } from './sidebar/MenuSection';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { ChangePasswordModal } from './auth/ChangePasswordModal';

const mainMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: ClipboardList, label: 'Production Orders', href: '/orders' },
  { icon: ListTodo, label: 'Production Tasks', href: '/tasks' }, // Add this item
  { icon: Package2, label: 'Products', href: '/products' },
  { icon: Headphones, label: 'Service Requests', href: '/tickets' }
];

const inventoryItems = [
  { icon: Boxes, label: 'Inventory Dashboard', href: '/inventory' },
  { icon: Package2, label: 'Materials', href: '/inventory/materials' },
  { icon: TestTubes, label: 'Product Formulas', href: '/inventory/formulas' },
  { icon: ShoppingCart, label: 'Material Orders', href: '/inventory/orders' },
  { icon: ArrowRightLeft, label: 'Movements', href: '/inventory/movements' },
  { icon: BarChart3, label: 'Live Inventory', href: '/inventory/live' }
];

const adminMenuItems = [
  { icon: Users, label: 'Users', href: '/users' },
  { icon: Building2, label: 'Customer Brands', href: '/customer-brands' },
  { icon: ClipboardCheck, label: 'Task Templates', href: '/task-templates' }
];

export default function Sidebar() {
  const { isAdmin, isManager } = useUserRole();
  const showAdminMenu = isAdmin || isManager;
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <div className="w-64 bg-indigo-800 text-white flex flex-col h-screen">
      <SidebarHeader />

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        <MenuSection items={mainMenuItems} />
        <MenuSection title="Inventory" items={inventoryItems} />
        {showAdminMenu && (
          <MenuSection title="Admin" items={adminMenuItems} defaultExpanded={false} />
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-indigo-700">
        <button
          onClick={() => setIsChangePasswordOpen(true)}
          className="flex items-center gap-2 px-4 py-2 w-full rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Lock className="h-5 w-5" />
          Change Password
        </button>
      </div>

      <ChangePasswordModal 
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
}