
import React from 'react';
import { Link } from "react-router-dom";
import { LayoutDashboard, MessageSquare, FileText, BarChart2, Settings, Users } from "lucide-react";
import { Button } from "../../components/ui/button";

const Index = () => {
  const features = [
    {
      title: "Dashboard",
      description: "Visualize suas estatísticas de recuperação e desempenho.",
      icon: LayoutDashboard,
      link: "/dashboard",
      buttonText: "Acessar Dashboard"
    },
    {
      title: "WhatsApp",
      description: "Configure sua conexão com o WhatsApp Business API.",
      icon: MessageSquare,
      link: "/whatsapp",
      buttonText: "Configurar WhatsApp"
    },
    {
      title: "Scripts",
      description: "Configuração de webhook para integração com seu site.",
      icon: FileText,
      link: "/script",
      buttonText: "Configurar Integração"
    },
    {
      title: "Templates",
      description: "Crie e personalize seus templates de mensagens.",
      icon: MessageSquare,
      link: "/templates",
      buttonText: "Gerenciar Templates"
    },
    {
      title: "Histórico",
      description: "Visualize o histórico de mensagens enviadas.",
      icon: BarChart2,
      link: "/history",
      buttonText: "Ver Histórico"
    },
    {
      title: "Administração",
      description: "Acesse as funcionalidades administrativas.",
      icon: Settings,
      link: "/admin",
      buttonText: "Área Admin"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-whatsapp/10 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">CartConnect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integração completa entre WooCommerce e WhatsApp para recuperação de carrinhos abandonados
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-12 w-12 bg-gradient-to-br from-whatsapp to-whatsapp/60 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h2>
              <p className="mb-6 text-gray-600">{feature.description}</p>
              <Link to={feature.link}>
                <Button className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white">
                  {feature.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-gray-500">© 2025 CartConnect - Powered by WhatsApp Business API</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
