import React, { useState } from 'react';
import { 
  LayoutDashboard, MenuIcon,
  ShoppingCart, 
  Package, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Settings,
  Wheat
} from 'lucide-react';


interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pos', label: 'POS Billing', icon: ShoppingCart },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 bg-amber-600 md:hidden">
        <div className="flex items-center space-x-3">
          <div className="p-1 bg-white rounded-lg">
            <Wheat className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-lg font-bold text-white">Millet Store</h1>
        </div>
        <button onClick={toggleSidebar} className="text-white">
          <MenuIcon size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`w-64 bg-gradient-to-b from-amber-600 to-amber-700 shadow-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-6 hidden md:block"> {/* Hide on small screens */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg">
              <Wheat className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Millet Store</h1>
              <p className="text-amber-100 text-sm">POS & Inventory</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'bg-amber-800 text-white border-r-4 border-white'
                    : 'text-amber-100 hover:bg-amber-700 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${isSidebarOpen ? 'hidden md:flex' : 'flex'}`}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                {currentPage === 'pos' ? 'POS Billing' : currentPage}
              </h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}