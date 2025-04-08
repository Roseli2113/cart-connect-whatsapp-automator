
import { ReactNode, useState } from "react";
import { 
  BarChart3, 
  MessageCircle, 
  Code2, 
  Settings, 
  History, 
  LogOut, 
  Menu,
  X,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    // Redirect to home page
    window.location.href = "/";
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3, current: title === "Dashboard" },
    { name: "WhatsApp", href: "/whatsapp", icon: MessageCircle, current: title === "WhatsApp" },
    { name: "Script", href: "/script", icon: Code2, current: title === "Script de Integração" },
    { name: "Mensagens", href: "/templates", icon: MessageCircle, current: title === "Templates de Mensagem" },
    { name: "Histórico", href: "/history", icon: History, current: title === "Histórico" },
    { name: "Configurações", href: "/settings", icon: Settings, current: title === "Configurações" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50" 
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-whatsapp text-white transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'shadow-xl' : ''}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-whatsapp-dark">
            <div className="flex items-center space-x-2">
              <MessageCircle size={24} />
              <span className="text-lg font-semibold">CartConnect</span>
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
                      ? 'bg-whatsapp-dark text-white'
                      : 'text-white hover:bg-whatsapp-dark'
                  }
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* User and logout */}
          <div className="border-t border-whatsapp-dark p-4">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-whatsapp mr-2">
                <User size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Usuário Demo</p>
                <p className="text-xs opacity-75">Plano Gratuito</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-whatsapp-dark transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`
          flex-1 overflow-auto transition-all duration-300 ease-in-out
          ${sidebarOpen && !isMobile ? 'ml-64' : 'ml-0'}
        `}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 md:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
