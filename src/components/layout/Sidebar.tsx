
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  BarChart2, 
  Settings, 
  Users,
  Menu,
  ChevronDown
} from 'lucide-react';
import { Button } from "../../../components/ui/button";
import { cn } from '../../utils/cn';

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/dashboard' 
    },
    { 
      name: 'WhatsApp', 
      icon: MessageSquare, 
      path: '/whatsapp' 
    },
    { 
      name: 'Scripts', 
      icon: FileText, 
      path: '/script' 
    },
    { 
      name: 'Templates', 
      icon: MessageSquare, 
      path: '/templates' 
    },
    { 
      name: 'Histórico', 
      icon: BarChart2, 
      path: '/history' 
    },
    { 
      name: 'Admin', 
      icon: Settings, 
      path: '/admin' 
    }
  ];

  return (
    <div 
      className={cn(
        "bg-sidebar h-screen transition-all duration-300 border-r border-gray-200 flex flex-col",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="text-xl font-bold text-sidebar-foreground">CartConnect</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-sidebar-foreground" 
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="flex flex-col flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2 rounded-md transition-colors",
              location.pathname === item.path 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "hover:bg-sidebar-accent/50 text-sidebar-foreground",
              collapsed && "justify-center"
            )}
          >
            <item.icon size={20} className={cn(!collapsed && "mr-3")} />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        {!collapsed ? (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-white">
              U
            </div>
            <div className="ml-2 flex-1">
              <div className="text-sm font-medium text-sidebar-foreground">Usuário</div>
              <div className="text-xs text-sidebar-foreground/70">Admin</div>
            </div>
            <ChevronDown size={18} className="text-sidebar-foreground" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-white">
              U
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
