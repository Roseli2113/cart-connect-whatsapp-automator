
import { ReactNode } from "react";
import { 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldAlert,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    // Redirect to home page
    window.location.href = "/";
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3, current: window.location.pathname === "/admin" },
    { name: "Usuários", href: "/admin-dashboard", icon: Users, current: window.location.pathname === "/admin-dashboard" },
    { name: "WhatsApp", href: "/admin-whatsapp", icon: MessageSquare, current: window.location.pathname === "/admin-whatsapp" },
    { name: "Configurações", href: "/admin/settings", icon: Settings, current: window.location.pathname === "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <ShieldAlert size={24} />
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors
                  ${
                    item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* User and logout */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center mb-4">
              <div className="bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center text-white mr-2">
                <ShieldAlert size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Administrador</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 overflow-auto">
        {/* Page content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
